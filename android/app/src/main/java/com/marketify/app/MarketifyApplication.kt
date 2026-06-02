package com.marketify.app

import android.app.Application
import com.marketify.app.di.AppContainer

class MarketifyApplication : Application() {
    lateinit var container: AppContainer

    override fun onCreate() {
        super.onCreate()
        container = AppContainer(this)
    }
}
