package com.marketify.app.ui.cart

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import androidx.recyclerview.widget.LinearLayoutManager
import com.marketify.app.MarketifyApplication
import com.marketify.app.R
import com.marketify.app.databinding.FragmentCartBinding
import java.text.NumberFormat
import java.util.Locale

class CartFragment : Fragment() {

    private var _binding: FragmentCartBinding? = null
    private val binding get() = _binding!!

    private val viewModel: CartViewModel by viewModels {
        val app = requireActivity().application as MarketifyApplication
        CartViewModelFactory(app.container.cartRepository)
    }

    private lateinit var adapter: CartAdapter

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCartBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerView()
        observeViewModel()

        binding.btnProceedCheckout.setOnClickListener {
            val items = viewModel.cartItems.value
            if (items.isNullOrEmpty()) {
                Toast.makeText(context, "El carrito está vacío", Toast.LENGTH_SHORT).show()
            } else {
                findNavController().navigate(R.id.action_cart_to_checkout)
            }
        }
    }

    private fun setupRecyclerView() {
        adapter = CartAdapter(
            onQuantityChanged = { item, newQty ->
                viewModel.updateQuantity(item.id, newQty)
            },
            onRemoveClicked = { item ->
                viewModel.removeItem(item.id)
                Toast.makeText(context, "${item.name} eliminado", Toast.LENGTH_SHORT).show()
            }
        )
        binding.rvCartItems.layoutManager = LinearLayoutManager(context)
        binding.rvCartItems.adapter = adapter
    }

    private fun observeViewModel() {
        // Format to COP Currency: $1.250.000
        val colombianLocale = Locale("es", "CO")
        val currencyFormatter = NumberFormat.getCurrencyInstance(colombianLocale).apply {
            maximumFractionDigits = 0
        }

        viewModel.cartItems.observe(viewLifecycleOwner) { list ->
            adapter.submitList(list)
            
            if (list.isNullOrEmpty()) {
                binding.layoutEmptyCart.visibility = View.VISIBLE
                binding.rvCartItems.visibility = View.GONE
                binding.btnProceedCheckout.isEnabled = false
                binding.btnProceedCheckout.alpha = 0.5f
            } else {
                binding.layoutEmptyCart.visibility = View.GONE
                binding.rvCartItems.visibility = View.VISIBLE
                binding.btnProceedCheckout.isEnabled = true
                binding.btnProceedCheckout.alpha = 1.0f
            }
        }

        viewModel.subtotal.observe(viewLifecycleOwner) { sub ->
            binding.tvSubtotalVal.text = currencyFormatter.format(sub)
        }

        viewModel.taxes.observe(viewLifecycleOwner) { tax ->
            binding.tvTaxesVal.text = currencyFormatter.format(tax)
        }

        viewModel.total.observe(viewLifecycleOwner) { total ->
            binding.tvTotalVal.text = currencyFormatter.format(total)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
