import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import createConnection from '../../lib/db';
import ClientLibraryCategoryPage from './components/ClientLibraryCategoryPage';
import Back from '@/app/components/navs/Back';

// Revalidate on every request
export const revalidate = 0;

// Server-side function to fetch books from the database
export default async function LibraryCategoryPage({ params }) {

  // Default cover image
  const defaultCover = '/assets/img/default-cover.webp';

  const { status } = params; // Get the status from the URL

  // Initialize variables
  let connection;
  let books = [];
  let error = '';
  let categoryName = '';

  try {
    // Retrieve the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    // If no token is found, render an error message
    if (!token) {
      return (
            <p className="text-red-500">You must be logged in to view this page.</p>
      );
    }

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Create a connection to the database
    connection = await createConnection();

    // Decode and set the category name based on status
    const decodedStatus = decodeURIComponent(status);

    let queryParam = '';
    switch (decodedStatus) {
      case 'all':
        categoryName = 'Library';
        break;
      case 'currently-reading':
        categoryName = 'Currently Reading';
        queryParam = 'currently-reading';
        break;
      case 'to-read':
        categoryName = 'To Read';
        queryParam = 'to-read';
        break;
      case 'finished':
        categoryName = 'Finished';
        queryParam = 'finished';
        break;
      case 'dnf':
        categoryName = 'Did Not Finish';
        queryParam = 'dnf';
        break;
      case 'wishlist':
        categoryName = 'Wishlist';
        queryParam = 'wishlist';
        break;
      default:
        categoryName = 'Library';
    }

    // Build the SQL query
    let query = 'SELECT book_id, status, rating FROM user_books WHERE user_id = ?';
    let paramsArray = [userId];

    // Add status filter if not 'all'
    if (queryParam && queryParam !== 'all') {
      query += ' AND status = ?';
      paramsArray.push(queryParam);
    }

    // Execute the query
    const [booksRows] = await connection.query(query, paramsArray);

    // Fetch book details from Google Books API
    books = await Promise.all(
      booksRows.map(async (book) => {
        try {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${book.book_id}`,
          );
          const data = await response.json();
          return {
            id: data.id,
            title: data.volumeInfo.title || 'No Title',
            author: data.volumeInfo.authors?.join(', ') || 'Unknown Author',
            coverID: data.volumeInfo.imageLinks?.thumbnail || defaultCover,
            rating: book.rating,
            status: book.status,
          };
        } catch (err) {
          console.error('Error fetching book details:', err);
          return null;
        }
      })
    );

  } catch (err) {
    console.error('Error fetching books:', err);
    error = 'An error occurred while fetching books.';
  } finally {
    if (connection) await connection.end();
  }

  // Pass data to the client component
  return (
    <>
      <Back />
      <ClientLibraryCategoryPage
        books={books}
        error={error}
        categoryName={categoryName}
        status={status}
      />
    </>
  );
}
