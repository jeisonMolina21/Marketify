package com.marketify.app.data.local

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.OnConflictStrategy
import androidx.room.Query
import androidx.room.Update
import com.marketify.app.data.model.CartItem

@Dao
interface CartDao {
    @Query("SELECT * FROM cart_items")
    fun getAllItems(): LiveData<List<CartItem>>

    @Query("SELECT * FROM cart_items")
    suspend fun getAllItemsSync(): List<CartItem>

    @Query("SELECT * FROM cart_items WHERE id = :id LIMIT 1")
    suspend fun getItemById(id: String): CartItem?

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertItem(item: CartItem)

    @Update
    suspend fun updateItem(item: CartItem)

    @Delete
    suspend fun deleteItem(item: CartItem)

    @Query("UPDATE cart_items SET quantity = :quantity WHERE id = :id")
    suspend fun updateQuantity(id: String, quantity: Int)

    @Query("DELETE FROM cart_items")
    suspend fun clearCart()
}
