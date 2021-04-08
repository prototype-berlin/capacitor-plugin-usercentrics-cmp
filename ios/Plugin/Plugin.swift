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
    
    @objc override public func load() {
      // Called when the plugin is first constructed in the bridge
      print("load usercentrics cmp plugin");
    }

    @objc func getConsents(_ call: CAPPluginCall) {
        guard let settingsId = call.options["settingsId"] as? String else {
            call.reject("settingsId missing")
            return
        }
        
        DispatchQueue.main.async {
            let userOptions = UserOptions(controllerId: nil,
                                          defaultLanguage: nil,
                                          version: nil,
                                          debugMode: false,
                                          predefinedUI: true,
                                          timeoutMillis: nil,
                                          noCache:false)
            
            let usercentrics = Usercentrics(settingsId: settingsId, options: userOptions)
            usercentrics.initialize { initialValues in
                switch initialValues.initialLayer {
                case .firstLayer:
                    self.presentCmp(call, usercentrics)
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
        guard let settingsId = call.options["settingsId"] as? String else {
            call.reject("settingsId missing")
            return
        }
        
        call.resolve([
            "acceptedVendors": [],
        ])
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
    
    func presentCmp(_ call: CAPPluginCall, _ usercentrics: Usercentrics?) {
        self.predefinedUI = usercentrics?.getPredefinedUI(customAssets: nil, showCloseButton: false) {
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
