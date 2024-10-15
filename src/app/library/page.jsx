'use client';

import React, { useEffect, useState } from 'react';

export default function LibraryPage() {
  const [shelves, setShelves] = useState([]);
  const [shelfName, setShelfName] = useState('');
  const [error, setError] = useState('');

  // UseEffect to fetch shelves on page load
  useEffect(() => {
    const fetchShelves = async () => {
      try {
        // Fetch shelves
        const res = await fetch('/api/shelves');
        const data = await res.json();

        // Check for errors
        if (data.error) {
          setError(data.error);
        } else {
          setShelves(data.shelves); // Set shelves
        }
      } catch (err) {
        // Log error and set error message
        console.error('Error fetching shelves:', err);
        setError('An error occurred while fetching shelves.');
      }
    };

    fetchShelves(); // Call fetchShelves function
  }, []); // Empty dependency array to only run once on page load

  // Function to create a new shelf
  const handleCreateShelf = async (e) => {
    e.preventDefault(); // Prevent default (page refresh)

    try {
      // Send POST request to create shelf
      const res = await fetch('/api/shelves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ shelfName }),
      });
      const data = await res.json();

      // Check for errors
      if (data.error) {
        setError(data.error);
      } else {
        setShelves([...shelves, { shelf_id: data.shelfId, shelf_name: shelfName }]); // Add new shelf to shelves
        setShelfName(''); // Clear the input after creation
      }
    } catch (err) {
      // Log error and set error message
      console.error('Error creating shelf:', err);
      setError('An error occurred while creating shelf.');
    }
  };

  return (
    <div className="min-h-screen w-11/12 mx-auto">
      <h1>Your Library</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleCreateShelf}>
        <input
          type="text"
          value={shelfName}
          onChange={(e) => setShelfName(e.target.value)}
          placeholder="New shelf name"
          required
        />
        <button type="submit">Create Shelf</button>
      </form>
      <ul>
        {shelves.map((shelf) => (
          <li key={shelf.shelf_id}>
            <a href={`/library/shelf/${shelf.shelf_id}/${shelf.shelf_name}`}>{shelf.shelf_name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
