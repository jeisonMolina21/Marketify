import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { CreditCard, Truck, Receipt, ShieldCheck, ArrowRight, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCartStore } from '../store/useCartStore';
import { cn } from '../lib/utils';

const checkoutSchema = z.object({
  email: z.string().email('Email inválido'),
  firstName: z.string().min(2, 'Mínimo 2 caracteres'),
  lastName: z.string().min(2, 'Mínimo 2 caracteres'),
  phone: z.string().min(10, 'Número inválido'),
  address: z.string().min(5, 'Dirección requerida'),
  city: z.string().min(2, 'Ciudad requerida'),
  department: z.string().min(2, 'Departamento requerido'),
  // Electronic Invoicing Fields
  requiresInvoice: z.boolean().default(false),
  idType: z.enum(['CC', 'NIT', 'CE', 'PP']).optional(),
  idNumber: z.string().optional(),
  businessName: z.string().optional(),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutForm = () => {
  const { items, getTotalPrice } = useCartStore();
  const [step, setStep] = useState(1);
  const [showInvoiceFields, setShowInvoiceFields] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
        requiresInvoice: false
    }
  });

  const onSubmit = (data: CheckoutFormData) => {
    console.log('Order submitted:', data);
    alert('¡Pedido realizado con éxito!');
    window.location.href = '/';
  };

  const steps = [
    { id: 1, label: 'Envío', icon: Truck },
    { id: 2, label: 'Facturación', icon: Receipt },
    { id: 3, label: 'Pago', icon: CreditCard },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* Form Side */}
      <div className="lg:col-span-8 space-y-12">
        {/* Stepper */}
        <div className="flex items-center gap-4">
          {steps.map((s) => (
            <div key={s.id} className="flex items-center gap-2">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300",
                step >= s.id ? "bg-emerald-600 text-white shadow-lg shadow-emerald-500/20" : "bg-slate-100 text-slate-400"
              )}>
                <s.icon className="w-5 h-5" />
              </div>
              <span className={cn(
                "text-sm font-bold",
                step >= s.id ? "text-slate-900" : "text-slate-400"
              )}>{s.label}</span>
              {s.id < 3 && <div className="w-8 h-px bg-slate-200 mx-2" />}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          {/* Step 1: Shipping */}
          {step === 1 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Información de Envío</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Email</label>
                  <input {...register('email')} className="input-marketify" placeholder="tu@email.com" />
                  {errors.email && <p className="text-xs font-bold text-red-500">{errors.email.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Teléfono</label>
                  <input {...register('phone')} className="input-marketify" placeholder="300 123 4567" />
                  {errors.phone && <p className="text-xs font-bold text-red-500">{errors.phone.message}</p>}
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Nombre</label>
                  <input {...register('firstName')} className="input-marketify" placeholder="Juan" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Apellido</label>
                  <input {...register('lastName')} className="input-marketify" placeholder="Pérez" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Dirección</label>
                <input {...register('address')} className="input-marketify" placeholder="Calle 123 #45-67, Apto 101" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Departamento</label>
                  <select {...register('department')} className="input-marketify appearance-none">
                    <option value="Bogotá">Bogotá D.C.</option>
                    <option value="Antioquia">Antioquia</option>
                    <option value="Valle">Valle del Cauca</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Ciudad</label>
                  <input {...register('city')} className="input-marketify" placeholder="Bogotá" />
                </div>
              </div>

              <button 
                type="button" 
                onClick={() => setStep(2)}
                className="btn-primary-marketify w-full py-5 text-lg"
              >
                Continuar a Facturación <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Invoicing (Colombia Specific) */}
          {step === 2 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight">Facturación Electrónica</h2>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  <Info className="w-3 h-3" /> Requisito DIAN
                </div>
              </div>

              <div className="bg-slate-50 rounded-[2rem] p-8 border border-slate-200/50">
                <label className="flex items-center gap-4 cursor-pointer">
                  <div className="relative flex items-center justify-center w-6 h-6 rounded-lg border-2 border-slate-300 bg-white">
                    <input 
                      type="checkbox" 
                      className="peer absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => setShowInvoiceFields(e.target.checked)}
                    />
                    <div className="w-3 h-3 bg-emerald-500 rounded-sm opacity-0 peer-checked:opacity-100 transition-all"></div>
                  </div>
                  <div className="flex-1">
                    <span className="text-lg font-bold text-slate-900">¿Requiere factura electrónica con datos fiscales?</span>
                    <p className="text-sm text-slate-500">Obligatorio para deducción de impuestos en Colombia.</p>
                  </div>
                </label>

                {showInvoiceFields && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-8 pt-8 border-t border-slate-200 space-y-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Tipo de Documento</label>
                        <select {...register('idType')} className="input-marketify">
                          <option value="NIT">NIT (Empresa)</option>
                          <option value="CC">Cédula de Ciudadanía</option>
                          <option value="CE">Cédula de Extranjería</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Número</label>
                        <input {...register('idNumber')} className="input-marketify" placeholder="901.123.456-1" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Razón Social / Nombre Completo</label>
                      <input {...register('businessName')} className="input-marketify" placeholder="Empresa S.A.S o Juan Pérez" />
                    </div>
                  </motion.div>
                )}
              </div>

              <div class="flex gap-4">
                <button type="button" onClick={() => setStep(1)} className="btn-secondary-marketify flex-1">Volver</button>
                <button type="button" onClick={() => setStep(3)} className="btn-primary-marketify flex-[2]">Continuar al Pago</button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">Método de Pago</h2>
              
              <div className="grid grid-cols-1 gap-4">
                {['Tarjeta de Crédito', 'PSE (Débito)', 'Efecty / Su Red', 'Bancolombia'].map((method) => (
                  <label key={method} className="group relative p-6 rounded-[2rem] border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 cursor-pointer transition-all">
                    <input type="radio" name="payment" className="peer absolute inset-0 opacity-0" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-400 group-hover:text-emerald-600">
                          {method === 'Tarjeta de Crédito' ? <CreditCard className="w-6 h-6" /> : <ShieldCheck className="w-6 h-6" />}
                        </div>
                        <span className="text-lg font-bold text-slate-900">{method}</span>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-slate-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-500 transition-all flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="p-6 bg-slate-900 rounded-[2rem] text-white space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  <div>
                    <h4 className="font-bold">Pago 100% Seguro</h4>
                    <p className="text-xs text-slate-400">Tus datos están protegidos por encriptación SSL.</p>
                  </div>
                </div>
              </div>

              <div class="flex gap-4">
                <button type="button" onClick={() => setStep(2)} className="btn-secondary-marketify flex-1">Volver</button>
                <button type="submit" className="btn-primary-marketify flex-[2] py-5 text-xl shadow-2xl shadow-emerald-500/40">
                  Pagar ${(getTotalPrice()).toLocaleString('es-CO')}
                </button>
              </div>
            </motion.div>
          )}
        </form>
      </div>

      {/* Summary Side */}
      <div className="lg:col-span-4">
        <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 sticky top-32">
          <h3 className="text-xl font-bold text-slate-900 mb-8">Resumen de Orden</h3>
          
          <div className="space-y-6 mb-8 max-h-96 overflow-y-auto custom-scrollbar pr-2">
            {items.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{item.name}</h4>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-slate-500">Cant: {item.quantity}</span>
                    <span className="text-sm font-black text-slate-900">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-slate-100">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Subtotal</span>
              <span className="text-slate-900 font-bold">${getTotalPrice().toLocaleString('es-CO')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Envío</span>
              <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px]">Gratis</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-500 font-medium">Impuestos (IVA 19%)</span>
              <span className="text-slate-900 font-bold">${(getTotalPrice() * 0.19).toLocaleString('es-CO')}</span>
            </div>
            <div className="h-px bg-slate-100 my-4" />
            <div className="flex justify-between items-end">
              <span className="text-slate-500 font-medium">Total a Pagar</span>
              <span className="text-3xl font-black text-slate-900 tracking-tighter">${(getTotalPrice() * 1.19).toLocaleString('es-CO')}</span>
            </div>
          </div>
          
          <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex gap-3">
             <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
               <Receipt className="w-4 h-4" />
             </div>
             <p className="text-[10px] font-bold text-emerald-800 leading-tight">
               Se enviará la factura electrónica DIAN al correo proporcionado tras confirmar el pago.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
