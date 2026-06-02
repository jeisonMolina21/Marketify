package com.marketify.app.ui.admin

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.marketify.app.R
import com.marketify.app.data.model.Product
import com.marketify.app.databinding.ItemAdminProductBinding
import java.text.NumberFormat
import java.util.Locale

class AdminProductAdapter(
    private val onDeleteClicked: (Product) -> Unit
) : ListAdapter<Product, AdminProductAdapter.AdminProductViewHolder>(ProductDiffCallback()) {

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): AdminProductViewHolder {
        val binding = ItemAdminProductBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return AdminProductViewHolder(binding)
    }

    override fun onBindViewHolder(holder: AdminProductViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    inner class AdminProductViewHolder(private val binding: ItemAdminProductBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(product: Product) {
            binding.tvAdminProdName.text = product.name
            binding.tvAdminProdSKU.text = "SKU: MKF-${product.id}024"
            binding.tvAdminProdStock.text = "${product.stock} unidades"
            
            // Status badge
            binding.tvAdminProdStatus.text = product.status
            binding.tvAdminProdStatus.setBackgroundColor(
                if (product.status == "Activo") 
                    binding.root.context.getColor(R.color.marketify_green_light)
                else 
                    binding.root.context.getColor(R.color.red_50)
            )
            binding.tvAdminProdStatus.setTextColor(
                if (product.status == "Activo") 
                    binding.root.context.getColor(R.color.marketify_green)
                else 
                    binding.root.context.getColor(R.color.red_500)
            )

            // Format to COP Currency
            val colombianLocale = Locale("es", "CO")
            val currencyFormatter = NumberFormat.getCurrencyInstance(colombianLocale).apply {
                maximumFractionDigits = 0
            }
            binding.tvAdminProdPrice.text = currencyFormatter.format(product.price)

            // Glide Loading thumbnail
            Glide.with(binding.root.context)
                .load(product.image)
                .centerCrop()
                .placeholder(R.drawable.ic_catalog)
                .into(binding.ivAdminProdImage)

            // Delete click listener
            binding.btnAdminDelete.setOnClickListener {
                onDeleteClicked(product)
            }
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
