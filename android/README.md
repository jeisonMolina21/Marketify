# Marketify Native Android Application (Kotlin & XML)

Este es el proyecto nativo para Android de la plataforma **Marketify**, migrado con éxito desde la versión original de maquetación en React + Astro a una arquitectura robusta y premium en **Kotlin** y **layouts XML** con Material Design.

---

## 📐 Equivalencias de Arquitectura (React vs Android Nativo)

Para facilitar la adopción y el entendimiento de los desarrolladores web de React al ecosistema nativo de Android, a continuación se detallan las equivalencias de patrones, hooks y componentes implementados en este proyecto:

### 1. Manejo de Estado Local (`useState` ➡️ `ViewModel` + `LiveData`)
* **En React (Web)**: Se utiliza `const [products, setProducts] = useState([])` para manejar variables dinámicas reactivas dentro del ciclo del componente.
* **En Android Nativo**: Se implementa **LiveData** o **StateFlow** encapsulado en un **ViewModel**. El fragmento observa el LiveData (`viewModel.products.observe(viewLifecycleOwner) { list -> ... }`) y actualiza las vistas en consecuencia. El ViewModel persiste su estado frente a rotaciones de pantalla u otros cambios de configuración del ciclo de vida.

### 2. Ciclo de Vida y Efectos (`useEffect` ➡️ Coroutine scopes + Fragment Lifecycles)
* **En React (Web)**: Se emplea `useEffect(() => { loadProducts() }, [category])` para reaccionar al montaje del componente o a cambios en sus variables de entrada.
* **En Android Nativo**: Se utiliza el bloque de inicialización `init { loadProducts() }` del `ViewModel` o llamadas explícitas dentro del callback del fragmento `onViewCreated()`. Los procesos asíncronos de red o base de datos se lanzan de forma segura utilizando corrutinas de Kotlin dentro del ámbito del ViewModel (`viewModelScope.launch { ... }`), garantizando la no-bloqueo del hilo de UI y cancelándose automáticamente si el ViewModel se destruye.

### 3. Estado Global y Persistencia (`Zustand` ➡️ **Room Database** + SharedPreferences)
* **En React (Web)**: El carrito de compras se maneja de forma centralizada con `useCartStore` de la librería Zustand, persistiendo el estado en `localStorage` con un middleware.
* **En Android Nativo**: Implementamos el **Patrón de Repositorio** (`CartRepository`) que se conecta a una base de datos local SQLite mediante **Room** (`AppDatabase` & `CartDao`). Al retornar `LiveData<List<CartItem>>`, cualquier cambio en la base de datos (por ejemplo, al añadir un producto) refresca de manera reactiva la UI del carrito y recalcula los subtotales/impuestos al instante en toda la aplicación. La persistencia de la sesión del comerciante se realiza en `SharedPreferences` a través de un `SessionManager`.

### 4. Componentes y Listas (`map()` ➡️ **RecyclerView** + `ListAdapter`)
* **En React (Web)**: Las cuadrículas y filas se renderizan dinámicamente mapeando arrays: `{products.map(p => <ProductCard product={p} />)}`.
* **En Android Nativo**: Se utiliza un **RecyclerView** configurado con un **ListAdapter** personalizado y un **ViewHolder** (`ProductAdapter` e `ItemProductBinding`). A través del sistema `DiffUtil`, Android calcula las diferencias mínimas entre listas para animar adiciones, borrados o cambios de precios con el máximo rendimiento de hardware.

### 5. Navegación y Rutas (`React Router` ➡️ **Navigation Component**)
* **En React (Web)**: Enlaces HTML (`<a href="/catalog">`) o redirecciones programáticas.
* **En Android Nativo**: Un grafo de navegación centralizado en XML (`nav_graph.xml`) gestionado por el `NavController`. Permite transiciones fluidas de entrada/salida y el paso de argumentos tipados y seguros (SafeArgs) entre fragmentos.

---

## 🛠️ Instrucciones de Compilación y Ejecución

La aplicación está lista para ser compilada y ejecutada en cualquier dispositivo móvil o emulador.

### Requisitos Previos:
1. **Android Studio**: Versión Ladybug (o posterior) instalada.
2. **JDK**: Java Development Kit 17 (configurado automáticamente por Android Studio).
3. **SDK Mínimo**: API 23 (Android 6.0 Marshmallow).
4. **SDK de Destino**: API 34 (Android 14).

### Pasos para Compilar y Ejecutar en Android Studio:
1. Abra **Android Studio**.
2. Seleccione **File > Open** (Abrir) y busque la carpeta del proyecto en `f:\marketify\marketify-android`.
3. Espere a que el sistema de construcción de Gradle descargue las dependencias requeridas (Moshi/Gson, Retrofit, Glide, Room y las librerías de Material Components).
4. Conecte un dispositivo Android físico con la "Depuración USB" activa o inicie un dispositivo virtual (Emulador) desde el Device Manager.
5. Haga clic en el botón verde **Run App** (Ejecutar) en la barra superior o presione `Shift + F10`.

### Compilación por Línea de Comandos:
Si prefiere compilar la aplicación utilizando la terminal:
* **Para compilar el APK de desarrollo (Debug)**:
  ```bash
  cd marketify-android
  ./gradlew assembleDebug
  ```
  El archivo `.apk` compilado se generará en la ruta:
  `app/build/outputs/apk/debug/app-debug.apk`.

* **Para limpiar los archivos de compilación antiguos**:
  ```bash
  ./gradlew clean
  ```

---

## 🌐 Consumo de la API y Simulación Autónoma (Offline Mode)

La aplicación implementa un cliente **Retrofit** configurado con un **MockInterceptor** de OkHttp:
* **¿Cómo funciona?**: Intercepta automáticamente las peticiones locales a la API (como `GET products`, `POST orders`, `POST auth/login`) y les responde inmediatamente con payloads JSON exactos del catálogo de productos premium, lo que permite probar todo el flujo de compras (checkout), login DIAN y el CRUD del administrador comerciante sin depender de un servidor externo de desarrollo activo.
* **Integración de Backend Real**: Para conectar la aplicación a un backend REST real en producción, simplemente retire o comente el `.addInterceptor(MockInterceptor())` dentro del `AppContainer.kt` y actualice la dirección `baseUrl` de Retrofit con el dominio de su servidor en la nube.
