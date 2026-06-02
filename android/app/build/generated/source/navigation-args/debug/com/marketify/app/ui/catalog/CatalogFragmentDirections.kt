package com.marketify.app.ui.catalog

import android.os.Bundle
import androidx.navigation.NavDirections
import com.marketify.app.R
import kotlin.Int
import kotlin.String

public class CatalogFragmentDirections private constructor() {
  private data class ActionCatalogToDetail(
    public val productId: String,
  ) : NavDirections {
    public override val actionId: Int = R.id.action_catalog_to_detail

    public override val arguments: Bundle
      get() {
        val result = Bundle()
        result.putString("productId", this.productId)
        return result
      }
  }

  public companion object {
    public fun actionCatalogToDetail(productId: String): NavDirections =
        ActionCatalogToDetail(productId)
  }
}
