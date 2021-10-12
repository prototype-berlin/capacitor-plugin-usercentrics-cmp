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
    private var usercentricsConfigured: Bool?

    @objc(init:)
    func initialize(_ call: CAPPluginCall) {
        self._call = call

        if ((self.usercentricsConfigured) == nil) {
            self.configureUsercentrics()
        }

        DispatchQueue.main.async {
            UsercentricsCore.isReady { status in
                if status.shouldShowCMP {
                    self.presentCmp()
                } else {
                    // Apply stored consent (Don't show CMP)
                    self.applyConsent(with: status.consents)
                }
            } onFailure: { error in
                // Handle error
              self._call?.reject(error.localizedDescription)
            }
        }
    }

    @objc func update(_ call: CAPPluginCall) {
        self._call = call

        if ((self.usercentricsConfigured) == nil) {
            self._call?.reject("Usercentrics not configured yet. Ensure init function has beeen called before")

            return;
        }

        DispatchQueue.main.async {
            self.presentCmp()
        }
    }

    @objc func reset(_ call: CAPPluginCall) {
        self._call = call

        if ((self.usercentricsConfigured) == nil) {
            self._call?.reject("Usercentrics not configured yet. Ensure init function has beeen called before")

            return;
        }

        DispatchQueue.main.async {
            UsercentricsCore.reset();

            self.usercentricsConfigured = nil;
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
        UsercentricsCore.configure(options: options)
        self.usercentricsConfigured = true;
    }


    private func presentCmp() {
        let settings = UsercentricsUISettings(customFont: nil, customLogo: nil, showCloseButton: false)

        let usercentricsUI: UIViewController = UsercentricsUserInterface.getPredefinedUI(settings: settings) { [weak self] response in
            guard let self = self else { return }
            self.applyConsent(with: response.consents)
            self.bridge?.viewController?.dismiss(animated: true, completion: nil)
        }

        if #available(iOS 13.0, *) {
            usercentricsUI.isModalInPresentation = true
            usercentricsUI.modalPresentationStyle = .popover
        }

        self.bridge?.viewController?.present(usercentricsUI, animated: true, completion: nil)
    }

    private func applyConsent(with consents: [UsercentricsServiceConsent]) {
        var vendors: [[String: Any]] = []

        for vendor in consents {
            let mappedVendor: [String: Any] = [
                "id": vendor.templateId,
                "type": vendor.type?.text as Any,
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
