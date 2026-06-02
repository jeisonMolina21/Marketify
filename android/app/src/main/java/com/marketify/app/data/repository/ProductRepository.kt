package com.marketify.app.data.repository

import com.marketify.app.data.api.ApiService
import com.marketify.app.data.model.Product

class ProductRepository(private val apiService: ApiService) {
    suspend fun getProducts(category: String? = null, search: String? = null): Result<List<Product>> {
        return try {
            val response = apiService.getProducts(category, search)
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun getProductById(id: String): Result<Product> {
        return try {
            val response = apiService.getProductById(id)
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun createProduct(product: Product): Result<Product> {
        return try {
            val response = apiService.createProduct(product)
            Result.success(response)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }

    suspend fun deleteProduct(id: String): Result<Boolean> {
        return try {
            val response = apiService.deleteProduct(id)
            Result.success(response.success)
        } catch (e: Exception) {
            Result.failure(e)
        }
    }
}
