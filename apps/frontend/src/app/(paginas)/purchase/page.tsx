"use client";

import { useState } from "react";
import Image from "next/image";

const initialItems = [
    {
        id: 1,
        name: "Arroz",
        quantity: 5,
        previousPrice: "R$ 23,50",
        price: "R$ 25,90",
        subtotal: "R$ 129,50",
    },
    {
        id: 2,
        name: "Feijão",
        quantity: 2,
        previousPrice: "R$ 8,90",
        price: "R$ 9,50",
        subtotal: "R$ 19,00",
    },
    {
        id: 3,
        name: "Leite",
        quantity: 6,
        previousPrice: "R$ 4,90",
        price: "R$ 5,15",
        subtotal: "R$ 30,90",
    },
];

export default function Purchase() {
    const [useDefaultList, setUseDefaultList] = useState(false);
    const [items, setItems] = useState(initialItems);
    const [defaultList, setDefaultList] = useState([
        { id: 1, name: "Arroz", quantity: 1 },
        { id: 2, name: "Feijão", quantity: 1 },
        { id: 3, name: "Óleo", quantity: 1 },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [newProductName, setNewProductName] = useState("");
    const [nextId, setNextId] = useState(4);

    const checkProductInDefaultList = (productName: string) => {
        return defaultList.some(item =>
            item.name.toLowerCase() === productName.toLowerCase().trim()
        );
    };

    const handleAddProduct = () => {
        setNewProductName("");
        setShowModal(true);
    };

    const handleConfirmAddProduct = () => {
        const trimmedName = newProductName.trim();
        if (!trimmedName) return;

        const newItem = {
            id: nextId,
            name: trimmedName,
            quantity: 1,
            previousPrice: "R$ 0,00",
            price: "R$ 0,00",
            subtotal: "R$ 0,00",
        };

        setItems(prev => [...prev, newItem]);
        setNextId(prev => prev + 1);

        if (!checkProductInDefaultList(trimmedName)) {
            setDefaultList(prev => [...prev, { id: nextId, name: trimmedName, quantity: 1 }]);
        }

        setShowModal(false);
        setNewProductName("");
    };

    const handleDeleteProduct = (productId: number) => {
        setItems(prev => prev.filter(item => item.id !== productId));
    };

    return (
        <>


            {/* Área principal */}
            <main className="flex-1 flex flex-col px-4 sm:px-8 py-6 gap-6">
                {/* Header da página (sem header global) */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">
                            Nova Lista de Compras
                        </h1>
                        <p className="text-sm text-gray-500 mt-1">
                            Crie a lista com base nos seus itens mais frequentes.
                        </p>
                    </div>
                </div>

                {/* Card principal com tabela */}
                <section className="w-full rounded-2xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.15)] px-5 py-5 md:px-7 md:py-7 border border-gray-100 flex flex-col gap-4">
                    {/* Toggle inicial */}
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setUseDefaultList((prev) => !prev)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${useDefaultList ? "bg-[#71C177]" : "bg-gray-200"
                                    }`}
                            >
                                <span
                                    className={`inline-block h-5 w-5 rounded-full bg-white shadow transform transition-transform ${useDefaultList ? "translate-x-5" : "translate-x-1"
                                        }`}
                                />
                            </button>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-gray-900">
                                    Iniciar com lista padrão
                                </span>
                                <span className="text-xs text-gray-500">
                                    Crie a lista com base nos seus itens mais frequentes.
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Tabela responsiva */}
                    <div className="mt-4 overflow-x-auto rounded-2xl border border-gray-200 bg-gray-50">
                        <table className="min-w-full text-sm text-gray-800">
                            <thead>
                                <tr className="bg-[#71C177] text-xs font-semibold uppercase tracking-wide text-white">
                                    <th className="px-4 py-3 rounded-tl-2xl text-left">Produto</th>
                                    <th className="px-4 py-3 text-center">Quantidade</th>
                                    <th className="px-4 py-3 text-center">Preço anterior</th>
                                    <th className="px-4 py-3 text-center">Preço</th>
                                    <th className="px-4 py-3 rounded-tr-2xl text-right">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item, index) => (
                                    <tr
                                        key={item.id}
                                        className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-[#E6F5EC] transition-colors`}
                                    >
                                        <td className="px-4 py-3 border-t border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <span className="w-5 text-right text-xs text-gray-500">
                                                    {item.id}.
                                                </span>
                                                <input
                                                    type="text"
                                                    defaultValue={item.name}
                                                    className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#71C177]/70 focus:border-[#71C177]"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-t border-gray-200 align-middle">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setItems((prev) =>
                                                            prev.map((row) =>
                                                                row.id === item.id
                                                                    ? {
                                                                        ...row,
                                                                        quantity:
                                                                            row.quantity > 0
                                                                                ? row.quantity - 1
                                                                                : 0,
                                                                    }
                                                                    : row,
                                                            ),
                                                        )
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                                                >
                                                    <span className="text-base leading-none">-</span>
                                                </button>
                                                <input
                                                    type="number"
                                                    value={item.quantity}
                                                    onChange={(e) => {
                                                        const value = Number(e.target.value);
                                                        setItems((prev) =>
                                                            prev.map((row) =>
                                                                row.id === item.id
                                                                    ? {
                                                                        ...row,
                                                                        quantity:
                                                                            Number.isNaN(value) || value < 0
                                                                                ? 0
                                                                                : value,
                                                                    }
                                                                    : row,
                                                            ),
                                                        );
                                                    }}
                                                    className="w-14 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-center text-sm text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#71C177]/70 focus:border-[#71C177]"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setItems((prev) =>
                                                            prev.map((row) =>
                                                                row.id === item.id
                                                                    ? {
                                                                        ...row,
                                                                        quantity: row.quantity + 1,
                                                                    }
                                                                    : row,
                                                            ),
                                                        )
                                                    }
                                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-[#71C177] text-white hover:bg-[#63aa69] transition"
                                                >
                                                    <span className="text-base leading-none">+</span>
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-t border-gray-200 align-middle">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-xs text-gray-500">R$</span>
                                                <input
                                                    type="text"
                                                    defaultValue={item.previousPrice}
                                                    disabled
                                                    className="w-24 rounded-lg border border-gray-300 bg-gray-100 px-2 py-1.5 text-sm text-gray-500 shadow-inner"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-t border-gray-200 align-middle">
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-xs text-gray-500">R$</span>
                                                <input
                                                    type="text"
                                                    defaultValue={item.price}
                                                    className="w-24 rounded-lg border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#71C177]/70 focus:border-[#71C177]"
                                                />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 border-t border-gray-200 align-middle">
                                            <div className="flex items-center justify-end gap-3">
                                                <span className="text-sm font-semibold text-gray-900">
                                                    {item.subtotal}
                                                </span>
                                                <button
                                                    type="button"
                                                    onClick={() => handleDeleteProduct(item.id)}
                                                    className="flex h-8 w-8 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                                                    aria-label={`Remover ${item.name}`}
                                                >
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
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Observação sobre preço anterior */}
                    <p className="mt-2 text-xs text-gray-500">
                        A coluna "Preço anterior" representa o valor pago pelo mesmo produto na última lista em que ele foi utilizado.
                    </p>

                    {/* Botão adicionar produto */}
                    <div className="mt-4 flex justify-start">
                        <button
                            onClick={handleAddProduct}
                            className="inline-flex items-center gap-2 rounded-full bg-[#71C177] px-5 py-2.5 text-sm font-semibold text-white shadow hover:bg-[#63aa69] transition"
                        >
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/10">
                                <span className="text-base leading-none">+</span>
                            </span>
                            <span>Adicionar Produto</span>
                        </button>
                    </div>
                </section>

                {/* Barra de total */}
                <section className="w-full rounded-2xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.15)] px-5 py-4 md:px-7 md:py-5 border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
                    <span className="text-xl md:text-2xl font-semibold text-gray-900">
                        Total: R$ 245,50
                    </span>
                    <button className="inline-flex items-center justify-center rounded-xl bg-[#F7AD52] px-6 md:px-8 py-2.5 text-sm md:text-base font-semibold text-slate-900 shadow-md hover:brightness-95 transition">
                        Salvar Lista
                    </button>
                </section>
            </main>

            {/* Modal de confirmação para adicionar produto */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">
                            Adicionar Novo Produto
                        </h3>
                        <p className="text-sm text-gray-600 mb-4">
                            Digite o nome do produto que deseja adicionar. Ele será salvo automaticamente na sua lista padrão caso ainda não exista.
                        </p>
                        <input
                            type="text"
                            value={newProductName}
                            onChange={(e) => setNewProductName(e.target.value)}
                            placeholder="Nome do produto"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#71C177]/70 focus:border-[#71C177] mb-4"
                            autoFocus
                        />
                        {newProductName.trim() && checkProductInDefaultList(newProductName.trim()) && (
                            <p className="text-xs text-amber-600 mb-4">
                                ⚠️ Este produto já existe na sua lista padrão e não será duplicado.
                            </p>
                        )}
                        <div className="flex gap-3 justify-end">
                            <button
                                type="button"
                                onClick={() => {
                                    setShowModal(false);
                                    setNewProductName("");
                                }}
                                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                            >
                                Cancelar
                            </button>
                            <button
                                type="button"
                                onClick={handleConfirmAddProduct}
                                disabled={!newProductName.trim()}
                                className="px-4 py-2 text-sm font-medium text-white bg-[#71C177] rounded-lg hover:bg-[#63aa69] transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                            >
                                Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}