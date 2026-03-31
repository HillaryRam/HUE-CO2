import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-2xl font-black text-[#1c1917]">
                    Zona de Peligro
                </h2>

                <p className="mt-2 text-sm text-red-400 font-bold tracking-widest leading-relaxed">
                    Acción irreversible: eliminar tu cuenta y todos los datos asociados.
                </p>
            </header>

            <div className="max-w-fit flex-shrink-0">
                <DangerButton onClick={confirmUserDeletion}>Eliminar Cuenta</DangerButton>
            </div>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="space-y-6">
                    <div className="flex items-center gap-4 text-red-600 mb-2">
                        <AlertTriangle className="w-10 h-10" />
                        <h2 className="text-3xl font-black tracking-tight">
                            ¿Estás totalmente seguro?
                        </h2>
                    </div>

                    <p className="text-sm text-[#57534e] font-medium leading-relaxed">
                        Una vez eliminada la cuenta, todos los datos y recursos se borrarán de forma permanente.
                        Por favor, introduce tu contraseña para confirmar la eliminación definitiva de tu perfil.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Confirmar con Contraseña"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-full"
                            isFocused
                            placeholder="Introduce tu contraseña"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end gap-4">
                        <SecondaryButton onClick={closeModal}>
                            Cancelar
                        </SecondaryButton>

                        <div className="max-w-fit flex-shrink-0">
                            <DangerButton className="!py-4" disabled={processing}>
                                Sí, borrar cuenta
                            </DangerButton>
                        </div>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
