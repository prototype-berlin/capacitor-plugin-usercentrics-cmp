package com.getcapacitor.community.usercentrics

import android.util.Log
import org.json.JSONArray

import com.getcapacitor.JSObject
import com.getcapacitor.NativePlugin
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod

import com.usercentrics.sdk.Usercentrics
import com.usercentrics.sdk.UsercentricsActivity
import com.usercentrics.sdk.models.common.InitialView
import com.usercentrics.sdk.models.common.UserOptions

@NativePlugin
class UsercentricsCmp : Plugin() {
  private val TAG = "UsercentricsCmp"

  private val userOptions = UserOptions(
    controllerId = null,
    defaultLanguage = "de",
    version = null,
    debugMode = true,
    predefinedUI = true,
    timeoutMillis = 10000,
    noCache = false
  )

  @PluginMethod
  fun getPermissions(call: PluginCall) {
    val settingsId = call.getString("settingsId", "")
    if (settingsId == "") {
      call.reject("settingsId missing")
      return
    }

    Log.d(TAG, settingsId)

    val usercentrics = Usercentrics(
      settingsId = settingsId,
      options = userOptions,
      appContext = context
    )

    usercentrics.initialize(
      callback = { initialValues ->
        when (initialValues.initialLayer) {
          InitialView.FIRST_LAYER -> presentCMP(call, settingsId, usercentrics)
          InitialView.NONE -> {
            updateConsents(call, settingsId, usercentrics)
          }
        }

      },
      onFailure = { error ->
        Log.e(TAG, error.toString())
        call.reject("error")
      }
    )
  }


  @PluginMethod
  fun setPermissions(call: PluginCall) {
    val settingsId = call.getString("settingsId", "")
    if (settingsId == "") {
      call.reject("settingsId missing")
      return
    }
    val permissions = call.getObject("permissions", JSObject())
    call.resolve()
  }

  @PluginMethod
  fun reset(call: PluginCall) {
    val settingsId = call.getString("settingsId", "")
    if (settingsId == "") {
      call.reject("settingsId missing")
      return
    }
    call.resolve()
  }

  private fun presentCMP(call: PluginCall, settingsId: String, usercentrics: Usercentrics) {
    Log.d(TAG, "present cmp")

    UsercentricsActivity.start(
      context = context,
      settingsID = settingsId,
      userOptions = userOptions
    )
  }

  private fun updateConsents(call: PluginCall, settingsId: String, usercentrics: Usercentrics) {
    val acceptedCategories = arrayListOf<String?>()
    val acceptedServices = arrayListOf<String?>()
    val consents = JSObject()

    // set accepted categories
    val categories = usercentrics.getCategories();
    if (categories != null) {
      for (category in categories) {
        acceptedCategories.add(category.slug);
      }
    }

    // set accepted services
    val services = usercentrics.getServices();
    if (services != null) {
      for (service in services) {
        acceptedServices.add(service.id);
      }
    }

    consents.put("acceptedCategories", JSONArray(acceptedCategories))
    consents.put("acceptedVendors", JSONArray(acceptedServices))

    Log.d(TAG, "get permissions")
    Log.d(TAG, consents.toString())
    call.resolve(consents)
  }
}
