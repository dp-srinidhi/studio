'use client';

import { LoginForm } from '@/components/login/login-form';
import { LogoIcon } from '@/components/icons';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { useRouter } from 'next/navigation';

export default function OperatorLoginPage() {
    const router = useRouter();
    const { login } = useAuth();

    const handleLogin = () => {
        login('operator');
        router.push('/');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <div className="flex justify-center items-center mb-4">
                        <LogoIcon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Operator Login</CardTitle>
                    <CardDescription>
                        Enter your credentials to access the operator dashboard.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <LoginForm onLogin={handleLogin} />
                </CardContent>
            </Card>
        </div>
    );
}
