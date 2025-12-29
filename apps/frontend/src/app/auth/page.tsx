'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex">
            {/* Coluna esquerda com fundo e logo grande */}
            <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden">
                <Image
                    src="/imagemLogin.png"
                    alt="Fundo Marketlist"
                    fill
                    priority
                    className="object-cover"
                />
            </div>

            {/* Coluna direita com formulário */}
            <div className="flex w-full lg:w-1/2 items-center justify-center px-4 sm:px-8">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] p-8 sm:p-10">
                    <h1 className="text-2xl sm:text-3xl font-semibold text-[#1f7a3b] mb-6 text-center">
                        Bem-vindo de volta!
                    </h1>

                    <form className="space-y-5">
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                E-mail
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Digite seu e-mail"
                                className="w-full rounded-full border border-gray-300 px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[#1f7a3b] focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Senha
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Digite sua senha"
                                    className="w-full rounded-full border border-gray-300 px-4 py-2.5 pr-10 text-sm outline-none focus:ring-2 focus:ring-[#1f7a3b] focus:border-transparent"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
                                    aria-label="Mostrar ou ocultar senha"
                                    onClick={() => setShowPassword((prev) => !prev)}
                                >
                                    {/* Ícone de olho simples */}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        {showPassword ? 'Esconder' : 'Mostrar'}
                                        <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full mt-2 rounded-full bg-[#1f7a3b] text-white font-medium py-2.5 text-sm shadow-md hover:bg-[#196331] transition-colors"
                        >
                            Entrar
                        </button>
                    </form>

                    <div className="mt-4 flex flex-col items-center space-y-1 text-sm">
                        <button
                            type="button"
                            className="text-gray-500 hover:text-gray-700"
                        >
                            Esqueceu a senha?
                        </button>
                        <Link
                            href="/auth/register"
                            className="text-[#f29b2b] font-medium hover:text-[#d8841f]"
                        >
                            Criar conta
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}