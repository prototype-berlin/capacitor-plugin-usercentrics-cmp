import Foundation
import Capacitor
import Usercentrics
import UsercentricsUI

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(UsercentricsCmpPlugin)
public class UsercentricsCmpPlugin: CAPPlugin {
    private var _call: CAPPluginCall?
    private var usercentricsInitialized: Bool?

    @objc(init:)
    func initialize(_ call: CAPPluginCall) {
        self._call = call

        if ((self.usercentricsInitialized) == nil) {
            self.configureUsercentrics()
        }

        DispatchQueue.main.async {
            UsercentricsCore.isReady { [weak self] status in
                guard let self = self else { return }
                if status.shouldCollectConsent {
                    self.presentFirstLayer()
                } else {
                    // Apply stored consent (Don't show CMP)
                    self.applyConsent(with: status.consents)
                }
            } onFailure: { error in
                self._call?.reject(error.localizedDescription)
            }
        }
    }

    @objc func update(_ call: CAPPluginCall) {
        self._call = call

        if ((self.usercentricsInitialized) == nil) {
            self._call?.reject("Usercentrics not configured yet. Ensure init function has beeen called before")

            return;
        }
        
        UsercentricsCore.shared.changeLanguage(language: self._call?.getString("language") ?? "en") {
            DispatchQueue.main.async {
                self.presentSecondLayer()
            }
        } onFailure: { error in
            DispatchQueue.main.async {
                // ignore language switch error, present cmp anyway
                self.presentSecondLayer()
            }
        }
    }

    @objc func reset(_ call: CAPPluginCall) {
        self._call = call

        if ((self.usercentricsInitialized) == nil) {
            self._call?.reject("Usercentrics not configured yet. Ensure init function has beeen called before")

            return;
        }

        DispatchQueue.main.async {
            UsercentricsCore.reset();

            self.usercentricsInitialized = nil;
            self._call?.resolve(["vendors": []])
        }
    }

    private func configureUsercentrics() {
        guard let settingsId = self._call?.getString("settingsId") else {
            self._call?.reject("settingsId missing")
            return
        }

        let options = UsercentricsOptions(settingsId: settingsId)
        // options.loggerLevel = .debug
        options.defaultLanguage = self._call?.getString("language") ?? "en"
        UsercentricsCore.configure(options: options)
        self.usercentricsInitialized = true;
    }
    
    
    private func presentFirstLayer() {
        guard let navigationController = self.bridge?.viewController else { fatalError("Navigation Controller needed") }
        
        let bannerSettings = BannerSettings(firstLayerStyleSettings: FirstLayerStyleSettings(layout: .popup(position: .center)))

        // Launch Usercentrics Banner with your settings
        let banner = UsercentricsBanner(bannerSettings: bannerSettings)
        banner.showFirstLayer(hostView: navigationController) { [weak self] response in
            guard let self = self else { return }
            /// Process consents
            self.applyConsent(with: response.consents)
        }
    }
    
    private func presentSecondLayer() {
        guard let navigationController = self.bridge?.viewController else { fatalError("Navigation Controller needed") }

        // This is useful when you need to call our CMP from settings screen for instance, therefore the user may dismiss the view
        let banner = UsercentricsBanner(bannerSettings: BannerSettings(secondLayerStyleSettings: SecondLayerStyleSettings(showCloseButton: true)))
        banner.showSecondLayer(hostView: navigationController) { [weak self] response in
            guard let self = self else { return }
            /// Process consents
            self.applyConsent(with: response.consents)
        }
    }

    private func applyConsent(with consents: [UsercentricsServiceConsent]) {
        var vendors: [[String: Any]] = []

        for vendor in consents {
            let mappedVendor: [String: Any] = [
                "id": vendor.templateId,
                "type": vendor.type?.name as Any,
                "status": vendor.status,
                "label": vendor.dataProcessor,
                "version": vendor.version,
            ]

            vendors.append(mappedVendor)
        }

        print("applied consents", consents);

        self._call?.resolve(["vendors": vendors])
    }
}
