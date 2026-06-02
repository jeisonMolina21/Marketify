package com.marketify.app.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey
import java.io.Serializable

@Entity(tableName = "products")
data class Product(
    @PrimaryKey val id: String,
    val name: String,
    val price: Double,
    val image: String,
    val category: String,
    val rating: Int = 5,
    val reviews: Int = 0,
    val description: String = "",
    val stock: Int = 10,
    val status: String = "Activo"
) : Serializable
