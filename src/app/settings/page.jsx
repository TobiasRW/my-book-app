import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import SettingsPageContent from './components/SettingsPageContent';
import Link from 'next/link';

export default function SettingsPage() {
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        // If no token is present, redirect to the sign-in page
        redirect('/');
    } else {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            // If the token is invalid, redirect to the sign-in page
            redirect('/');
        }
    }

    // Render the SettingsPageContent client component
    return (
        <div className='mt-2'>
            <Link
                href="/home"
                className="flex"
            >
                <svg
                    className="h-6 w-6 text-darkgray dark:text-offwhite"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {" "}
                    <path stroke="none" d="M0 0h24v24H0z" />{" "}
                    <polyline points="15 6 9 12 15 18" />
                </svg>
                <p>home</p>
            </Link>
            <SettingsPageContent />
        </div>
    )
}
