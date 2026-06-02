package com.marketify.app.ui.catalog

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.view.inputmethod.EditorInfo
import android.widget.Button
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.core.widget.doAfterTextChanged
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.GridLayoutManager
import com.marketify.app.MarketifyApplication
import com.marketify.app.R
import com.marketify.app.databinding.FragmentCatalogBinding

class CatalogFragment : Fragment() {

    private var _binding: FragmentCatalogBinding? = null
    private val binding get() = _binding!!

    private val viewModel: CatalogViewModel by viewModels {
        val app = requireActivity().application as MarketifyApplication
        CatalogViewModelFactory(app.container.productRepository, app.container.cartRepository)
    }

    private lateinit var adapter: ProductAdapter
    private var selectedCategoryButton: Button? = null

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCatalogBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerView()
        setupCategoryFilters()
        setupSearch()
        observeViewModel()
    }

    private fun setupRecyclerView() {
        adapter = ProductAdapter(
            onProductClick = { product ->
                // Navigate to product detail using SafeArgs or Bundle
                val bundle = Bundle().apply {
                    putString("productId", product.id)
                }
                findNavController().navigate(R.id.action_catalog_to_detail, bundle)
            },
            onQuickAddClick = { product ->
                viewModel.addToCart(product)
                Toast.makeText(context, "${product.name} añadido al carrito", Toast.LENGTH_SHORT).show()
            }
        )
        binding.rvProducts.layoutManager = GridLayoutManager(context, 2)
        binding.rvProducts.adapter = adapter
    }

    private fun setupCategoryFilters() {
        selectedCategoryButton = binding.btnCatAll // Default active
        
        val categoriesMap = mapOf(
            binding.btnCatAll to null,
            binding.btnCatAccesorios to "Accesorios",
            binding.btnCatTecnologia to "Tecnología",
            binding.btnCatModa to "Moda",
            binding.btnCatEstilo to "Estilo de Vida"
        )

        categoriesMap.forEach { (button, category) ->
            button.setOnClickListener {
                selectCategoryButton(button)
                viewModel.loadProducts(category = category)
            }
        }
    }

    private fun selectCategoryButton(button: Button) {
        val context = context ?: return
        // Reset old button style
        selectedCategoryButton?.let {
            it.setBackgroundColor(ContextCompat.getColor(context, R.color.white))
            it.setTextColor(ContextCompat.getColor(context, R.color.slate_900))
        }

        // Apply new active button style
        button.setBackgroundColor(ContextCompat.getColor(context, R.color.marketify_green))
        button.setTextColor(ContextCompat.getColor(context, R.color.white))
        selectedCategoryButton = button
    }

    private fun setupSearch() {
        binding.etSearch.setOnEditorActionListener { _, actionId, _ ->
            if (actionId == EditorInfo.IME_ACTION_SEARCH) {
                val query = binding.etSearch.text.toString().trim()
                viewModel.loadProducts(search = if (query.isEmpty()) null else query)
                true
            } else {
                false
            }
        }

        // Optional: Instant search filter
        binding.etSearch.doAfterTextChanged { text ->
            val query = text.toString().trim()
            viewModel.loadProducts(search = if (query.isEmpty()) null else query)
        }
    }

    private fun observeViewModel() {
        viewModel.products.observe(viewLifecycleOwner) { list ->
            adapter.submitList(list)
            binding.tvError.visibility = View.GONE
        }

        viewModel.isLoading.observe(viewLifecycleOwner) { loading ->
            binding.progressBar.visibility = if (loading) View.VISIBLE else View.GONE
        }

        viewModel.errorMessage.observe(viewLifecycleOwner) { error ->
            error?.let {
                binding.tvError.text = it
                binding.tvError.visibility = View.VISIBLE
            } ?: run {
                binding.tvError.visibility = View.GONE
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
