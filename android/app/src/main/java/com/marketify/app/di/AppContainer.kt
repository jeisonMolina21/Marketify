package com.marketify.app.di

import android.content.Context
import com.marketify.app.data.api.ApiService
import com.marketify.app.data.api.MockInterceptor
import com.marketify.app.data.local.AppDatabase
import com.marketify.app.data.local.SessionManager
import com.marketify.app.data.repository.AuthRepository
import com.marketify.app.data.repository.CartRepository
import com.marketify.app.data.repository.ProductRepository
import okhttp3.OkHttpClient
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

class AppContainer(private val context: Context) {
    
    val sessionManager: SessionManager by lazy {
        SessionManager(context)
    }

    private val database: AppDatabase by lazy {
        AppDatabase.getDatabase(context)
    }

    private val okHttpClient: OkHttpClient by lazy {
        OkHttpClient.Builder()
            .addInterceptor(MockInterceptor()) // Instantly active simulated API responses
            .build()
    }

    private val retrofit: Retrofit by lazy {
        Retrofit.Builder()
            .baseUrl("https://api.marketify.com.co/v1/") // Placed Base URL, mock handles it natively
            .client(okHttpClient)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    private val apiService: ApiService by lazy {
        retrofit.create(ApiService::class.java)
    }

    val productRepository: ProductRepository by lazy {
        ProductRepository(apiService)
    }

    val cartRepository: CartRepository by lazy {
        CartRepository(database.cartDao())
    }

    val authRepository: AuthRepository by lazy {
        AuthRepository(apiService, sessionManager)
    }
}
