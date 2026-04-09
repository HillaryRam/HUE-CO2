import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { Link, useForm, usePage } from '@inertiajs/react';
import { CheckCircle2 } from 'lucide-react';

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = '',
}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-2xl font-black text-[#1c1917]">
                    Información del Perfil
                </h2>

                <p className="mt-2 text-sm text-[#a8a29e] font-bold tracking-widest">
                    Actualiza tu nombre y dirección de correo.
                </p>
            </header>

            <form onSubmit={submit} className="mt-8 space-y-6">
                <div>
                    <InputLabel htmlFor="name" value="Nombre de usuario" />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Correo Electrónico" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div className="bg-amber-50 border-2 border-amber-200 p-4 rounded-2xl">
                        <p className="text-sm text-amber-800 font-bold">
                            Tu correo electrónico no está verificado.
                            <Link
                                href={route('verification.send')}
                                method="post"
                                as="button"
                                className="ml-2 underline hover:text-amber-900 transition-colors"
                            >
                                Pulsa aquí para reenviar el enlace.
                            </Link>
                        </p>

                        {status === 'verification-link-sent' && (
                            <div className="mt-2 text-sm font-black text-green-600">
                                Se ha enviado un nuevo enlace de verificación.
                            </div>
                        )}
                    </div>
                )}

                <div className="flex items-center gap-6">
                    <div className="max-w-fit flex-shrink-0">
                        <PrimaryButton disabled={processing}>Guardar Cambios</PrimaryButton>
                    </div>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out duration-300"
                        enterFrom="opacity-0 translate-x-4"
                        leave="transition ease-in-out duration-300"
                        leaveTo="opacity-0 translate-x-4"
                    >
                        <div className="flex items-center gap-2 text-green-600 font-black text-sm">
                            <CheckCircle2 className="w-5 h-5" />
                            <span>Actualizado</span>
                        </div>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
