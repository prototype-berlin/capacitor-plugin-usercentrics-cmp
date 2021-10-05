import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@objc(UsercentricsCmpPlugin)
public class UsercentricsCmpPlugin: CAPPlugin {
    var settingsId: String?

    private let implementation = UsercentricsCmp()

    @objc(init:)
    func initialize(_ call: CAPPluginCall) { // 'init' cannot be used as an identifier here
        let value = call.getString("settingsId") ?? ""
        call.resolve([
            "acceptedVendors": []
        ])
    }
}
