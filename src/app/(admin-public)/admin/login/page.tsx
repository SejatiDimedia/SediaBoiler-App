import { redirect } from 'next/navigation';
import { checkPassword, setAdminAuth, verifyAdminAuth } from '@/lib/admin-auth';
import { Layers, Lock } from 'lucide-react';

export default async function AdminLoginPage({
    searchParams,
}: {
    searchParams: Promise<{ error?: string }>;
}) {
    // Check if already logged in
    const isAuth = await verifyAdminAuth();
    if (isAuth) {
        redirect('/admin');
    }

    const params = await searchParams;
    const hasError = params.error === 'invalid';

    async function handleLogin(formData: FormData) {
        'use server';
        const password = formData.get('password') as string;

        if (checkPassword(password)) {
            await setAdminAuth();
            redirect('/admin');
        }

        // If password is wrong, redirect back with error
        redirect('/admin/login?error=invalid');
    }

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-xl shadow-lg border p-8">
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-600 text-white mb-4">
                            <Layers className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">SapaUI Admin</h1>
                        <p className="text-gray-500 mt-1">Masuk untuk mengelola komponen</p>
                    </div>

                    {/* Error message */}
                    {hasError && (
                        <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            Password salah. Silakan coba lagi.
                        </div>
                    )}

                    {/* Login Form */}
                    <form action={handleLogin}>
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <Lock className="w-4 h-4 inline mr-1" />
                                Admin Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Masukkan password admin"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
                        >
                            Masuk
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-500 mt-6">
                        Password diatur via environment variable <code className="bg-gray-100 px-1 rounded">ADMIN_PASSWORD</code>
                    </p>
                </div>
            </div>
        </div>
    );
}
