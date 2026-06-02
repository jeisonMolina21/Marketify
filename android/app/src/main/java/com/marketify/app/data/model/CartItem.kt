package com.marketify.app.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "cart_items")
data class CartItem(
    @PrimaryKey val id: String,
    val name: String,
    val price: Double,
    val image: String,
    val category: String,
    var quantity: Int = 1,
    val selectedColor: String? = null,
    val selectedSize: String? = null
) {
    val totalPrice: Double
        get() = price * quantity
}
