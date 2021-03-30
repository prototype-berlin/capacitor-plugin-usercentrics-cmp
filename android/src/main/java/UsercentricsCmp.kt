package berlin.prototype.capacitor.plugins.usercentrics;

import com.getcapacitor.*
import com.usercentrics.sdk.*
import com.usercentrics.sdk.models.common.*
import org.json.JSONArray

@NativePlugin
class UsercentricsCmp : Plugin() {
    @PluginMethod
    fun getPermissions(call: PluginCall) {
      val settingsId = call.getString("settingsId", "")
      if (settingsId == "")
      {
        call.reject("settingsId missing")
        return
      }

        val acceptedVendors = arrayListOf<String?>()
        val acceptedCategories = arrayListOf<String?>()
        val permissions = JSObject()
        permissions.put("acceptedVendors", JSONArray(acceptedVendors))
        permissions.put("acceptedCategories", JSONArray(acceptedCategories))
        call.resolve(permissions)

        val userOptions = UserOptions();
        val usercentrics = Usercentrics(
          settingsId = settingsId,
          options = userOptions,
          appContext = context // Create your Usercentrics instance  within your Application or Activity class.
        )

        usercentrics.initialize(
          callback = { initialValues ->
            call.resolve(permissions);
          },
          onFailure = { error ->
            call.reject("error");
          }
        )
    }


  @PluginMethod
  fun setPermissions(call: PluginCall) {
    val settingsId = call.getString("settingsId", "")
    if (settingsId == "")
    {
      call.reject("settingsId missing")
      return
    }
    val permissions = call.getObject("permissions", JSObject())
    call.resolve()
  }
  @PluginMethod
  fun reset(call: PluginCall) {
    val settingsId = call.getString("settingsId", "")
    if (settingsId == "")
    {
      call.reject("settingsId missing")
      return
    }
    call.resolve()
  }
}
