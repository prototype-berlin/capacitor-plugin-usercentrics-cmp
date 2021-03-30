import Foundation
import Capacitor
import Usercentrics

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(UsercentricsCmp)
public class UsercentricsCmp: CAPPlugin {
    @objc override public func load() {
      // Called when the plugin is first constructed in the bridge
      print("load usercentrics cmp plugin");
    }

    @objc func getPermissions(_ call: CAPPluginCall) {
      guard let settingsId = call.options["settingsId"] as? String else {
        call.reject("settingsId missing")
        return
      }

      let userOptions = UserOptions(controllerId: nil,
                              defaultLanguage: "de",
                              version: nil,
                              debugMode: false,
                              predefinedUI: true,
                              timeoutMillis: nil,
                              noCache:false)

      let usercentrics = Usercentrics(settingsId: settingsId,
                                      options: userOptions)

      usercentrics.initialize { initialValues in
          call.resolve([
                    "acceptedVendors": ["vendor1", "vendor2"],
                    "acceptedCategories": ["cat1", "cat2"]
                ])
      } onFailure: { error in
        call.reject("ERROR")
      }
    }

    @objc func setPermissions(_ call: CAPPluginCall) {
      guard let settingsId = call.options["settingsId"] as? String else {
        call.reject("settingsId missing")
        return
      }

      let permissions = call.getObject("address") ?? [:]
      call.resolve()
    }

    @objc func reset(_ call: CAPPluginCall) {
      guard let settingsId = call.options["settingsId"] as? String else {
        call.reject("settingsId missing")
        return
      }

      call.resolve()
    }
}
