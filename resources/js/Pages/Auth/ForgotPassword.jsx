import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import { Mail, ChevronLeft } from 'lucide-react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen bg-[#fafaf9] font-sans text-[#44403c] flex flex-col items-center justify-center p-4 md:p-6 relative overflow-hidden">
            <Head title="Recuperar Contraseña | HUE-CO2" />

            {/* Fondo Orgánico */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#dcfce7] rounded-full blur-[120px] opacity-40 -z-10" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#fef3c7] rounded-full blur-[120px] opacity-40 -z-10" />
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/handmade-paper.png')]" />

            {/* Logo Mini */}
            <div className="absolute top-6 left-6 flex items-center gap-2 opacity-50">
                <div className="w-12 h-12 flex items-center justify-center mx-auto mb-4">
                    <img src="/images/DPEC_logo.png" alt="Logo" className="w-full h-full object-contain" />
                </div>
                <span className="font-black mb-5">HUE-CO2</span>
            </div>

            <div className="w-full max-w-md bg-white border-4 border-[#e7e5e4] p-8 md:p-10 rounded-[3rem] shadow-2xl animate-in slide-in-from-bottom-8 duration-300">
                <Link href={route('login')} className="mb-6 text-[#a8a29e] hover:text-[#1c1917] flex items-center gap-1 font-bold text-sm inline-flex">
                    <ChevronLeft className="w-4 h-4" /> Volver al inicio
                </Link>

                <h2 className="text-3xl font-black mb-4 text-[#1c1917]">¿Has olvidado tu contraseña?</h2>

                <p className="mb-8 text-sm text-[#57534e] font-medium leading-relaxed">
                    No te preocupes. Introduce tu correo electrónico y te enviaremos un enlace para que puedas elegir una nueva.
                </p>

                {status && (
                    <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-2xl font-bold text-sm text-green-700">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase text-[#a8a29e] tracking-widest mb-2 ml-4">Tu Correo Electrónico</label>
                        <div className="relative">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#a8a29e] w-5 h-5" />
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                placeholder="tucorreo@ejemplo.com"
                                className={`w-full bg-[#f5f5f4] border-4 ${errors.email ? 'border-red-500' : 'border-[#e7e5e4]'} rounded-2xl py-4 pl-14 pr-6 text-sm font-bold focus:outline-none focus:border-[#87AF4C] transition-colors`}
                                required
                                autoFocus
                            />
                        </div>
                        {errors.email && <p className="text-red-500 text-xs font-bold mt-2 ml-4">{errors.email}</p>}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-[#1c1917] text-white py-5 rounded-2xl font-black text-lg shadow-lg hover:bg-[#292524] transition-all disabled:opacity-50 cursor-pointer"
                    >
                        Enviar Enlace de Recuperación
                    </button>
                </form>
            </div>
        </div>
    );
}
