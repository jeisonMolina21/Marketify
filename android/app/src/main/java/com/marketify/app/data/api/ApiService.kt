package com.marketify.app.data.api

import com.marketify.app.data.model.Order
import com.marketify.app.data.model.Product
import com.marketify.app.data.model.User
import retrofit2.http.Body
import retrofit2.http.DELETE
import retrofit2.http.GET
import retrofit2.http.POST
import retrofit2.http.Path
import retrofit2.http.Query

interface ApiService {
    @GET("products")
    suspend fun getProducts(
        @Query("category") category: String? = null,
        @Query("search") search: String? = null
    ): List<Product>

    @GET("products/{id}")
    suspend fun getProductById(
        @Path("id") id: String
    ): Product

    @POST("auth/login")
    suspend fun login(
        @Body loginRequest: LoginRequest
    ): User

    @POST("orders")
    suspend fun placeOrder(
        @Body order: Order
    ): OrderResponse

    @POST("products")
    suspend fun createProduct(
        @Body product: Product
    ): Product

    @DELETE("products/{id}")
    suspend fun deleteProduct(
        @Path("id") id: String
    ): DeleteResponse
}

data class LoginRequest(
    val email: String,
    val securityCode: String
)

data class OrderResponse(
    val success: Boolean,
    val message: String,
    val orderId: String
)

data class DeleteResponse(
    val success: Boolean,
    val message: String
)
