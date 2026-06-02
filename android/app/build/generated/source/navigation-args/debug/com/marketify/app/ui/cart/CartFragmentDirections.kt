package com.marketify.app.ui.cart

import androidx.navigation.ActionOnlyNavDirections
import androidx.navigation.NavDirections
import com.marketify.app.R

public class CartFragmentDirections private constructor() {
  public companion object {
    public fun actionCartToCheckout(): NavDirections =
        ActionOnlyNavDirections(R.id.action_cart_to_checkout)
  }
}
