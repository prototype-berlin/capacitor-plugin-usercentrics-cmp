package com.getcapacitor.community.usercentrics

import android.content.Intent
import android.util.Log
import com.getcapacitor.*

import com.usercentrics.sdk.ServiceResult
import com.usercentrics.sdk.Usercentrics
import com.usercentrics.sdk.UsercentricsActivity
import com.usercentrics.sdk.models.common.InitialView
import com.usercentrics.sdk.models.common.UserOptions
import com.usercentrics.sdk.models.settings.BaseService

@NativePlugin(requestCodes = [UsercentricsActivity.REQUEST_CODE, UsercentricsActivity.RESULT_OK_CODE, UsercentricsActivity.RESULT_ERROR_CODE])
class UsercentricsCmp : Plugin() {
  private val TAG = "UsercentricsCmp"

  // TODO: get userOptions via optional parameter (JSObject)
  private val userOptions = UserOptions(
    predefinedUI = true
  )

  private var settingsId: String? = null
  private var usercentrics: Usercentrics? = null

  @PluginMethod
  fun getConsents(call: PluginCall) {
    settingsId = call.getString("settingsId", "")

    if (settingsId == "") {
      call.reject("settingsId missing")
      return
    }

    saveCall(call)

    usercentrics =  Usercentrics(
      settingsId = settingsId!!,
      options = userOptions,
      appContext = context
    )

    usercentrics!!.initialize(
      callback = { initialValues ->
        when (initialValues.initialLayer) {
          InitialView.FIRST_LAYER -> presentCMP()
          InitialView.NONE -> {
            mapConsents(call)
          }
        }
      },
      onFailure = { error ->
        Log.e(TAG, error.toString())
        call.reject("error")
        freeSavedCall()
      }
    )
  }

  @PluginMethod
  fun updateConsents(call: PluginCall) {
    saveCall(call)
    presentCMP()
  }

  @PluginMethod
  fun resetConsents(call: PluginCall) {
    saveCall(call)

    usercentrics!!.resetUserSession(
      callback = {
        Log.d(TAG, "reset cmp")
        mapConsents(call)
      },
      onFailure = { error ->
        Log.e(TAG, error.toString())
        call.reject("error")
      }
    )
  }

  override fun handleOnActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
    super.handleOnActivityResult(requestCode, resultCode, data)
    val call = savedCall

    if (call == null) {
      Log.e(TAG, "could not find a saved PluginCall, discarding activity result")
      return
    }

    Log.d(TAG, "handleOnActivityResult called with request code: $requestCode and resultCode: $resultCode")

    if (requestCode == UsercentricsActivity.REQUEST_CODE && resultCode == UsercentricsActivity.RESULT_OK_CODE) {
      mapConsents(call, UsercentricsActivity.getResult(data))
      return
    }

    freeSavedCall()
  }

  private fun presentCMP() {
    Log.d(TAG, "present cmp for $settingsId")

    UsercentricsActivity.start(
      context = context,
      settingsID = settingsId!!,
      userOptions = userOptions,
    )
  }

  private fun mapConsents(call: PluginCall, result: List<ServiceResult>? = null) {
    val acceptedVendors = getMappedAcceptedVendors(result)

    val consents = JSObject()
    consents.put("acceptedVendors", JSArray(acceptedVendors))

    call.success(consents)
    freeSavedCall()
  }

  private fun getMappedAcceptedVendors(result: List<ServiceResult>? = null): ArrayList<JSObject> {
    val allVendors = usercentrics!!.getServices()
    val acceptedVendors = arrayListOf<JSObject>()

    if (allVendors != null) {
      for (vendor in allVendors) {
        var consentStatus: Boolean = vendor.consent.status

        //  `allVendors doesn't contain updated consent status when changing consents via privacy manager (handleOnActivityResult)
        // therefore we need `result` as optional parameter to check current consent status
        if (result != null) {
          val item = result.find { it.id == vendor.id }
          consentStatus = item!!.consentStatus
        }

        if (consentStatus) {
          val jsVendor = JSObject()
          jsVendor.put("id", vendor.id)
          jsVendor.put("label", vendor.name)
          jsVendor.put("categoryId", vendor.categorySlug)

          // TODO: provide user centrics example with sub vendors
          val jsSubVendors = getMappedSubVendors(vendor.subServices)
          jsVendor.put("subVendors", JSArray(jsSubVendors))

          acceptedVendors.add(jsVendor)
          Log.d(TAG, "accepted vendor: ${vendor.id} (${vendor.name}), category: ${vendor.categorySlug}")
        }
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

