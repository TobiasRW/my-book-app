// /app/settings/SettingsPageContent.jsx

'use client';

import { useRouter } from 'next/navigation';

export default function SettingsPageContent() {
  const router = useRouter();

  // Function to handle the logout process
  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { // Fetch the /api/logout endpoint to log out the user (endpoint clears the session)
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
      router.push('/'); // Redirect to the sign-in page after logout
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-4 flex flex-col gap-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Log Out
      </button>
      {/* Add other settings options here */}
    </div>
  );
}
