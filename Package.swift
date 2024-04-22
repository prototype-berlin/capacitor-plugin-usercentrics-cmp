// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorPluginUsercentricsCmp",
    platforms: [.iOS(.v13)],
    products: [
        .library(
            name: "UsercentricsCmpPlugin",
            targets: ["UsercentricsCmpPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor6-spm-test.git", branch: "main"),
        .package(url: "https://bitbucket.org/usercentricscode/usercentrics-spm-sdk.git", from: "2.11.3"),
        .package(url: "https://bitbucket.org/usercentricscode/usercentrics-spm-ui.git", from: "2.11.3"),
    ],
    targets: [
        .target(
            name: "UsercentricsCmpPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor6-spm-test"),
                .product(name: "Cordova", package: "capacitor6-spm-test"),
                .product(name: "Usercentrics", package: "usercentrics-spm-sdk"),
                .product(name: "UsercentricsUI", package: "usercentrics-spm-ui"),
            ],
            path: "ios/Sources/UsercentricsCmpPlugin"),
        .testTarget(
            name: "UsercentricsCmpPluginTests",
            dependencies: ["UsercentricsCmpPlugin"],
            path: "ios/Tests/UsercentricsCmpPluginTests")
    ]
)
