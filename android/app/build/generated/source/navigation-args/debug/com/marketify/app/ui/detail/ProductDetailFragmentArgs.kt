package com.marketify.app.ui.detail

import android.os.Bundle
import androidx.lifecycle.SavedStateHandle
import androidx.navigation.NavArgs
import java.lang.IllegalArgumentException
import kotlin.String
import kotlin.jvm.JvmStatic

public data class ProductDetailFragmentArgs(
  public val productId: String,
) : NavArgs {
  public fun toBundle(): Bundle {
    val result = Bundle()
    result.putString("productId", this.productId)
    return result
  }

  public fun toSavedStateHandle(): SavedStateHandle {
    val result = SavedStateHandle()
    result.set("productId", this.productId)
    return result
  }

  public companion object {
    @JvmStatic
    public fun fromBundle(bundle: Bundle): ProductDetailFragmentArgs {
      bundle.setClassLoader(ProductDetailFragmentArgs::class.java.classLoader)
      val __productId : String?
      if (bundle.containsKey("productId")) {
        __productId = bundle.getString("productId")
        if (__productId == null) {
          throw IllegalArgumentException("Argument \"productId\" is marked as non-null but was passed a null value.")
        }
      } else {
        throw IllegalArgumentException("Required argument \"productId\" is missing and does not have an android:defaultValue")
      }
      return ProductDetailFragmentArgs(__productId)
    }

    @JvmStatic
    public fun fromSavedStateHandle(savedStateHandle: SavedStateHandle): ProductDetailFragmentArgs {
      val __productId : String?
      if (savedStateHandle.contains("productId")) {
        __productId = savedStateHandle["productId"]
        if (__productId == null) {
          throw IllegalArgumentException("Argument \"productId\" is marked as non-null but was passed a null value")
        }
      } else {
        throw IllegalArgumentException("Required argument \"productId\" is missing and does not have an android:defaultValue")
      }
      return ProductDetailFragmentArgs(__productId)
    }
  }
}
