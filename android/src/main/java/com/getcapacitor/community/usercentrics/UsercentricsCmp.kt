package com.getcapacitor.community.usercentrics

import android.util.Log
import com.getcapacitor.*

import com.usercentrics.sdk.Usercentrics
import com.usercentrics.sdk.UsercentricsActivity
import com.usercentrics.sdk.models.common.InitialView
import com.usercentrics.sdk.models.common.UserOptions
import com.usercentrics.sdk.models.settings.BaseService

@NativePlugin
class UsercentricsCmp : Plugin() {
  private val TAG = "UsercentricsCmp"

  // TODO: get userOptions via optional parameter (JSObject)
  private val userOptions = UserOptions(
    predefinedUI = true
  )

  @PluginMethod
  fun getConsents(call: PluginCall) {
    val settingsId = call.getString("settingsId", "")

    if (settingsId == "") {
      call.reject("settingsId missing")
      return
    }

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
            mapConsents(call, settingsId, usercentrics)
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
  fun updateConsents(call: PluginCall) {
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
    Log.d(TAG, "present cmp for $settingsId")

    UsercentricsActivity.start(
      context = context,
      settingsID = settingsId,
      userOptions = userOptions
    )
  }

  private fun mapConsents(call: PluginCall, settingsId: String, usercentrics: Usercentrics) {
    val acceptedCategories = getMappedCategories(usercentrics)
    val acceptedVendors = getMappedAcceptedVendors(usercentrics)

    val consents = JSObject()
    consents.put("acceptedCategories", JSArray(acceptedCategories))
    consents.put("acceptedVendors", JSArray(acceptedVendors))

    call.resolve(consents)
  }

  private fun getMappedCategories(usercentrics: Usercentrics): ArrayList<JSObject> {
    val acceptedCategories = arrayListOf<JSObject>()

    // set accepted categories
    val categories = usercentrics.getCategories()
    if (categories != null) {
      for (category in categories) {
        val jsCategory = JSObject()
        jsCategory.put("id", category.slug)
        jsCategory.put("label", category.label)
        jsCategory.put("isEssential", category.isEssential)

        acceptedCategories.add(jsCategory)
      }
    }

    return acceptedCategories
  }

  private fun getMappedAcceptedVendors(usercentrics: Usercentrics): ArrayList<JSObject> {
    val acceptedVendors = arrayListOf<JSObject>()

    val vendors = usercentrics.getServices()
    if (vendors != null) {
      for (vendor in vendors) {
        val jsVendor = JSObject()
        jsVendor.put("id", vendor.id)
        jsVendor.put("label", vendor.name)
        jsVendor.put("categoryId", vendor.categorySlug)
        jsVendor.put("isEssential", vendor.isEssential)

        if (vendor.subServices != null) {
          val jsSubVendors = getMappedSubVendors(vendor.subServices)
          jsVendor.put("subVendors", JSArray(jsSubVendors))
        }

        acceptedVendors.add(jsVendor)
      }
    }

    return acceptedVendors
  }

  private fun getMappedSubVendors(subVendors: List<BaseService>): ArrayList<JSObject> {
    val jsSubVendors = arrayListOf<JSObject>()
    for (subVendor in subVendors) {
      val jsSubVendor = JSObject()
      jsSubVendor.put("id", subVendor.id)
      jsSubVendor.put("label", subVendor.name)

      jsSubVendors.add(jsSubVendor)
    }

    return jsSubVendors
  }
}
