"use client";
import { useAPI } from "../../../hooks/useAPI";
import { useState, useEffect } from "react";

export default function Product() {
    const [name, setName] = useState("");
    const [brand, setBrand] = useState("");
    const [listDefault, setListDefault] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const { createProduct, getProducts, deleteProduct } = useAPI();

    useEffect(() => {
        loadProducts();
    }, []);

    async function loadProducts(page: number = 1) {
        try {
            const response = await getProducts(page, 5);
            setProducts(response?.data || response || []);
            setTotalPages(response?.totalPages || 1);
            setTotalItems(response?.total || 0);
            setCurrentPage(page);
        } catch (error) {
            console.error("Erro ao carregar produtos:", error);
            setProducts([]);
            setTotalPages(1);
            setTotalItems(0);
        }
    }

    async function handleCreateProduct() {
        setError("");
        setSuccess("");

        if (!name.trim()) {
            setError("Por favor, informe o nome do produto");
            return;
        }

        if (!brand.trim()) {
            setError("Por favor, informe a marca do produto");
            return;
        }

        try {
            const result = await createProduct(name, brand, listDefault);

            if (result.error) {
                setError(result.error);
            } else {
                setSuccess("Produto cadastrado com sucesso!");
                setName("");
                setBrand("");
                setListDefault(false);
                loadProducts(1);
            }
        } catch (err) {
            setError("Ocorreu um erro ao cadastrar o produto. Tente novamente.");
        }
    }

    function handleCancel() {
        setName('');
        setBrand('');
        setListDefault(false);
        setError('');
        setSuccess('');
    }

    async function handleDeleteProduct(id: string) {
        try {
            const result = await deleteProduct(id);
            if (result.error) {
                setError(result.error);
            } else {
                setSuccess("Produto deletado com sucesso!");
                loadProducts(1);
            }
        } catch (err) {
            setError("Ocorreu um erro ao deletar o produto. Tente novamente.");
        }
    }

    return (
        <>
            {/* Área principal */}
            <main className="flex-1 flex items-center justify-center px-6 py-10 md:px-10">
                <div className="w-full max-w-6xl flex flex-col gap-6 md:flex-row md:gap-8 mt-20">
                    {/* Card de formulário */}
                    <section className="flex-1 rounded-2xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.15)] px-7 py-6 md:px-9 md:py-8 border border-gray-100">
                        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                            Cadastro de Produto
                        </h1>

                        {error && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {success && (
                            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm">
                                {success}
                            </div>
                        )}

                        <form className="space-y-5 text-sm md:text-[15px]">
                            <div className="space-y-1.5">
                                <label className="block font-medium text-gray-800">
                                    Nome do produto
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ex: Arroz"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#71C177]/70 focus:border-[#71C177] placeholder:text-gray-400"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="space-y-1.5">
                                <label className="block font-medium text-gray-800">Marca</label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
                                        <span className="h-6 w-6 rounded-full bg-[#fffbf5] border border-orange-200 flex items-center justify-center text-[10px] font-semibold text-[#F7AD52]">
                                            Tx
                                        </span>
                                    </span>
                                    <input
                                        type="text"
                                        placeholder="Ex: Tio João"
                                        className="w-full rounded-lg border border-gray-300 bg-white pl-11 pr-3.5 py-2.5 text-sm text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#71C177]/70 focus:border-[#71C177] placeholder:text-gray-400"
                                        value={brand}
                                        onChange={(e) => setBrand(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="flex items-start gap-3 pt-1">
                                <div className="flex h-5 items-center">
                                    <input
                                        id="default-list"
                                        type="checkbox"
                                        className="h-4 w-4 rounded border-gray-300 text-[#71C177] focus:ring-[#71C177]"
                                        checked={listDefault}
                                        onChange={(e) => setListDefault(e.target.checked)}
                                    />
                                </div>
                                <div className="text-xs md:text-sm">
                                    <label
                                        htmlFor="default-list"
                                        className="font-medium text-gray-800"
                                    >
                                        Lista padrão
                                    </label>
                                    <p className="text-gray-500 text-[11px] md:text-xs mt-0.5">
                                        Adiciona este produto às listas padrão de novos usuários.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={handleCreateProduct}
                                    className="inline-flex items-center justify-center rounded-lg bg-[#71C177] px-7 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#63aa69] transition-colors"
                                >
                                    Salvar
                                </button>
                                <button
                                    type="button"
                                    onClick={handleCancel}
                                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-7 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Card da tabela */}
                    <section className="flex-1 rounded-2xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.15)] px-5 py-5 md:px-7 md:py-7 border border-gray-100 flex flex-col max-h-[400px]">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-5 flex-shrink-0">
                            Produtos cadastrados
                        </h2>

                        <div className="overflow-x-auto -mx-2 md:mx-0 overflow-y-auto flex-1">
                            <table className="min-w-full text-sm text-left text-gray-800">
                                <thead>
                                    <tr className="bg-[#71C177] text-white text-xs uppercase tracking-wide">
                                        <th className="px-4 py-3 font-semibold rounded-l-lg">Nome</th>
                                        <th className="px-4 py-3 font-semibold">Marca</th>
                                        <th className="px-4 py-3 font-semibold text-center">
                                            Lista Padrão
                                        </th>
                                        <th className="px-4 py-3 font-semibold text-center rounded-r-lg">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {products.map((product, index) => (
                                        <tr
                                            key={product.id || product.name}
                                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
                                        >
                                            <td className="px-4 py-3 border-b border-gray-200 text-gray-900">
                                                {product.name}
                                            </td>
                                            <td className="px-4 py-3 border-b border-gray-200 text-gray-700">
                                                {product.brand}
                                            </td>
                                            <td className="px-4 py-3 border-b border-gray-200 text-center">
                                                {product.listDefault && (
                                                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#71C177]/10 text-[#71C177] border border-[#71C177]/40">
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            className="h-4 w-4"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2.2"
                                                        >
                                                            <path d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-4 py-3 border-b border-gray-200">
                                                <div className="flex items-center justify-center gap-3 text-base">
                                                    <button
                                                        type="button"
                                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7AD52] text-white shadow-sm transition hover:bg-[#e89c43]"
                                                        aria-label="Editar produto"
                                                    >
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            className="h-4 w-4"
                                                            aria-hidden="true"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M12 20h9" />
                                                            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5Z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 shadow-sm transition hover:bg-gray-300"
                                                        aria-label="Excluir produto"
                                                        onClick={() => handleDeleteProduct(product.id)}
                                                    >
                                                        <svg
                                                            viewBox="0 0 24 24"
                                                            className="h-4 w-4"
                                                            aria-hidden="true"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <polyline points="3 6 5 6 21 6" />
                                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                                            <path d="M10 11v6" />
                                                            <path d="M14 11v6" />
                                                            <path d="M15 6V4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v2" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Controles de paginação */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-between px-2 py-3 mt-4 border-t border-gray-200">
                                <div className="text-sm text-gray-700">
                                    Mostrando {products.length} de {totalItems} produtos
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        type="button"
                                        onClick={() => loadProducts(currentPage - 1)}
                                        disabled={currentPage === 1}
                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Anterior
                                    </button>
                                    <span className="text-sm text-gray-700">
                                        Página {currentPage} de {totalPages}
                                    </span>
                                    <button
                                        type="button"
                                        onClick={() => loadProducts(currentPage + 1)}
                                        disabled={currentPage === totalPages}
                                        className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Próximo
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </main>
        </>
    );
}