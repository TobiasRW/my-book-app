// /app/settings/SettingsPageContent.jsx

'use client';

import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useRouter } from 'next/navigation';
import { BiLogOut } from "react-icons/bi";

export default function SettingsPageContent() {
  const router = useRouter();
  const { setUser } = useContext(UserContext);

  // Function to handle the logout process
  const handleLogout = async () => {
    try {
      await fetch('/api/logout', { // Fetch the /api/logout endpoint to log out the user (endpoint clears the session)
        method: 'POST',
        credentials: 'include', // Include cookies in the request
      });
      setUser('Guest'); // Set the user to 'Guest' in the context
      router.push('/'); // Redirect to the sign-in page after logout
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="flex justify-between items-center" onClick={handleLogout}>
      <p>Log Out</p>
      <BiLogOut className="text-2xl"/>
      {/* Add other settings options here */}
    </div>
  );
}
