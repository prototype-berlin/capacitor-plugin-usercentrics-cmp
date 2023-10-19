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

  private var banner: UsercentricsBanner? = null
  private var callbackId: String? = null
  private var settingsId: String? = null
  private var usercentricsInitialized: Boolean = false

  override fun load() {
    super.load()
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
    options.defaultLanguage = call.getString("language", "en")!!

    if (!usercentricsInitialized) {
      Usercentrics.initialize(context = context, options = options)
      usercentricsInitialized = true
    }

    Usercentrics.isReady(onSuccess = { status ->
      if (status.shouldCollectConsent) {
        showFirstLayer()
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

    Usercentrics.instance.changeLanguage(call.getString("language", "en")!!, onSuccess = {
      showSecondLayer()
    }, onFailure = {
      // ignore language switch error, present cmp anyway
      Log.e(TAG, it.toString())
      showSecondLayer()
    })
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

  private fun showFirstLayer(settings: BannerSettings? = null) {

    // Launch Usercentrics Banner with your settings
    banner = UsercentricsBanner(context, settings).also {
      it.showFirstLayer(
        callback = ::handleUserResponse
      )
    }
  }

  private fun showSecondLayer() {
    // This is useful when you need to call our CMP from settings screen for instance, therefore the user may dismiss the view
    val settings = BannerSettings(
      secondLayerStyleSettings = SecondLayerStyleSettings(
        showCloseButton = true,
      )
    )


    activity.runOnUiThread {
      banner = UsercentricsBanner(context, settings).also {
        it.showSecondLayer(
          callback = ::handleUserResponse
        )
      }
    }
  }

  private fun handleUserResponse(userResponse: UsercentricsConsentUserResponse?) {
    userResponse ?: return

    applyConsent(userResponse.consents)
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
}
