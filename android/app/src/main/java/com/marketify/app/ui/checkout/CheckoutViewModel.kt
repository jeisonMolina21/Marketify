package com.marketify.app.ui.checkout

import androidx.lifecycle.LiveData
import androidx.lifecycle.MediatorLiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.marketify.app.data.model.CartItem
import com.marketify.app.data.model.Order
import com.marketify.app.data.repository.AuthRepository
import com.marketify.app.data.repository.CartRepository
import kotlinx.coroutines.launch
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class CheckoutViewModel(
    private val authRepository: AuthRepository,
    private val cartRepository: CartRepository
) : ViewModel() {

    private val _currentStep = MutableLiveData(1) // 1: Shipping, 2: Billing, 3: Payment
    val currentStep: LiveData<Int> get() = _currentStep

    private val _cartItems = MutableLiveData<List<CartItem>>()
    val cartItems: LiveData<List<CartItem>> get() = _cartItems

    private val _orderPlaced = MutableLiveData<String?>() // Order ID on success
    val orderPlaced: LiveData<String?> get() = _orderPlaced

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> get() = _isLoading

    private val _errorMessage = MutableLiveData<String?>()
    val errorMessage: LiveData<String?> get() = _errorMessage

    // Calculations
    val subtotal = MediatorLiveData<Double>().apply {
        addSource(_cartItems) { list ->
            value = list?.sumOf { it.price * it.quantity } ?: 0.0
        }
    }
    val taxes = MediatorLiveData<Double>().apply {
        addSource(subtotal) { sub -> value = sub * 0.19 }
    }
    val total = MediatorLiveData<Double>().apply {
        addSource(subtotal) { sub -> value = sub * 1.19 }
    }

    // Input States
    val email = MutableLiveData("")
    val phone = MutableLiveData("")
    val firstName = MutableLiveData("")
    val lastName = MutableLiveData("")
    val address = MutableLiveData("")
    val department = MutableLiveData("Bogotá")
    val city = MutableLiveData("")

    // Invoicing States
    val requiresInvoice = MutableLiveData(false)
    val idType = MutableLiveData("CC")
    val idNumber = MutableLiveData("")
    val businessName = MutableLiveData("")

    // Payment method
    private var paymentMethod = "Tarjeta de Crédito"

    init {
        loadCartItems()
    }

    private fun loadCartItems() {
        viewModelScope.launch {
            val items = cartRepository.getAllItemsSync()
            _cartItems.value = items
        }
    }

    fun setStep(step: Int) {
        if (step in 1..3) {
            _currentStep.value = step
        }
    }

    fun setPaymentMethod(method: String) {
        paymentMethod = method
    }

    fun validateShipping(): Boolean {
        if (email.value.isNullOrBlank() || !android.util.Patterns.EMAIL_ADDRESS.matcher(email.value!!).matches()) return false
        if (phone.value.isNullOrBlank() || phone.value!!.length < 7) return false
        if (firstName.value.isNullOrBlank()) return false
        if (lastName.value.isNullOrBlank()) return false
        if (address.value.isNullOrBlank()) return false
        if (city.value.isNullOrBlank()) return false
        return true
    }

    fun validateInvoicing(): Boolean {
        if (requiresInvoice.value == true) {
            if (idNumber.value.isNullOrBlank()) return false
            if (businessName.value.isNullOrBlank()) return false
        }
        return true
    }

    fun submitOrder() {
        viewModelScope.launch {
            _isLoading.value = true
            _errorMessage.value = null

            val dateStr = SimpleDateFormat("dd/MM/yyyy HH:mm", Locale.getDefault()).format(Date())
            val order = Order(
                id = "", // Generated in backend mock
                date = dateStr,
                customerName = "${firstName.value} ${lastName.value}",
                customerEmail = email.value ?: "",
                customerPhone = phone.value ?: "",
                address = address.value ?: "",
                city = city.value ?: "",
                department = department.value ?: "Bogotá D.C.",
                items = _cartItems.value ?: emptyList(),
                subtotal = subtotal.value ?: 0.0,
                taxes = taxes.value ?: 0.0,
                total = total.value ?: 0.0,
                status = "Pagado",
                requiresInvoice = requiresInvoice.value ?: false,
                idType = idType.value,
                idNumber = idNumber.value,
                businessName = businessName.value,
                paymentMethod = paymentMethod
            )

            authRepository.placeOrder(order)
                .onSuccess { orderId ->
                    _orderPlaced.value = orderId
                    cartRepository.clearCart() // Order completed, empty local cart
                }
                .onFailure { error ->
                    _errorMessage.value = error.localizedMessage ?: "Error al procesar el pago"
                }

            _isLoading.value = false
        }
    }
}

class CheckoutViewModelFactory(
    private val authRepository: AuthRepository,
    private val cartRepository: CartRepository
) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(CheckoutViewModel::class.java)) {
            return CheckoutViewModel(authRepository, cartRepository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
