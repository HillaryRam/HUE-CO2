import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { User, ShieldCheck, Trash2 } from 'lucide-react';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout>
            <Head title="Perfil | HUE-CO2" />

            <div className="py-8 md:py-12">
                <div className="mx-auto max-w-4xl space-y-12 px-4 sm:px-6 lg:px-8">

                    {/* Información del Perfil */}
                    <div className="bg-white border-4 border-[#e7e5e4] p-8 md:p-12 rounded-[3.5rem] shadow-xl relative overflow-hidden group hover:border-[#87AF4C] transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#f0fdf4] rounded-bl-[4rem] flex items-center justify-center text-[#87AF4C] opacity-50 -z-0">
                            <User className="w-12 h-12" />
                        </div>
                        <div className="relative z-10">
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                                className="max-w-xl"
                            />
                        </div>
                    </div>

                    {/* Cambiar Contraseña */}
                    <div className="bg-white border-4 border-[#e7e5e4] p-8 md:p-12 rounded-[3.5rem] shadow-xl relative overflow-hidden group hover:border-[#fb923c] transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#fff7ed] rounded-bl-[4rem] flex items-center justify-center text-[#fb923c] opacity-50 -z-0">
                            <ShieldCheck className="w-12 h-12" />
                        </div>
                        <div className="relative z-10">
                            <UpdatePasswordForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* Eliminar Cuenta */}
                    <div className="bg-white border-4 border-[#ef4444]/10 p-8 md:p-12 rounded-[3.5rem] shadow-xl relative overflow-hidden group hover:border-red-200 transition-colors duration-500">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-[4rem] flex items-center justify-center text-red-400 opacity-50 -z-0">
                            <Trash2 className="w-12 h-12" />
                        </div>
                        <div className="relative z-10">
                            <DeleteUserForm className="max-w-xl" />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-16 flex items-center justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src="/images/DPEC_logo.png" alt="Logo" className="w-12 h-12 object-contain" />
                        <div className="h-8 w-1 bg-[#e7e5e4] rounded-full"></div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#a8a29e] hover:text-[#87AF4C]">Lo que hacemos cuenta y mucho</p>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}
