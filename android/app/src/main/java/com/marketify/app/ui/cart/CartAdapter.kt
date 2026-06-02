package com.marketify.app.ui.cart

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.marketify.app.R
import com.marketify.app.data.model.CartItem
import com.marketify.app.databinding.ItemCartBinding
import java.text.NumberFormat
import java.util.Locale

class CartAdapter(
    private val onQuantityChanged: (CartItem, Int) -> Unit,
    private val onRemoveClicked: (CartItem) -> Unit
) : ListAdapter<CartItem, CartAdapter.CartViewHolder>(CartDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): CartViewHolder {
        val binding = ItemCartBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return CartViewHolder(binding)
    }

    override fun onBindViewHolder(holder: CartViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    inner class CartViewHolder(private val binding: ItemCartBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(item: CartItem) {
            binding.tvCartItemName.text = item.name
            
            // Build variant text dynamically: Negro / Talla: S
            val color = item.selectedColor ?: "Por defecto"
            val size = item.selectedSize ?: "Única"
            binding.tvCartItemVariant.text = "Color: $color / Talla: $size"

            // Format price in COP
            val colombianLocale = Locale("es", "CO")
            val currencyFormatter = NumberFormat.getCurrencyInstance(colombianLocale).apply {
                maximumFractionDigits = 0
            }
            binding.tvCartItemPrice.text = currencyFormatter.format(item.totalPrice)
            binding.tvCartItemQty.text = item.quantity.toString()

            // Image Glide loading
            Glide.with(binding.root.context)
                .load(item.image)
                .centerCrop()
                .placeholder(R.drawable.ic_catalog)
                .into(binding.ivCartItemImage)

            // Listeners
            binding.btnPlus.setOnClickListener {
                onQuantityChanged(item, item.quantity + 1)
            }
            binding.btnMinus.setOnClickListener {
                onQuantityChanged(item, item.quantity - 1)
            }
            binding.btnRemoveCartItem.setOnClickListener {
                onRemoveClicked(item)
            }
        }
    }

    class CartDiffCallback : DiffUtil.ItemCallback<CartItem>() {
        override fun areItemsTheSame(oldItem: CartItem, newItem: CartItem): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: CartItem, newItem: CartItem): Boolean {
            return oldItem == newItem
        }
    }
}
