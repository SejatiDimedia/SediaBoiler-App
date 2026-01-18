import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const ADMIN_COOKIE_NAME = 'admin_auth';

export async function verifyAdminAuth(): Promise<boolean> {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get(ADMIN_COOKIE_NAME);
    return authCookie?.value === 'authenticated';
}

export async function requireAdminAuth(): Promise<void> {
    const isAuth = await verifyAdminAuth();
    if (!isAuth) {
        redirect('/admin/login');
    }
}

export async function setAdminAuth(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set(ADMIN_COOKIE_NAME, 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 24 hours
    });
}

export async function clearAdminAuth(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(ADMIN_COOKIE_NAME);
}

export function checkPassword(password: string): boolean {
    return password === process.env.ADMIN_PASSWORD;
}
