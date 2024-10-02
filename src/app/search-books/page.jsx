// Render page dynamically
export const dynamic = 'force-dynamic';

import React from 'react';
import SearchBar from '../components/SearchBar';
import BookList from '../components/show-books/BookList';

export default async function SearchBooksPage({ searchParams }) {
  // Initialize variables
  const query = searchParams.q || ''; // Get q parameter (query) from searchParams
  const author = searchParams.author || ''; // Get author parameter from searchParams
  let books = []; // Empty array to store books fetched from API
  let error = ''; // Empty string to store error messages

  if (query) { // If query is not empty
    try {
      const API_KEY = process.env.GOOGLE_API_KEY;
      let searchQuery;

      // If query is an ISBN number, search by ISBN. Otherwise, search by title and optionally the author.
      const isbnRegex = /^(?:\d{10}|\d{13})$/; // Check if query is an ISBN number (10 or 13 digits)
      if (isbnRegex.test(query)) {
        searchQuery = `isbn:${encodeURIComponent(query)}`;
      } else {
        searchQuery = `intitle:${encodeURIComponent(query)}`;
        if (author) {
          searchQuery += `+inauthor:${encodeURIComponent(author)}`;
        }
      }

      // Request books from Google Books API based on search query and API key.
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${API_KEY}&maxResults=10&orderBy=relevance`
      );
      
      // Parse the response JSON data
      const data = await response.json();

      // Check if item array is present and not empty.
      if (!data.items || data.items.length === 0) { // If not present or empty, set error message.
        error = 'No books found.';
      } else { // Else map over each item to create a simplified book object.
        books = data.items.map((item) => ({
          title: item.volumeInfo.title || 'No Title', // Get title 
          author: item.volumeInfo.authors?.join(', ') || 'Unknown Author', // Get author(s) 
          pageCount: item.volumeInfo.pageCount || 'N/A', // Get page count
          publishDate: item.volumeInfo.publishedDate || 'N/A', // Get publication date
          isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A', // Get ISBN
          coverID: item.volumeInfo.imageLinks?.thumbnail, // Get cover image
          rating: item.volumeInfo.averageRating || 'No Rating', // Get rating
        }));
      }
    } catch (err) { // Error handling
      console.error('Error fetching books:', err);
      error = 'An error occurred while fetching books. Please try again later.';
    }
  }

  return (
    <div className="min-h-screen">
      <SearchBar initialQuery={query} initialAuthor={author} />
      {error && (
        <div className="max-w-md w-11/12 mx-auto bg-red-500 text-white text-sm text-center p-4 rounded mt-10">
          {error}
        </div>
      )}
      {books.length > 0 && <BookList books={books} />}
    </div>
  );
}
