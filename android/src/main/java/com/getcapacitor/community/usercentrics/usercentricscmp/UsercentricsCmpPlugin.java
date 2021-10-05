package com.getcapacitor.community.usercentrics.usercentricscmp;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "UsercentricsCmp")
public class UsercentricsCmpPlugin extends Plugin {

    private UsercentricsCmp implementation = new UsercentricsCmp();

    @PluginMethod
    public void init(PluginCall call) {
        String settingsId = call.getString("settingsId");

        JSObject ret = new JSObject();
        ret.put("acceptedVendors", implementation.init(settingsId));
        call.resolve(ret);
    }
}