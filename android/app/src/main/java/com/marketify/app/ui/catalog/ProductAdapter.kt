package com.marketify.app.ui.catalog

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.core.content.ContextCompat
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.marketify.app.data.model.Product
import com.marketify.app.databinding.ItemProductBinding
import java.text.NumberFormat
import java.util.Locale

class ProductAdapter(
    private val onProductClick: (Product) -> Unit,
    private val onQuickAddClick: (Product) -> Unit
) : ListAdapter<Product, ProductAdapter.ProductViewHolder>(ProductDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductViewHolder {
        val binding = ItemProductBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return ProductViewHolder(binding)
    }

    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    inner class ProductViewHolder(private val binding: ItemProductBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(product: Product) {
            binding.tvProductName.text = product.name
            binding.tvProductCategory.text = product.category
            binding.tvReviewsCount.text = "(${product.reviews})"
            
            // Format to COP Currency: $1.250.000
            val colombianLocale = Locale("es", "CO")
            val currencyFormatter = NumberFormat.getCurrencyInstance(colombianLocale).apply {
                maximumFractionDigits = 0
            }
            binding.tvProductPrice.text = currencyFormatter.format(product.price)
            
            binding.tvProductStock.text = if (product.stock > 0) "En Stock" else "Sin Stock"
            binding.tvProductStock.setBackgroundColor(
                if (product.stock > 0) 
                    ContextCompat.getColor(binding.root.context, com.marketify.app.R.color.marketify_green_light)
                else 
                    ContextCompat.getColor(binding.root.context, com.marketify.app.R.color.red_50)
            )
            binding.tvProductStock.setTextColor(
                if (product.stock > 0) 
                    ContextCompat.getColor(binding.root.context, com.marketify.app.R.color.marketify_green)
                else 
                    ContextCompat.getColor(binding.root.context, com.marketify.app.R.color.red_500)
            )

            // Glide Image Loading with placeholder
            Glide.with(binding.root.context)
                .load(product.image)
                .centerCrop()
                .placeholder(com.marketify.app.R.drawable.ic_catalog)
                .into(binding.ivProductImage)

            // Listeners
            binding.root.setOnClickListener { onProductClick(product) }
            binding.btnQuickAdd.setOnClickListener { onQuickAddClick(product) }
        }
    }

    class ProductDiffCallback : DiffUtil.ItemCallback<Product>() {
        override fun areItemsTheSame(oldItem: Product, newItem: Product): Boolean {
            return oldItem.id == newItem.id
        }

        override fun areContentsTheSame(oldItem: Product, newItem: Product): Boolean {
            return oldItem == newItem
        }
    }
}
