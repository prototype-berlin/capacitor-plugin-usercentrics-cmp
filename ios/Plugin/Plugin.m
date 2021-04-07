#import <Foundation/Foundation.h>
#import <Capacitor/Capacitor.h>

// Define the plugin using the CAP_PLUGIN Macro, and
// each method the plugin supports using the CAP_PLUGIN_METHOD macro.
CAP_PLUGIN(UsercentricsCmp, "UsercentricsCmp",
    CAP_PLUGIN_METHOD(getConsents, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(updateConsents, CAPPluginReturnPromise);
    CAP_PLUGIN_METHOD(resetConsents, CAPPluginReturnPromise);
)
