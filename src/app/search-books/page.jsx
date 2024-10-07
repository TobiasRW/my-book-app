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
        `https://www.googleapis.com/books/v1/volumes?q=${searchQuery}&key=${API_KEY}&maxResults=10&orderBy=relevance&langRestrict=en&printType=books`
      );
      
      // Parse the response JSON data
      const data = await response.json();

      // Check if item array is present and not empty.
      if (!data.items || data.items.length === 0) { // If not present or empty, set error message.
        error = 'No books found.';
      } else { 
        // Filter out items without authors or page count
        const filteredItems = data.items.filter((item) => {
          const authorsExist = item.volumeInfo.authors && item.volumeInfo.authors.length > 0;
          const pageCountExists = item.volumeInfo.pageCount && item.volumeInfo.pageCount > 0;
          return authorsExist && pageCountExists;
        });

        if (filteredItems.length === 0) {
          error = 'No books found with known authors and page counts.';
        } else {
          // Map over the filtered items to create simplified book objects
          books = filteredItems.map((item) => ({
            id: item.id, // Get book ID
            title: item.volumeInfo.title || 'No Title', // Get title 
            author: item.volumeInfo.authors.join(', '), // Get author(s) 
            pageCount: item.volumeInfo.pageCount, // Get page count
            publishDate: item.volumeInfo.publishedDate || 'N/A', // Get publication date
            isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A', // Get ISBN
            coverID: item.volumeInfo.imageLinks?.thumbnail, // Get cover image
            rating: item.volumeInfo.averageRating || 'No Rating', // Get rating
          }));

           // Remove duplicates based on ISBN
          const seenIsbns = new Set();
          books = books.filter((book) => {
            if (book.isbn === 'N/A') {
              return true; // Keep books without ISBN
            }
            if (seenIsbns.has(book.isbn)) {
              return false; // Duplicate ISBN found, exclude this book
            } else {
              seenIsbns.add(book.isbn);
              return true; // First occurrence, include this book
            }
          });

          // Sort books by exact title match first
          books.sort((a, b) => {
            const queryLower = query.toLowerCase();
            const titleA = a.title.toLowerCase();
            const titleB = b.title.toLowerCase();
      
            const isExactMatchA = titleA === queryLower;
            const isExactMatchB = titleB === queryLower;
      
            if (isExactMatchA && !isExactMatchB) return -1;
            if (!isExactMatchA && isExactMatchB) return 1;
            return 0;
          });

        }
      }
    } catch (err) { // Error handling
      console.error('Error fetching books:', err);
      error = 'An error occurred while fetching books. Please try again later.';
    }
  }

  return (
    <div className="min-h-screen w-11/12 mx-auto">
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
