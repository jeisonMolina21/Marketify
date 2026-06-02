package com.marketify.app.ui.auth

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.core.widget.doAfterTextChanged
import androidx.fragment.app.Fragment
import androidx.fragment.app.viewModels
import androidx.navigation.fragment.findNavController
import com.marketify.app.MarketifyApplication
import com.marketify.app.R
import com.marketify.app.databinding.FragmentAuthBinding

class AuthFragment : Fragment() {

    private var _binding: FragmentAuthBinding? = null
    private val binding get() = _binding!!

    private val viewModel: AuthViewModel by viewModels {
        val app = requireActivity().application as MarketifyApplication
        AuthViewModelFactory(app.container.authRepository)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View {
        _binding = FragmentAuthBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupInputBindings()
        setupListeners()
        observeViewModel()
    }

    override fun onResume() {
        super.onResume()
        viewModel.checkUserSession()
    }

    private fun setupInputBindings() {
        binding.tietAuthEmail.doAfterTextChanged { viewModel.emailInput.value = it?.toString() }
        binding.tietAuthPassword.doAfterTextChanged { viewModel.passwordInput.value = it?.toString() }
    }

    private fun setupListeners() {
        binding.btnAuthLogin.setOnClickListener {
            viewModel.login()
        }

        binding.btnAuthLogout.setOnClickListener {
            viewModel.logout()
            Toast.makeText(context, "Sesión cerrada", Toast.LENGTH_SHORT).show()
        }

        binding.btnGoToAdmin.setOnClickListener {
            findNavController().navigate(R.id.navigation_admin)
        }
    }

    private fun observeViewModel() {
        viewModel.currentUser.observe(viewLifecycleOwner) { user ->
            if (user != null) {
                binding.layoutLogin.visibility = View.GONE
                binding.layoutProfile.visibility = View.VISIBLE
                
                binding.tvProfileName.text = user.name
                binding.tvProfileEmail.text = user.email
                binding.tvProfileRole.text = user.role
                
                // Get initials for circular avatar
                val initials = user.name.split(" ")
                    .mapNotNull { it.firstOrNull() }
                    .take(2)
                    .joinToString("")
                    .uppercase()
                binding.tvProfileAvatar.text = initials
            } else {
                binding.layoutLogin.visibility = View.VISIBLE
                binding.layoutProfile.visibility = View.GONE
            }
        }

        viewModel.isLoading.observe(viewLifecycleOwner) { loading ->
            binding.progressAuth.visibility = if (loading) View.VISIBLE else View.GONE
            binding.btnAuthLogin.isEnabled = !loading
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
