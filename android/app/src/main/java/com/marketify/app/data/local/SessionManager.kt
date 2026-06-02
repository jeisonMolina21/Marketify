package com.marketify.app.data.local

import android.content.Context
import android.content.SharedPreferences
import com.marketify.app.data.model.User

class SessionManager(context: Context) {
    private val prefs: SharedPreferences = context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE)

    companion object {
        private const val PREF_NAME = "marketify_user_session"
        private const val KEY_IS_LOGGED_IN = "is_logged_in"
        private const val KEY_USER_EMAIL = "user_email"
        private const val KEY_USER_NAME = "user_name"
        private const val KEY_USER_TOKEN = "user_token"
        private const val KEY_USER_ROLE = "user_role"
    }

    fun saveSession(user: User) {
        prefs.edit().apply {
            putBoolean(KEY_IS_LOGGED_IN, true)
            putString(KEY_USER_EMAIL, user.email)
            putString(KEY_USER_NAME, user.name)
            putString(KEY_USER_TOKEN, user.token)
            putString(KEY_USER_ROLE, user.role)
            apply()
        }
    }

    fun isLoggedIn(): Boolean {
        return prefs.getBoolean(KEY_IS_LOGGED_IN, false)
    }

    fun getUser(): User? {
        val email = prefs.getString(KEY_USER_EMAIL, null) ?: return null
        val name = prefs.getString(KEY_USER_NAME, "Admin") ?: "Admin"
        val token = prefs.getString(KEY_USER_TOKEN, "") ?: ""
        val role = prefs.getString(KEY_USER_ROLE, "Comerciante") ?: "Comerciante"
        return User(email, token, name, role)
    }

    fun clearSession() {
        prefs.edit().clear().apply()
    }
}
