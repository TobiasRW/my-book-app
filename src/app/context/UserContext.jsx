// context/UserContext.jsx
"use client";

import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Start with null to indicate loading
  //   const [loading, setLoading] = useState(true);

  // Function to fetch user data
  const fetchUser = async () => {
    // setLoading(true);
    try {
      const response = await fetch("/api/user", {
        method: "GET",
        credentials: "include",
      });
      const data = await response.json();
      if (data.username) {
        setUser(data.username);
      } else {
        setUser("Guest");
      }
    } catch (err) {
      console.error(err);
      setUser("Guest");
    } finally {
      //   setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
}
