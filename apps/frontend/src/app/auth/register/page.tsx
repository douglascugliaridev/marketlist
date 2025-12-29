'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent } from 'react';

export default function RegisterPage() {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // TODO: implementar chamada de API de cadastro
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fef3e2] via-[#f2fff3] to-[#e0f5ff] px-4">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.12)] p-8 sm:p-10">
                <div className="flex flex-col items-center mb-6">
                    <div className="relative w-35 h-35">
                        <Image
                            src="/logo.svg"
                            alt="Marketlist"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#1f7a3b] text-center">
                        Cadastro de Usuário
                    </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nome completo"
                            className="w-full rounded-full border border-[#1f7a3b]/40 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1f7a3b] focus:border-transparent placeholder:text-gray-400 shadow-[0_0_0_1px_rgba(31,122,59,0.15)]"
                            required
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            className="w-full rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1f7a3b] focus:border-transparent placeholder:text-gray-400"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Senha"
                                className="w-full rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1f7a3b] focus:border-transparent placeholder:text-gray-400"
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="passwordConfirmation"
                                placeholder="Confirmar senha"
                                className="w-full rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1f7a3b] focus:border-transparent placeholder:text-gray-400"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full mt-2 rounded-full bg-[#1f7a3b] text-white font-medium py-2.5 text-sm shadow-md hover:bg-[#196331] transition-colors"
                    >
                        Cadastrar
                    </button>
                </form>

                <div className="mt-4 text-center text-sm">
                    <span className="text-gray-500">Já tem uma conta? </span>
                    <Link
                        href="/auth"
                        className="text-[#f29b2b] font-medium hover:text-[#d8841f]"
                    >
                        Entrar
                    </Link>
                </div>
            </div>
        </div>
    );
}
