package com.marketify.app.ui.auth

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.marketify.app.data.model.User
import com.marketify.app.data.repository.AuthRepository
import kotlinx.coroutines.launch

class AuthViewModel(private val authRepository: AuthRepository) : ViewModel() {

    private val _currentUser = MutableLiveData<User?>()
    val currentUser: LiveData<User?> get() = _currentUser

    private val _isLoading = MutableLiveData<Boolean>()
    val isLoading: LiveData<Boolean> get() = _isLoading

    private val _errorMessage = MutableLiveData<String?>()
    val errorMessage: LiveData<String?> get() = _errorMessage

    val emailInput = MutableLiveData("")
    val passwordInput = MutableLiveData("")

    init {
        checkUserSession()
    }

    fun checkUserSession() {
        _currentUser.value = authRepository.getCurrentUser()
    }

    fun login() {
        val email = emailInput.value?.trim() ?: ""
        val password = passwordInput.value ?: ""

        if (email.isBlank() || password.isBlank()) {
            _errorMessage.value = "Por favor complete todos los campos"
            return
        }

        viewModelScope.launch {
            _isLoading.value = true
            _errorMessage.value = null

            authRepository.login(email, password)
                .onSuccess { user ->
                    _currentUser.value = user
                }
                .onFailure { error ->
                    _errorMessage.value = error.localizedMessage ?: "Credenciales inválidas"
                }

            _isLoading.value = false
        }
    }

    fun logout() {
        authRepository.logout()
        _currentUser.value = null
    }
}

class AuthViewModelFactory(private val authRepository: AuthRepository) : ViewModelProvider.Factory {
    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        if (modelClass.isAssignableFrom(AuthViewModel::class.java)) {
            return AuthViewModel(authRepository) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
