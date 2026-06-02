package com.marketify.app.data.api

import okhttp3.Interceptor
import okhttp3.MediaType.Companion.toMediaTypeOrNull
import okhttp3.Protocol
import okhttp3.Response
import okhttp3.ResponseBody.Companion.toResponseBody
import java.net.URLDecoder

class MockInterceptor : Interceptor {
    override fun intercept(chain: Interceptor.Chain): Response {
        val uri = chain.request().url
        val path = uri.encodedPath
        val method = chain.request().method
        
        var responseString = ""
        var code = 200

        if (path.endsWith("products") && method == "GET") {
            val category = uri.queryParameter("category")
            val search = uri.queryParameter("search")
            
            val allProducts = listOf(
                """{"id":"1","name":"Reloj Chronos Luxury Edition","price":1250000.0,"image":"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop","category":"Accesorios","rating":5,"reviews":124,"description":"Diseño vanguardista con materiales de la más alta calidad. Este producto representa la cumbre de la ingeniería moderna y el estilo sofisticado.","stock":45,"status":"Activo"}""",
                """{"id":"2","name":"Audífonos Sonic Max Wireless","price":850000.0,"image":"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop","category":"Tecnología","rating":4,"reviews":89,"description":"Cancelación activa de ruido, batería de 40 horas y sonido de alta fidelidad para audiófilos exigentes.","stock":12,"status":"Activo"}""",
                """{"id":"3","name":"Gafas de Sol Polaris Black","price":450000.0,"image":"https://images.unsplash.com/photo-1511499767390-a7335958beba?q=80&w=2000&auto=format&fit=crop","category":"Moda","rating":5,"reviews":45,"description":"Protección UV400, montura de titanio ultra liviana y lentes polarizados premium para una claridad óptica total.","stock":0,"status":"Sin Stock"}""",
                """{"id":"4","name":"Mochila Urbana Tech Pro","price":320000.0,"image":"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2000&auto=format&fit=crop","category":"Estilo de Vida","rating":4,"reviews":67,"description":"Compartimiento impermeable para laptop, puertos de carga USB integrados y diseño ergonómico anti-fatiga.","stock":89,"status":"Activo"}""",
                """{"id":"5","name":"Smartwatch V-Pro Series","price":650000.0,"image":"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop","category":"Tecnología","rating":5,"reviews":12,"description":"Monitoreo de salud 24/7, GPS integrado, pantalla AMOLED de alta resolución y resistencia al agua 5ATM.","stock":8,"status":"Activo"}""",
                """{"id":"6","name":"Zapatos Craft Leather","price":280000.0,"image":"https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=2000&auto=format&fit=crop","category":"Moda","rating":4,"reviews":56,"description":"Cuero natural de grano entero cosido a mano, plantilla de espuma con memoria y máxima elegancia para ocasiones especiales.","stock":15,"status":"Activo"}"""
            )
            
            var filtered = allProducts
            if (category != null && category.isNotEmpty()) {
                filtered = filtered.filter { it.contains(""""category":"$category"""") }
            }
            if (search != null && search.isNotEmpty()) {
                val searchLower = URLDecoder.decode(search, "UTF-8").lowercase()
                filtered = filtered.filter { it.lowercase().contains(searchLower) }
            }
            
            responseString = "[${filtered.joinToString(",")}]"
            
        } else if (path.contains("products/") && method == "GET") {
            val id = path.substringAfterLast("/")
            responseString = when (id) {
                "1" -> """{"id":"1","name":"Reloj Chronos Luxury Edition","price":1250000.0,"image":"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop","category":"Accesorios","rating":5,"reviews":124,"description":"Diseño vanguardista con materiales de la más alta calidad. Este producto representa la cumbre de la ingeniería moderna y el estilo sofisticado.","stock":45,"status":"Activo"}"""
                "2" -> """{"id":"2","name":"Audífonos Sonic Max Wireless","price":850000.0,"image":"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2000&auto=format&fit=crop","category":"Tecnología","rating":4,"reviews":89,"description":"Cancelación activa de ruido, batería de 40 horas y sonido de alta fidelidad para audiófilos exigentes.","stock":12,"status":"Activo"}"""
                "3" -> """{"id":"3","name":"Gafas de Sol Polaris Black","price":450000.0,"image":"https://images.unsplash.com/photo-1511499767390-a7335958beba?q=80&w=2000&auto=format&fit=crop","category":"Moda","rating":5,"reviews":45,"description":"Protección UV400, montura de titanio ultra liviana y lentes polarizados premium para una claridad óptica total.","stock":0,"status":"Sin Stock"}"""
                "4" -> """{"id":"4","name":"Mochila Urbana Tech Pro","price":320000.0,"image":"https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=2000&auto=format&fit=crop","category":"Estilo de Vida","rating":4,"reviews":67,"description":"Compartimiento impermeable para laptop, puertos de carga USB integrados y diseño ergonómico anti-fatiga.","stock":89,"status":"Activo"}"""
                else -> """{"id":"$id","name":"Producto Premium Custom","price":500000.0,"image":"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop","category":"General","rating":5,"reviews":10,"description":"Excelente artículo de colección limitada con envíos garantizados a todo el país.","stock":5,"status":"Activo"}"""
            }
            
        } else if (path.endsWith("auth/login") && method == "POST") {
            responseString = """{"email":"demo@marketify.com","token":"jwt-token-marketify-admin-2026","name":"Admin Demo","role":"Comerciante"}"""
            
        } else if (path.endsWith("orders") && method == "POST") {
            responseString = """{"success":true,"message":"Pedido fiscal DIAN procesado correctamente.","orderId":"ORD-${(1000..9999).random()}"}"""
            
        } else if (path.endsWith("products") && method == "POST") {
            responseString = """{"id":"${(7..100).random()}","name":"Producto Creado","price":200000.0,"image":"https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=2000&auto=format&fit=crop","category":"General","rating":5,"reviews":0,"description":"Nuevo producto agregado por el administrador.","stock":10,"status":"Activo"}"""
            
        } else if (path.contains("products/") && method == "DELETE") {
            responseString = """{"success":true,"message":"Producto eliminado del inventario correctamente."}"""
            
        } else {
            code = 404
            responseString = """{"error":"Ruta mock no encontrada"}"""
        }

        return Response.Builder()
            .code(code)
            .message("OK")
            .protocol(Protocol.HTTP_1_1)
            .request(chain.request())
            .body(responseString.toResponseBody("application/json".toMediaTypeOrNull()))
            .addHeader("content-type", "application/json")
            .build()
    }
}
