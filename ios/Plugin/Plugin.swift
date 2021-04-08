import Foundation
import Capacitor
import Usercentrics

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(UsercentricsCmp)
public class UsercentricsCmp: CAPPlugin {
    var predefinedUI: UIViewController?
    var usercentrics: Usercentrics?
    var settingsId: String?
    
    // TODO: get userOptions via optional parameter (JSObject)
    var userOptions = UserOptions(controllerId: nil,
                                  defaultLanguage: nil,
                                  version: nil,
                                  debugMode: false,
                                  predefinedUI: true,
                                  timeoutMillis: nil,
                                  noCache:false
    )
    
    @objc override public func load() {
        // Called when the plugin is first constructed in the bridge
        print("load usercentrics cmp plugin");
    }
    
    @objc func getConsents(_ call: CAPPluginCall) {
        self.settingsId = call.options["settingsId"] as? String
        
        if (self.settingsId ?? "").isEmpty {
            call.reject("settingsId missing")
            return
        }
        
        DispatchQueue.main.async {
            self.usercentrics = Usercentrics(settingsId: self.settingsId!, options: self.userOptions)
            self.usercentrics?.initialize { initialValues in
                switch initialValues.initialLayer {
                case .firstLayer:
                    self.presentCmp(call)
                case .none:
                    self.mapConsents(call)
                default:
                    print(initialValues.initialLayer)
                }
            } onFailure: { error in
                print(error);
            }
        }
    }
    
    @objc func updateConsents(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.presentCmp(call)
        }
    }
    
    @objc func resetConsents(_ call: CAPPluginCall) {
        guard let settingsId = call.options["settingsId"] as? String else {
            call.reject("settingsId missing")
            return
        }
        
        call.resolve([
            "acceptedVendors": [],
        ])
    }
    
    func presentCmp(_ call: CAPPluginCall) {
        self.predefinedUI = self.usercentrics?.getPredefinedUI(customAssets: nil, showCloseButton: false) {
            self.predefinedUI?.dismiss(animated: true, completion: nil)
            self.mapConsents(call)
        }
        
        guard let ui = self.predefinedUI else { return }
        
        self.bridge.viewController.present(ui, animated: true, completion: nil)
    }
    
    func mapConsents(_ call: CAPPluginCall) {
        print("TODO: map consents properly");
        
        call.resolve([
            "acceptedVendors": [],
        ])
    }
}
