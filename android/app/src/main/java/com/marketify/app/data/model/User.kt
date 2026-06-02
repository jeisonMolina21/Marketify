package com.marketify.app.data.model

import java.io.Serializable

data class User(
    val email: String,
    val token: String,
    val name: String = "Admin Demo",
    val role: String = "Comerciante"
) : Serializable
