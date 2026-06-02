package com.marketify.app.ui.detail

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.marketify.app.data.model.CartItem
import com.marketify.app.data.model.Product
import com.marketify.app.data.repository.CartRepository
import com.marketify.app.data.repository.ProductRepository
import kotlinx.coroutines.launch

class ProductDetailViewModel(
    private val productRepository: ProductRepository,
    private val cartRepository: CartRepository
) : ViewModel() {

    private val _product = MutableLiveData<Product>()
    val product: LiveData<Product> get() = _product

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> get() = _isLoading

    private val _errorMessage = MutableLiveData<String?>()
    val errorMessage: LiveData<String?> get() = _errorMessage

    private var selectedColor: String? = null
    private var selectedSize: String? = null

    fun loadProductDetail(id: String) {
        viewModelScope.launch {
            _isLoading.value = true
            _errorMessage.value = null
            
            productRepository.getProductById(id)
                .onSuccess { item ->
                    _product.value = item
                }
                .onFailure { exception ->
                    _errorMessage.value = "Error al cargar detalle: ${exception.localizedMessage}"
                }
            
            _isLoading.value = false
        }
    }

    fun selectColor(color: String) {
        selectedColor = color
    }

    fun selectSize(size: String) {
        selectedSize = size
    }

    fun addToCart() {
        val currentProduct = _product.value ?: return
        viewModelScope.launch {
            val item = CartItem(
                id = currentProduct.id,
                name = currentProduct.name,
                price = currentProduct.price,
                image = currentProduct.image,
                category = currentProduct.category,
                quantity = 1,
                selectedColor = selectedColor,
                selectedSize = selectedSize
            )
            cartRepository.addItem(item)
        }
    }
}

class ProductDetailViewModelFactory(
    private val productRepository: ProductRepository,
    private val cartRepository: CartRepository
) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(ProductDetailViewModel::class.java)) {
            return ProductDetailViewModel(productRepository, cartRepository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
