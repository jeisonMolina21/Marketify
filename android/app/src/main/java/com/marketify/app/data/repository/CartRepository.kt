package com.marketify.app.data.repository

import androidx.lifecycle.LiveData
import com.marketify.app.data.local.CartDao
import com.marketify.app.data.model.CartItem

class CartRepository(private val cartDao: CartDao) {
    val allItems: LiveData<List<CartItem>> = cartDao.getAllItems()

    suspend fun getAllItemsSync(): List<CartItem> {
        return cartDao.getAllItemsSync()
    }

    suspend fun addItem(item: CartItem) {
        val existing = cartDao.getItemById(item.id)
        if (existing != null) {
            existing.quantity += item.quantity
            cartDao.updateItem(existing)
        } else {
            cartDao.insertItem(item)
        }
    }

    suspend fun updateQuantity(id: String, quantity: Int) {
        if (quantity <= 0) {
            val item = cartDao.getItemById(id)
            if (item != null) {
                cartDao.deleteItem(item)
            }
        } else {
            cartDao.updateQuantity(id, quantity)
        }
    }

    suspend fun removeItem(id: String) {
        val item = cartDao.getItemById(id)
        if (item != null) {
            cartDao.deleteItem(item)
        }
    }

    suspend fun clearCart() {
        cartDao.clearCart()
    }
}
