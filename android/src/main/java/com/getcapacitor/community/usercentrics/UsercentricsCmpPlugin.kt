package com.getcapacitor.community.usercentrics

import android.util.Log
import androidx.activity.result.ActivityResultLauncher
import com.getcapacitor.*
import com.getcapacitor.annotation.CapacitorPlugin
import com.usercentrics.sdk.*

@CapacitorPlugin(
  name = "UsercentricsCmp",
  permissions = []
)
class UsercentricsCmpPlugin : Plugin() {
  private val TAG = "UsercentricsCmp"

  private var usercentricsActivityLauncher: ActivityResultLauncher<UsercentricsUISettings>? = null
  private var callbackId: String? = null
  private var settingsId: String? = null
  private var usercentricsInitialized: Boolean = false

  override fun load() {
    super.load()

    // TODO: it works, but there might be a better approach to init activity launcher
    usercentricsActivityLauncher = bridge.registerForActivityResult(UsercentricsActivityContract(), ::usercentricsActivityCallback)
  }

  @PluginMethod()
  fun init(call: PluginCall) {
    settingsId = call.getString("settingsId", "")

    if (settingsId == "") {
      call.reject("settingsId missing")
      return
    }
    callbackId = call.callbackId
    bridge.saveCall(call)

    val options = UsercentricsOptions(settingsId = settingsId!!)

    if (!usercentricsInitialized) {
      Usercentrics.initialize(context = context, options = options)
      usercentricsInitialized = true
    }

    // isReady is called after Usercentrics has finished initializing
    // get the consent status of the user, via UsercentricsReadyStatus
    Usercentrics.isReady(onSuccess = { status ->
      if (status.shouldShowCMP) {
        presentCMP()
      } else {
        applyConsent(status.consents)
      }
    }, onFailure = {
      // Handle error
      Log.e(TAG, it.toString())
      call.reject("error")
      call.release(bridge)
    })
  }

  @PluginMethod
  fun update(call: PluginCall) {
    if (!usercentricsInitialized) {
      call.reject("Usercentrics not initialized yet. Ensure init function has beeen called before")

      return
    }

    callbackId = call.callbackId
    bridge.saveCall(call)

    Log.d(TAG, "update cmp")
    presentCMP()
  }

  @PluginMethod
  fun reset(call: PluginCall) {
    if (!usercentricsInitialized) {
      call.reject("Usercentrics not initialized yet. Ensure init function has beeen called before")

      return
    }

    callbackId = call.callbackId
    bridge.saveCall(call)
    Log.d(TAG, "reset cmp")
    Usercentrics.reset()
    usercentricsInitialized = false

    val consents = JSObject()
    consents.put("vendors", JSArray())

    call.resolve(consents)
    call.release(bridge)
  }

  private fun applyConsent(consents: List<UsercentricsServiceConsent>?) {
    val call = bridge.getSavedCall(callbackId)
    val vendors = arrayListOf<JSObject>()

    consents?.forEach { vendor ->
      val jsVendor = JSObject()

      jsVendor.put("id", vendor.templateId)
      jsVendor.put("type", vendor.type.toString())
      jsVendor.put("status", vendor.status)
      jsVendor.put("label", vendor.dataProcessor)
      jsVendor.put("version", vendor.version)

      vendors.add(jsVendor)
      Log.d(TAG, "vendor: ${vendor.templateId} (${vendor.dataProcessor})")
    }

    val consents = JSObject()
    consents.put("vendors", JSArray(vendors))

    call.resolve(consents)
    call.release(bridge)
  }

  private fun presentCMP() {
    Log.d(TAG, "present cmp for $settingsId")

    usercentricsActivityLauncher?.launch(UsercentricsUISettings(showCloseButton = false))
  }

  private fun usercentricsActivityCallback(consentUserResponse: UsercentricsConsentUserResponse?) {
    if (consentUserResponse == null) {
      return
    }

    applyConsent(consentUserResponse.consents)
  }

}
