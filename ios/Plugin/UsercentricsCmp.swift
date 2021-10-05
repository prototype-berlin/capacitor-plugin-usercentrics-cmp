import Foundation

@objc public class UsercentricsCmp: NSObject {
    @objc public func initialize(_ settingsId: String) -> Bool {
        print("init with settings id: ", settingsId)
        return true
    }
    
    @objc public func update() -> Bool {
        print("update usercentrics")
        return true
    }

    @objc public func reset() -> Bool {
        print("reset usercentrics")
        return true
    }
}
