'use client';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { LogoIcon } from '@/components/icons';
import { useAuth } from '@/context/auth-context';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = (role: 'operator' | 'public') => {
    login(role);
    router.push('/');
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center mb-4">
                <LogoIcon className="h-10 w-10 text-primary" />
            </div>
          <CardTitle className="text-2xl">Login to Chennai Road Watch</CardTitle>
          <CardDescription>
            Please select your role to login.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <Button onClick={() => handleLogin('operator')} className="w-full">
              Login as Operator
            </Button>
            <Button onClick={() => handleLogin('public')} variant="outline" className="w-full">
              Login as Public User
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
