'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useAPI } from '@/hooks/useAPI';

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { register } = useAPI();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (password !== passwordConfirmation) {
            setError("As senhas não coincidem. Por favor, verifique.");
            return;
        }

        try {
            const result = await register(name, email, password);

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess("Cadastro realizado com sucesso!");
                setName("");
                setEmail("");
                setPassword("");
                setPasswordConfirmation("");
            }
        } catch (err) {
            setError("Ocorreu um erro ao realizar o cadastro. Tente novamente.");
        }
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="E-mail"
                            className="w-full rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1f7a3b] focus:border-transparent placeholder:text-gray-400"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <input
                                type="password"
                                name="password"
                                placeholder="Senha"
                                className={`w-full rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1f7a3b] focus:border-transparent placeholder:text-gray-400 ${passwordConfirmation && password !== passwordConfirmation
                                    ? 'border-red-400 focus:ring-red-400'
                                    : 'border-gray-300'
                                    }`}
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                name="passwordConfirmation"
                                placeholder="Confirmar senha"
                                className={`w-full rounded-full border px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1f7a3b] focus:border-transparent placeholder:text-gray-400 ${passwordConfirmation && password !== passwordConfirmation
                                    ? 'border-red-400 focus:ring-red-400'
                                    : 'border-gray-300'
                                    }`}
                                required
                                value={passwordConfirmation}
                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-full px-4 py-2.5 flex items-center gap-2">
                            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-red-600 text-sm">{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 border border-green-200 rounded-full px-4 py-2.5 flex items-center gap-2">
                            <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-green-600 text-sm">{success}</span>
                        </div>
                    )}

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
