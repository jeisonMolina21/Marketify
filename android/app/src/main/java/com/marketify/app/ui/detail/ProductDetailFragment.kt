package com.marketify.app.ui.detail

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.bumptech.glide.Glide
import com.marketify.app.MarketifyApplication
import com.marketify.app.R
import com.marketify.app.databinding.FragmentProductDetailBinding
import java.text.NumberFormat
import java.util.Locale

class ProductDetailFragment : Fragment() {

    private var _binding: FragmentProductDetailBinding? = null
    private val binding get() = _binding!!

    private val viewModel: ProductDetailViewModel by viewModels {
        val app = requireActivity().application as MarketifyApplication
        ProductDetailViewModelFactory(app.container.productRepository, app.container.cartRepository)
    }

    private var productId: String? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        arguments?.let {
            productId = it.getString("productId")
        }
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentProductDetailBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        binding.btnBack.setOnClickListener {
            findNavController().navigateUp()
        }

        setupVariantSelectors()
        observeViewModel()

        productId?.let {
            viewModel.loadProductDetail(it)
        } ?: run {
            Toast.makeText(context, "Producto no encontrado", Toast.LENGTH_SHORT).show()
            findNavController().navigateUp()
        }

        binding.btnAddToCart.setOnClickListener {
            viewModel.addToCart()
            Toast.makeText(context, "Producto añadido al carrito", Toast.LENGTH_SHORT).show()
        }
    }

    private fun setupVariantSelectors() {
        // Simple Color Highlights
        val colorViews = listOf(
            binding.colorCircleBlack to "Negro",
            binding.colorCircleGray to "Gris",
            binding.colorCircleGreen to "Verde"
        )

        colorViews.forEach { (view, colorName) ->
            view.setOnClickListener {
                // Clear other highlights and highlight this
                colorViews.forEach { (v, _) -> v.alpha = 0.5f }
                view.alpha = 1.0f
                viewModel.selectColor(colorName)
                Toast.makeText(context, "Color: $colorName", Toast.LENGTH_SHORT).show()
            }
        }
        
        // Initial selected color
        binding.colorCircleBlack.alpha = 1.0f
        viewModel.selectColor("Negro")

        // Size highlights using ChipGroup
        binding.chipGroupSizes.setOnCheckedStateChangeListener { group, checkedIds ->
            if (checkedIds.isNotEmpty()) {
                val selectedChipText = when (checkedIds.first()) {
                    R.id.chipS -> "S"
                    R.id.chipM -> "M"
                    R.id.chipL -> "L"
                    R.id.chipXL -> "XL"
                    else -> "M"
                }
                viewModel.selectSize(selectedChipText)
            }
        }
        
        // Select S size by default
        binding.chipS.isChecked = true
        viewModel.selectSize("S")
    }

    private fun observeViewModel() {
        viewModel.product.observe(viewLifecycleOwner) { product ->
            binding.tvDetailName.text = product.name
            binding.tvDetailCategory.text = product.category
            binding.tvDetailReviews.text = "4.9 (${product.reviews} reseñas)"
            binding.tvDetailDescription.text = product.description

            // Format to COP Currency: $1.250.000
            val colombianLocale = Locale("es", "CO")
            val currencyFormatter = NumberFormat.getCurrencyInstance(colombianLocale).apply {
                maximumFractionDigits = 0
            }
            binding.tvDetailPrice.text = currencyFormatter.format(product.price)

            // Glide Image Loading with placeholder
            Glide.with(this)
                .load(product.image)
                .centerCrop()
                .placeholder(R.drawable.ic_catalog)
                .into(binding.ivDetailImage)
        }

        viewModel.isLoading.observe(viewLifecycleOwner) { loading ->
            binding.progressDetail.visibility = if (loading) View.VISIBLE else View.GONE
        }

        viewModel.errorMessage.observe(viewLifecycleOwner) { error ->
            error?.let {
                binding.tvDetailError.text = it
                binding.tvDetailError.visibility = View.VISIBLE
            } ?: run {
                binding.tvDetailError.visibility = View.GONE
            }
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
