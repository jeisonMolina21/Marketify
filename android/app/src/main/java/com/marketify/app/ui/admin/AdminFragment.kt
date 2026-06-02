package com.marketify.app.ui.admin

import android.app.AlertDialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.EditText
import android.widget.LinearLayout
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.recyclerview.widget.LinearLayoutManager
import com.marketify.app.MarketifyApplication
import com.marketify.app.databinding.FragmentAdminBinding

class AdminFragment : Fragment() {

    private var _binding: FragmentAdminBinding? = null
    private val binding get() = _binding!!

    private val viewModel: AdminViewModel by viewModels {
        val app = requireActivity().application as MarketifyApplication
        AdminViewModelFactory(app.container.productRepository)
    }

    private lateinit var adapter: AdminProductAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentAdminBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerView()
        setupDashboardMetrics()
        setupListeners()
        observeViewModel()
    }

    private fun setupRecyclerView() {
        adapter = AdminProductAdapter(
            onDeleteClicked = { product ->
                // Confirm delete dialog
                AlertDialog.Builder(context)
                    .setTitle("Eliminar Producto")
                    .setMessage("¿Está seguro de que desea eliminar ${product.name} de la tienda?")
                    .setPositiveButton("Eliminar") { _, _ ->
                        viewModel.deleteProduct(product.id)
                        Toast.makeText(context, "Producto eliminado", Toast.LENGTH_SHORT).show()
                    }
                    .setNegativeButton("Cancelar", null)
                    .show()
            }
        )
        binding.rvAdminProducts.layoutManager = LinearLayoutManager(context)
        binding.rvAdminProducts.adapter = adapter
    }

    private fun setupDashboardMetrics() {
        // Load Static metrics from ViewModel
        binding.tvStatSales.text = viewModel.salesValue
        binding.tvStatOrders.text = viewModel.ordersCount
        binding.tvStatClients.text = viewModel.clientsCount
        binding.tvStatDian.text = viewModel.dianInvoicesCount
    }

    private fun setupListeners() {
        binding.btnNewProduct.setOnClickListener {
            showCreateProductDialog()
        }
    }

    private fun showCreateProductDialog() {
        val context = requireContext()
        val builder = AlertDialog.Builder(context)
        builder.setTitle("Nuevo Producto")

        // Programmatically build form views styled nicely
        val layout = LinearLayout(context).apply {
            orientation = LinearLayout.VERTICAL
            setPadding(50, 40, 50, 10)
        }

        val etName = EditText(context).apply {
            hint = "Nombre del producto"
            inputType = android.text.InputType.TYPE_CLASS_TEXT
        }
        val etCategory = EditText(context).apply {
            hint = "Categoría (ej: Accesorios, Tecnología)"
            inputType = android.text.InputType.TYPE_CLASS_TEXT
        }
        val etPrice = EditText(context).apply {
            hint = "Precio (ej: 850000)"
            inputType = android.text.InputType.TYPE_CLASS_NUMBER or android.text.InputType.TYPE_NUMBER_FLAG_DECIMAL
        }
        val etStock = EditText(context).apply {
            hint = "Unidades en Stock"
            inputType = android.text.InputType.TYPE_CLASS_NUMBER
        }

        layout.addView(etName)
        layout.addView(etCategory)
        layout.addView(etPrice)
        layout.addView(etStock)
        builder.setView(layout)

        builder.setPositiveButton("Crear") { _, _ ->
            val name = etName.text.toString().trim()
            val category = etCategory.text.toString().trim()
            val priceStr = etPrice.text.toString().trim()
            val stockStr = etStock.text.toString().trim()

            if (name.isEmpty() || category.isEmpty() || priceStr.isEmpty() || stockStr.isEmpty()) {
                Toast.makeText(context, "Todos los campos son obligatorios", Toast.LENGTH_SHORT).show()
            } else {
                val price = priceStr.toDoubleOrNull() ?: 0.0
                val stock = stockStr.toIntOrNull() ?: 0
                viewModel.createProduct(name, category, price, stock)
                Toast.makeText(context, "Producto creado correctamente", Toast.LENGTH_SHORT).show()
            }
        }
        builder.setNegativeButton("Cancelar", null)
        builder.show()
    }

    private fun observeViewModel() {
        viewModel.products.observe(viewLifecycleOwner) { list ->
            adapter.submitList(list)
        }

        viewModel.isLoading.observe(viewLifecycleOwner) { loading ->
            binding.progressAdmin.visibility = if (loading) View.VISIBLE else View.GONE
        }

        viewModel.errorMessage.observe(viewLifecycleOwner) { error ->
            error?.let {
                Toast.makeText(context, it, Toast.LENGTH_LONG).show()
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
