'use client'
import Image from "next/image";
import { usePathname, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import UserInfo from './UserInfo'

export default function MenuLateral() {
    const router = useRouter();
    const pathname = usePathname();
    const [activeItem, setActiveItem] = useState('');

    useEffect(() => {
        // Mapear pathname para item ativo
        const pathToItemMap: { [key: string]: string } = {
            '/dashboard': 'dashboard',
            '/product': 'product',
            '/market': 'market',
            '/purchase': 'purchase'
        };

        const currentItem = pathToItemMap[pathname] || '';
        setActiveItem(currentItem);
    }, [pathname]);

    function irParaDashboard() {
        router.push('/dashboard');
    };

    function irParaProdutos() {
        router.push('/product');
    }

    function irParaSupermercado() {
        router.push('/market');
    }

    function irParaNovaLista() {
        router.push('/purchase');
    }

    return (
        <>
            {/* Sidebar */}
            <aside className="hidden md:flex md:flex-col w-64 bg-[#34623F] text-white shadow-xl">
                <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
                    <div className="relative h-10 w-10 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                        <Image
                            src="/logo-semfundo.png"
                            alt="Marketlist logo"
                            fill
                            sizes="40px"
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-semibold tracking-tight">marketlist</span>
                </div>

                <nav className="mt-4 flex-1 px-3 space-y-1 text-sm">
                    <button className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${activeItem === 'dashboard'
                        ? 'bg-[#71C177] text-slate-900 font-medium shadow-sm'
                        : 'hover:bg-white/5'
                        }`} onClick={irParaDashboard}>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                            {/* Dashboard icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <path d="M4 3h7v7H4z" />
                                <path d="M13 3h7v11h-7z" />
                                <path d="M4 12h7v9H4z" />
                                <path d="M13 16h7v5h-7z" />
                            </svg>
                        </span>
                        <span className="text-sm">Dashboard</span>
                    </button>

                    <button className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${activeItem === 'product'
                        ? 'bg-[#71C177] text-slate-900 font-medium shadow-sm'
                        : 'hover:bg-white/5'
                        }`} onClick={irParaProdutos}>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                            {/* Produtos icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <path d="M3 7.5 12 3l9 4.5-9 4.5z" />
                                <path d="M5 9v7.5L12 21l7-4.5V9" />
                            </svg>
                        </span>
                        <span className="text-sm">Produtos</span>
                    </button>

                    <button className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${activeItem === 'market'
                        ? 'bg-[#71C177] text-slate-900 font-medium shadow-sm'
                        : 'hover:bg-white/5'
                        }`} onClick={irParaSupermercado}>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                            {/* Supermercados icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <path d="m3 5 2 13h14l2-13z" />
                                <path d="M3 5h18" />
                                <path d="M10 9v6" />
                                <path d="M14 9v6" />
                            </svg>
                        </span>
                        <span className="text-sm">Supermercados</span>
                    </button>

                    <button className={`w-full flex items-center gap-3 rounded-xl px-3 py-3 transition-colors ${activeItem === 'purchase'
                        ? 'bg-[#71C177] text-slate-900 font-medium shadow-sm'
                        : 'hover:bg-white/5'
                        }`} onClick={irParaNovaLista}>
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
                            {/* Lista icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                className="h-5 w-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={1.8}
                            >
                                <path d="M5 6h2v2H5V6Zm0 5h2v2H5v-2Zm0 5h2v2H5v-2Zm5-10h10v2H10V6Zm0 5h10v2H10v-2Zm0 5h10v2H10v-2Z" />
                            </svg>
                        </span>
                        <span className="text-sm">Nova Lista de Compras</span>
                    </button>
                </nav>
                <UserInfo />
            </aside>
        </>
    )
}