"use client";

import Image from "next/image";
import { useRouter } from 'next/navigation';

const lists = [
    {
        id: 1,
        month: "Novembro 2024",
        total: "R$ 450,00",
    },
    {
        id: 2,
        month: "Outubro 2024",
        total: "R$ 380,50",
    },
    {
        id: 3,
        month: "Setembro 2024",
        total: "R$ 419,50",
    },
];

export default function DashboardPage() {
    const router = useRouter();

    const handleNovaLista = () => {
        router.push('/purchase');
    };

    return (
        <>
            {/* Main area */}
            <div className="flex-1 flex flex-col">
                {/* Header fixo com logo e botão */}
                <header className="sticky top-0 z-20 flex items-center justify-between bg-[#F3F7FB]/90 backdrop-blur px-4 sm:px-8 py-4 border-b border-slate-200">
                    <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 md:hidden rounded-full bg-white shadow flex items-center justify-center overflow-hidden">
                            <Image
                                src="/logo-semfundo.png"
                                alt="Marketlist logo"
                                fill
                                sizes="36px"
                                className="object-contain"
                            />
                        </div>
                        <div>
                            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-slate-900">
                                Minhas Listas
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleNovaLista}
                            className="inline-flex items-center gap-2 rounded-full bg-[#F7AD52] px-4 sm:px-5 py-2 text-sm font-semibold text-slate-900 shadow-md hover:brightness-95 transition"
                        >
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/5">
                                <span className="text-base leading-none">+</span>
                            </span>
                            <span>Nova Lista</span>
                        </button>

                    </div>
                </header>

                {/* Conteúdo principal */}
                <main className="flex-1 px-4 sm:px-8 py-6 space-y-6">
                    {/* Cards de métricas */}
                    <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="rounded-2xl bg-white shadow-sm px-5 py-4 flex flex-col gap-1">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                Total Gasto:
                            </span>
                            <span className="text-2xl font-semibold text-slate-900">R$ 1250,00</span>
                        </div>

                        <div className="rounded-2xl bg-white shadow-sm px-5 py-4 flex flex-col gap-1">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                Listas Ativas:
                            </span>
                            <span className="text-2xl font-semibold text-slate-900">3</span>
                        </div>

                        <div className="rounded-2xl bg-white shadow-sm px-5 py-4 flex flex-col gap-1">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                                Total de Produtos Cadastrados:
                            </span>
                            <span className="text-2xl font-semibold text-slate-900">150</span>
                        </div>
                    </section>

                    {/* Tabela de listas */}
                    <section className="rounded-2xl bg-white shadow-sm overflow-hidden">
                        <div className="border-b border-slate-200 px-5 py-4">
                            <h2 className="text-base font-semibold text-slate-900">Minhas Listas</h2>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="bg-[#71C177] text-left text-xs font-semibold uppercase tracking-wide text-white">
                                        <th className="px-5 py-3 rounded-tl-2xl">Mês/Ano</th>
                                        <th className="px-5 py-3">Valor Total</th>
                                        <th className="px-5 py-3 text-right rounded-tr-2xl">Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lists.map((list, index) => (
                                        <tr
                                            key={list.id}
                                            className={`transition-colors hover:bg-[#E6F5EC] ${index % 2 === 0 ? "bg-slate-50" : "bg-slate-100"
                                                }`}
                                        >
                                            <td className="px-5 py-3">
                                                <div className="rounded-xl bg-white px-4 py-2 text-[0.95rem] text-slate-800 shadow-sm">
                                                    {list.month}
                                                </div>
                                            </td>
                                            <td className="px-5 py-3 align-middle text-[0.95rem] text-slate-800">
                                                {list.total}
                                            </td>
                                            <td className="px-5 py-3 align-middle">
                                                <div className="flex justify-end gap-2">
                                                    <button className="inline-flex items-center gap-1.5 rounded-full bg-[#71C177] px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:brightness-95 transition">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth={1.8}
                                                        >
                                                            <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6S2 12 2 12Z" />
                                                            <circle cx="12" cy="12" r="3" />
                                                        </svg>
                                                        <span>Visualizar</span>
                                                    </button>

                                                    <button className="inline-flex items-center gap-1.5 rounded-full bg-red-500 px-3.5 py-1.5 text-xs font-semibold text-white shadow hover:bg-red-600 transition">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth={1.8}
                                                        >
                                                            <path d="M4 7h16" />
                                                            <path d="M10 11v6" />
                                                            <path d="M14 11v6" />
                                                            <path d="M6 7 7 20h10l1-13" />
                                                            <path d="M9 7V5h6v2" />
                                                        </svg>
                                                        <span>Excluir</span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </main>

                {/* Footer */}
                <footer className="border-t border-slate-200 bg-[#F3F7FB] px-4 sm:px-8 py-4 text-xs text-slate-500">
                    <p>Marketlist  Organize suas listas de compras de forma simples e eficiente.</p>
                </footer>
            </div>
        </>
    );
}