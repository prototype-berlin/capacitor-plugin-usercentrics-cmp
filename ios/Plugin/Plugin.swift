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

    @objc func getConsents(_ call: CAPPluginCall) {
      guard let settingsId = call.options["settingsId"] as? String else {
        call.reject("settingsId missing")
        return
      }

      let userOptions = UserOptions(predefinedUI: true)

      let usercentrics = Usercentrics(settingsId: settingsId,
                                      options: userOptions)

      usercentrics.initialize { initialValues in
          call.resolve([
                    "acceptedVendors": [],
                ])
      } onFailure: { error in
        call.reject("ERROR")
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
}
