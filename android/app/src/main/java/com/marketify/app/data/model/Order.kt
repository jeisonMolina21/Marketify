package com.marketify.app.data.model

import java.io.Serializable

data class Order(
    val id: String,
    val date: String,
    val customerName: String,
    val customerEmail: String,
    val customerPhone: String,
    val address: String,
    val city: String,
    val department: String,
    val items: List<CartItem>,
    val subtotal: Double,
    val taxes: Double, // 19% IVA Colombia
    val total: Double,
    val status: String = "Pendiente",
    // DIAN Invoicing
    val requiresInvoice: Boolean = false,
    val idType: String? = null, // NIT, CC, CE
    val idNumber: String? = null,
    val businessName: String? = null,
    val paymentMethod: String
) : Serializable
