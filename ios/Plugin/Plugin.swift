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
        print("load usercentrics cmp plugin")
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
                default:
                    self.mapConsents(call)
                }
            } onFailure: { error in
                print(error)
            }
        }
    }
    
    @objc func updateConsents(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.presentCmp(call)
        }
    }
    
    @objc func resetConsents(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            self.usercentrics?.resetUserSession(callback: {_ in
                self.mapConsents(call)
            }, onFailure: { error in
                print(error)
            })
        }
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
        guard let vendors = self.usercentrics?.getServices() else {
            call.reject("vendors missing")
            return
        }
        
        var acceptedVendors: [[String: Any]] = []
        for vendor in vendors {
            if (vendor.consent.status) {
                let mappedVendor: [String: Any] = [
                    "id": vendor.id,
                    "label": vendor.name,
                    "categoryId": vendor.categorySlug,
                    "subVendors": getMappedSubVendors(vendor.subServices)
                ]
                
                acceptedVendors.append(mappedVendor)
            }
        }
        
        call.success([
            "acceptedVendors": acceptedVendors
        ])
    }
    
    // TODO: provide user centrics example with sub vendors
    func getMappedSubVendors(_ subVendors: [BaseService]) -> [[String: Any]] {
        var mappedSubVendors: [[String: Any]] = []
        
        for subVendor in subVendors {
            let mappedSubVendor: [String: Any] = [
                "id": subVendor.id,
                "label": subVendor.name,
            ]
            
            mappedSubVendors.append(mappedSubVendor)
        }
        
        return mappedSubVendors
    }
}
