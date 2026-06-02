package com.marketify.app.ui.checkout

import android.app.AlertDialog
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.Toast
import androidx.core.content.ContextCompat
import androidx.core.widget.doAfterTextChanged
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.marketify.app.MarketifyApplication
import com.marketify.app.R
import com.marketify.app.databinding.FragmentCheckoutBinding
import java.text.NumberFormat
import java.util.Locale

class CheckoutFragment : Fragment() {

    private var _binding: FragmentCheckoutBinding? = null
    private val binding get() = _binding!!

    private val viewModel: CheckoutViewModel by viewModels {
        val app = requireActivity().application as MarketifyApplication
        CheckoutViewModelFactory(app.container.authRepository, app.container.cartRepository)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentCheckoutBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupSpinners()
        setupTextBindings()
        setupListeners()
        observeViewModel()
    }

    private fun setupSpinners() {
        // Departments
        val depts = listOf("Bogotá D.C.", "Antioquia", "Valle del Cauca", "Cundinamarca", "Atlántico", "Bolívar", "Santander")
        val deptAdapter = ArrayAdapter(requireContext(), android.R.layout.simple_spinner_dropdown_item, depts)
        binding.spinnerDepartment.adapter = deptAdapter

        // ID Types
        val ids = listOf("CC - Cédula de Ciudadanía", "NIT - Nit Comercial", "CE - Cédula de Extranjería")
        val idAdapter = ArrayAdapter(requireContext(), android.R.layout.simple_spinner_dropdown_item, ids)
        binding.spinnerIdType.adapter = idAdapter
    }

    private fun setupTextBindings() {
        binding.tietEmail.doAfterTextChanged { viewModel.email.value = it?.toString() }
        binding.tietPhone.doAfterTextChanged { viewModel.phone.value = it?.toString() }
        binding.tietFirstName.doAfterTextChanged { viewModel.firstName.value = it?.toString() }
        binding.tietLastName.doAfterTextChanged { viewModel.lastName.value = it?.toString() }
        binding.tietAddress.doAfterTextChanged { viewModel.address.value = it?.toString() }
        binding.tietCity.doAfterTextChanged { viewModel.city.value = it?.toString() }
        
        binding.tietIdNumber.doAfterTextChanged { viewModel.idNumber.value = it?.toString() }
        binding.tietBusinessName.doAfterTextChanged { viewModel.businessName.value = it?.toString() }
    }

    private fun setupListeners() {
        // Electronic invoice checkbox toggle
        binding.cbRequiresInvoice.setOnCheckedChangeListener { _, isChecked ->
            viewModel.requiresInvoice.value = isChecked
            binding.layoutInvoiceFields.visibility = if (isChecked) View.VISIBLE else View.GONE
        }

        // Radio group payment selections
        binding.rgPaymentMethods.setOnCheckedChangeListener { _, checkedId ->
            val method = when (checkedId) {
                R.id.rbCreditCard -> "Tarjeta de Crédito"
                R.id.rbPSE -> "PSE (Débito)"
                R.id.rbEfecty -> "Efecty / Su Red"
                R.id.rbBancolombia -> "Bancolombia"
                else -> "Tarjeta de Crédito"
            }
            viewModel.setPaymentMethod(method)
        }

        // Stepper Navigation clicks
        binding.btnStepNext.setOnClickListener {
            val step = viewModel.currentStep.value ?: 1
            when (step) {
                1 -> {
                    if (viewModel.validateShipping()) {
                        viewModel.setStep(2)
                    } else {
                        Toast.makeText(context, "Por favor complete los campos obligatorios", Toast.LENGTH_SHORT).show()
                    }
                }
                2 -> {
                    viewModel.department.value = binding.spinnerDepartment.selectedItem.toString()
                    if (viewModel.requiresInvoice.value == true) {
                        viewModel.idType.value = binding.spinnerIdType.selectedItem.toString().take(3).trim()
                    }
                    if (viewModel.validateInvoicing()) {
                        viewModel.setStep(3)
                    } else {
                        Toast.makeText(context, "Por favor complete los campos DIAN obligatorios", Toast.LENGTH_SHORT).show()
                    }
                }
                3 -> {
                    viewModel.submitOrder()
                }
            }
        }

        binding.btnStepBack.setOnClickListener {
            val step = viewModel.currentStep.value ?: 1
            viewModel.setStep(step - 1)
        }
    }

    private fun observeViewModel() {
        val colombianLocale = Locale("es", "CO")
        val currencyFormatter = NumberFormat.getCurrencyInstance(colombianLocale).apply {
            maximumFractionDigits = 0
        }

        viewModel.currentStep.observe(viewLifecycleOwner) { step ->
            val context = context ?: return@observe
            // Update Views Visibilities
            binding.layoutStep1Shipping.visibility = if (step == 1) View.VISIBLE else View.GONE
            binding.layoutStep2Billing.visibility = if (step == 2) View.VISIBLE else View.GONE
            binding.layoutStep3Payment.visibility = if (step == 3) View.VISIBLE else View.GONE

            // Back button toggle
            binding.btnStepBack.visibility = if (step == 1) View.GONE else View.VISIBLE

            // Next button text configurations
            binding.btnStepNext.text = when (step) {
                1 -> getString(R.string.btn_continue_billing)
                2 -> getString(R.string.btn_continue_payment)
                3 -> {
                    val totalFormatted = currencyFormatter.format(viewModel.total.value ?: 0.0)
                    "Pagar $totalFormatted"
                }
                else -> getString(R.string.btn_continue_billing)
            }

            // Stepper Circles active/inactive styles
            binding.indicatorStep1.setBackgroundColor(ContextCompat.getColor(context, if (step >= 1) R.color.marketify_green else R.color.slate_200))
            binding.indicatorStep1.setTextColor(ContextCompat.getColor(context, if (step >= 1) R.color.white else R.color.slate_500))

            binding.indicatorStep2.setBackgroundColor(ContextCompat.getColor(context, if (step >= 2) R.color.marketify_green else R.color.slate_200))
            binding.indicatorStep2.setTextColor(ContextCompat.getColor(context, if (step >= 2) R.color.white else R.color.slate_500))

            binding.indicatorStep3.setBackgroundColor(ContextCompat.getColor(context, if (step >= 3) R.color.marketify_green else R.color.slate_200))
            binding.indicatorStep3.setTextColor(ContextCompat.getColor(context, if (step >= 3) R.color.white else R.color.slate_500))
        }

        viewModel.orderPlaced.observe(viewLifecycleOwner) { orderId ->
            orderId?.let {
                // Gorgeous victory success alert dialog
                AlertDialog.Builder(context)
                    .setTitle("🎉 Compra Exitosa")
                    .setMessage("¡Pedido procesado con éxito!\n\nID de Orden: $orderId\n\nFactura electrónica DIAN enviada a ${viewModel.email.value}.\n¡Gracias por comprar en Marketify!")
                    .setCancelable(false)
                    .setPositiveButton("Regresar a Inicio") { _, _ ->
                        findNavController().popBackStack(R.id.navigation_catalog, false)
                    }
                    .show()
            }
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
