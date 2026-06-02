package com.marketify.app.ui.catalog

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

class CatalogViewModel(
    private val productRepository: ProductRepository,
    private val cartRepository: CartRepository
) : ViewModel() {

    private val _products = MutableLiveData<List<Product>>()
    val products: LiveData<List<Product>> get() = _products

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> get() = _isLoading

    private val _errorMessage = MutableLiveData<String?>()
    val errorMessage: LiveData<String?> get() = _errorMessage

    private var currentCategory: String? = null
    private var currentSearch: String? = null

    init {
        loadProducts()
    }

    fun loadProducts(category: String? = currentCategory, search: String? = currentSearch) {
        currentCategory = category
        currentSearch = search
        
        viewModelScope.launch {
            _isLoading.value = true
            _errorMessage.value = null
            
            productRepository.getProducts(category, search)
                .onSuccess { list ->
                    _products.value = list
                }
                .onFailure { exception ->
                    _errorMessage.value = "Error al cargar catálogo: ${exception.localizedMessage}"
                }
            
            _isLoading.value = false
        }
    }

    fun addToCart(product: Product) {
        viewModelScope.launch {
            val item = CartItem(
                id = product.id,
                name = product.name,
                price = product.price,
                image = product.image,
                category = product.category,
                quantity = 1
            )
            cartRepository.addItem(item)
        }
    }
}

class CatalogViewModelFactory(
    private val productRepository: ProductRepository,
    private val cartRepository: CartRepository
) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(CatalogViewModel::class.java)) {
            return CatalogViewModel(productRepository, cartRepository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
