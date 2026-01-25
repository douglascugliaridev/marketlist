import { useCallback, useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

export function useAPIWithAuth() {
    const authContext = useContext(AuthContext);

    const handleUnauthorized = useCallback(() => {
        if (authContext?.logout) {
            authContext.logout();
        }
    }, [authContext]);

    return {
        handleUnauthorized
    };
}
