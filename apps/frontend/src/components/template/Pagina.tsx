import MenuLateral from "./MenuLateral"

interface PaginaPros {
    children?: any
}

export default function Pagina(props: any) {
    return (
        <div className="flex min-h-screen bg-[#f4f5f7] text-slate-900">
            <MenuLateral />
            <main className="flex-1">
                {props.children}
            </main>
        </div>
    )
}