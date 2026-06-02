package com.marketify.app.ui.admin

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.marketify.app.data.model.Product
import com.marketify.app.data.repository.ProductRepository
import kotlinx.coroutines.launch

class AdminViewModel(private val productRepository: ProductRepository) : ViewModel() {

    private val _products = MutableLiveData<List<Product>>()
    val products: LiveData<List<Product>> get() = _products

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> get() = _isLoading

    private val _errorMessage = MutableLiveData<String?>()
    val errorMessage: LiveData<String?> get() = _errorMessage

    // Dashboard Static Metric summaries (matching original React version)
    val salesValue = "$45.2M"
    val ordersCount = "1,284"
    val clientsCount = "452"
    val dianInvoicesCount = "1,120"

    init {
        loadInventory()
    }

    fun loadInventory() {
        viewModelScope.launch {
            _isLoading.value = true
            _errorMessage.value = null
            
            productRepository.getProducts()
                .onSuccess { list ->
                    _products.value = list
                }
                .onFailure { exception ->
                    _errorMessage.value = "Error al cargar inventario: ${exception.localizedMessage}"
                }
            
            _isLoading.value = false
        }
    }

    fun createProduct(name: String, category: String, price: Double, stock: Int) {
        viewModelScope.launch {
            _isLoading.value = true
            val dummyProd = Product(
                id = "", // Mock interceptor sets random id
                name = name,
                price = price,
                image = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop",
                category = category,
                description = "Nuevo producto agregado administrativamente.",
                stock = stock,
                status = "Activo"
            )
            
            productRepository.createProduct(dummyProd)
                .onSuccess { item ->
                    // Add newly mock-created item to local livedata list representation
                    val currentList = _products.value?.toMutableList() ?: mutableListOf()
                    currentList.add(0, item)
                    _products.value = currentList
                }
                .onFailure { error ->
                    _errorMessage.value = "Error al crear producto: ${error.localizedMessage}"
                }
            _isLoading.value = false
        }
    }

    fun deleteProduct(id: String) {
        viewModelScope.launch {
            _isLoading.value = true
            productRepository.deleteProduct(id)
                .onSuccess { success ->
                    if (success) {
                        val currentList = _products.value?.toMutableList() ?: mutableListOf()
                        currentList.removeAll { it.id == id }
                        _products.value = currentList
                    }
                }
                .onFailure { error ->
                    _errorMessage.value = "Error al eliminar: ${error.localizedMessage}"
                }
            _isLoading.value = false
        }
    }
}

class AdminViewModelFactory(private val productRepository: ProductRepository) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(AdminViewModel::class.java)) {
            return AdminViewModel(productRepository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
