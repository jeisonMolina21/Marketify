package com.marketify.app.data.repository

import com.marketify.app.data.api.ApiService
import com.marketify.app.data.api.LoginRequest
import com.marketify.app.data.local.SessionManager
import com.marketify.app.data.model.Order
import com.marketify.app.data.model.User

class AuthRepository(
    private val apiService: ApiService,
    private val sessionManager: SessionManager
) {
    suspend fun login(email: String, securityCode: String): Result<User> {
        return try {
            val response = apiService.login(LoginRequest(email, securityCode))
            if (email == "demo@marketify.com" && securityCode == "admin123") {
                sessionManager.saveSession(response)
                Result.success(response)
            } else {
                Result.failure(Exception("Credenciales inválidas"))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    fun logout() {
        sessionManager.clearSession()
    }

    fun getCurrentUser(): User? {
        return sessionManager.getUser()
    }

    fun isLoggedIn(): Boolean {
        return sessionManager.isLoggedIn()
    }

    suspend fun placeOrder(order: Order): Result<String> {
        return try {
            val response = apiService.placeOrder(order)
            if (response.success) {
                Result.success(response.orderId)
            } else {
                Result.failure(Exception(response.message))
            }
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
