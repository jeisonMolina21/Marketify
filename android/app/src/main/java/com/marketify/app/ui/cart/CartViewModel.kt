package com.marketify.app.ui.cart

import androidx.lifecycle.LiveData
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.marketify.app.data.model.CartItem
import com.marketify.app.data.repository.CartRepository
import kotlinx.coroutines.launch

class CartViewModel(private val cartRepository: CartRepository) : ViewModel() {

    val cartItems: LiveData<List<CartItem>> = cartRepository.allItems

    val subtotal = MediatorLiveData<Double>().apply {
        addSource(cartItems) { list ->
            value = calculateSubtotal(list)
        }
    }

    val taxes = MediatorLiveData<Double>().apply {
        addSource(subtotal) { sub ->
            value = sub * 0.19 // Colombia 19% IVA
        }
    }

    val total = MediatorLiveData<Double>().apply {
        addSource(subtotal) { sub ->
            val subVal = sub ?: 0.0
            value = subVal * 1.19
        }
    }

    private fun calculateSubtotal(items: List<CartItem>?): Double {
        if (items.isNullOrEmpty()) return 0.0
        return items.sumOf { it.price * it.quantity }
    }

    fun updateQuantity(id: String, quantity: Int) {
        viewModelScope.launch {
            cartRepository.updateQuantity(id, quantity)
        }
    }

    fun removeItem(id: String) {
        viewModelScope.launch {
            cartRepository.removeItem(id)
        }
    }

    fun clearCart() {
        viewModelScope.launch {
            cartRepository.clearCart()
        }
    }
}

class CartViewModelFactory(private val cartRepository: CartRepository) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(CartViewModel::class.java)) {
            return CartViewModel(cartRepository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
