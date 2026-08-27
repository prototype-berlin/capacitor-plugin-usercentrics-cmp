// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "CapacitorPluginUsercentricsCmp",
    platforms: [.iOS(.v15)],
    products: [
        .library(
            name: "CapacitorPluginUsercentricsCmp",
            targets: ["UsercentricsCmpPlugin"]),
        .library(
            name: "UsercentricsCmpPlugin",
            targets: ["UsercentricsCmpPlugin"])
    ],
    dependencies: [
        .package(url: "https://github.com/ionic-team/capacitor-swift-pm.git", from: "8.0.0"),
        .package(url: "https://bitbucket.org/usercentricscode/usercentrics-spm-sdk.git", from: "2.11.3"),
        .package(url: "https://bitbucket.org/usercentricscode/usercentrics-spm-ui.git", from: "2.11.3"),
    ],
    targets: [
        .target(
            name: "UsercentricsCmpPlugin",
            dependencies: [
                .product(name: "Capacitor", package: "capacitor-swift-pm"),
                .product(name: "Cordova", package: "capacitor-swift-pm"),
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
