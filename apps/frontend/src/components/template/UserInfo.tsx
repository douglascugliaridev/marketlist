'use client'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'

export default function UserInfo() {
    const { user, logout } = useAuth()
    const router = useRouter()

    function handleLogout() {
        logout()
        router.push('/')
    }

    if (!user) return null
    console.log(user)
    return (
        <div className="border-t border-white/10 mt-auto">
            <div className="p-3">
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-8 w-8 rounded-full bg-[#71C177] flex items-center justify-center">
                        <span className="text-sm font-semibold text-slate-900">
                            {user.name.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                            {user.name}
                        </p>
                        <p className="text-xs text-white/70 truncate">
                            {user.email}
                        </p>
                    </div>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" x2="9" y1="12" y2="12" />
                    </svg>
                    <span>Sair</span>
                </button>
            </div>
        </div>
    )
}
