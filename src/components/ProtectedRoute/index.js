import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, isAdmin, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated || !isAdmin()) {
                router.push('/');
            }
        }
    }, [isAuthenticated, isAdmin, isLoading, router]);

    return !isLoading && isAuthenticated && isAdmin() ? children : null;
};

export default ProtectedRoute;
