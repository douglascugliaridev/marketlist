export default function Market() {
    const supermarkets = [
        "Carrefour",
        "Pão de Açúcar",
        "Extra",
        "Atacadão",
    ];

    type SidebarItemProps = {
        label: string;
        icon: "home" | "chart" | "list" | "cart" | "stats" | "bell";
        active?: boolean;
    };

    function SidebarItem({ label, icon, active }: SidebarItemProps) {
        return (
            <button
                className={`flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium transition ${active
                    ? "bg-[#71C177] text-white shadow-md"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
            >
                <span className="flex h-5 w-5 items-center justify-center">
                    <SidebarIcon name={icon} />
                </span>
                <span>{label}</span>
            </button>
        );
    }

    type SidebarIconProps = {
        name: "home" | "chart" | "list" | "cart" | "stats" | "bell";
    };

    function SidebarIcon({ name }: SidebarIconProps) {
        switch (name) {
            case "home":
                return (
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-white/90"
                        aria-hidden="true"
                    >
                        <path
                            d="M4 11.5 12 4l8 7.5V20a1 1 0 0 1-1 1h-4.5a.5.5 0 0 1-.5-.5V15h-4v5.5a.5.5 0 0 1-.5.5H5a1 1 0 0 1-1-1v-8.5Z"
                            fill="currentColor"
                        />
                    </svg>
                );
            case "chart":
                return (
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-white/90"
                        aria-hidden="true"
                    >
                        <path
                            d="M5 20a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v10H5Zm6 0V5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v15h-4Zm6 0v-7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h-4Z"
                            fill="currentColor"
                        />
                    </svg>
                );
            case "list":
                return (
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-white/90"
                        aria-hidden="true"
                    >
                        <path
                            d="M5 6h2v2H5V6Zm0 5h2v2H5v-2Zm0 5h2v2H5v-2Zm5-10h10v2H10V6Zm0 5h10v2H10v-2Zm0 5h10v2H10v-2Z"
                            fill="currentColor"
                        />
                    </svg>
                );
            case "cart":
                return (
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-white/90"
                        aria-hidden="true"
                    >
                        <path
                            d="M4 4h2.2a1 1 0 0 1 .97.757L7.8 7h11.15a1 1 0 0 1 .97 1.243l-1.2 4.5A2 2 0 0 1 16.78 14H9.22a2 2 0 0 1-1.94-1.257L5.3 5.8 4 5.5V4Zm4.5 14a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm9 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"
                            fill="currentColor"
                        />
                    </svg>
                );
            case "stats":
                return (
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-white/90"
                        aria-hidden="true"
                    >
                        <path
                            d="M5 19h14v2H4a1 1 0 0 1-1-1V5h2v14Zm3.5-2.5v-6a1 1 0 0 1 1-1H11a1 1 0 0 1 1 1v6h-3.5Zm5-3v-8a1 1 0 0 1 1-1H16a1 1 0 0 1 1 1v8h-3.5Zm5 1.5v-4a1 1 0 0 1 1-1H21a1 1 0 0 1 1 1v4h-3.5Z"
                            fill="currentColor"
                        />
                    </svg>
                );
            case "bell":
                return (
                    <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4 text-white/90"
                        aria-hidden="true"
                    >
                        <path
                            d="M12 3a4 4 0 0 1 4 4v1.09c0 .46.16.91.45 1.27l1.52 1.9A3 3 0 0 1 19.5 14v1.5H4.5V14a3 3 0 0 1 1.53-2.56l1.52-1.9A2 2 0 0 0 8 8.09V7a4 4 0 0 1 4-4Zm0 18a2.5 2.5 0 0 1-2.45-2h4.9A2.5 2.5 0 0 1 12 21Z"
                            fill="currentColor"
                        />
                    </svg>
                );
            default:
                return null;
        }
    }

    type IconProps = {
        className?: string;
    };

    function EditIcon({ className }: IconProps) {
        return (
            <svg
                viewBox="0 0 24 24"
                className={className}
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
        );
    }

    function TrashIcon({ className }: IconProps) {
        return (
            <svg
                viewBox="0 0 24 24"
                className={className}
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
        );
    }


    return (
        <>
            {/* Área principal */}
            <main className="flex-1 flex items-center justify-center px-6 py-10 md:px-10">
                <div className="w-full max-w-6xl flex flex-col gap-6 md:flex-row md:gap-8 mt-20">
                    {/* Card de cadastro */}
                    <section className="flex-1 rounded-2xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.15)] px-7 py-6 md:px-9 md:py-8 border border-gray-100">
                        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6">
                            Cadastro de Supermercado
                        </h2>

                        <form className="space-y-5 text-sm md:text-[15px]">
                            <div className="space-y-1.5">
                                <label
                                    htmlFor="supermarket-name"
                                    className="block font-medium text-gray-800"
                                >
                                    Nome do supermercado
                                </label>
                                <input
                                    id="supermarket-name"
                                    type="text"
                                    placeholder="Ex: Carrefour"
                                    className="w-full rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-sm text-gray-900 shadow-inner focus:outline-none focus:ring-2 focus:ring-[#71C177]/70 focus:border-[#71C177] placeholder:text-gray-400"
                                />
                            </div>

                            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-lg bg-[#71C177] px-7 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#63aa69] transition-colors"
                                >
                                    Salvar
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-gray-100 px-7 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </section>

                    {/* Card de tabela */}
                    <section className="flex-1 rounded-2xl bg-white shadow-[0_18px_45px_rgba(15,23,42,0.15)] px-5 py-5 md:px-7 md:py-7 border border-gray-100 flex flex-col">
                        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4 md:mb-5">
                            Supermercados cadastrados
                        </h2>

                        <div className="overflow-x-auto -mx-2 md:mx-0">
                            <table className="min-w-full text-sm text-gray-800">
                                <thead>
                                    <tr className="bg-[#71C177] text-white text-xs uppercase tracking-wide">
                                        <th className="px-4 py-3 font-semibold rounded-l-lg text-left">Nome</th>
                                        <th className="px-4 py-3 font-semibold rounded-r-lg text-right">
                                            Ações
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {supermarkets.map((name) => (
                                        <tr
                                            key={name}
                                            className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            <td className="px-4 py-3 border-b border-gray-200 text-gray-900 text-left">
                                                {name}
                                            </td>
                                            <td className="px-4 py-3 border-b border-gray-200 text-right">
                                                <div className="flex items-center justify-end gap-3 text-base">
                                                    <button
                                                        type="button"
                                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F7AD52] text-white shadow-sm transition hover:bg-[#e89c43]"
                                                        aria-label={`Editar ${name}`}
                                                    >
                                                        <EditIcon className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        type="button"
                                                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-600 shadow-sm transition hover:bg-gray-300"
                                                        aria-label={`Excluir ${name}`}
                                                    >
                                                        <TrashIcon className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </main>

        </>
    );
}

