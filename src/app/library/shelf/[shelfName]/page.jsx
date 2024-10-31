import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import createConnection from '../../../lib/db';
import ClientShelfPage from './components/ClientShelfPage';

// Server-side component to render the shelf page and get shelf data
export default async function ShelfPage({ params }) {
  const { shelfName } = params;
  let connection;

  try {
    // Retrieve the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get('token')?.value;

    // If no token is found, render an error message or redirect
    if (!token) {
      return <p>You must be logged in to view this page.</p>;
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;

    // Create a database connection
    connection = await createConnection();

    // Fetch the shelf data
    const [shelves] = await connection.query(
      'SELECT PK_ID AS shelf_id, shelf_name FROM book_shelves WHERE shelf_name = ? AND user_id = ?',
      [shelfName, userId]
    );

    if (shelves.length === 0) {
      // Shelf not found or does not belong to user
      return <p>Shelf not found.</p>;
    }

    const shelf = shelves[0];

    // Fetch books in the shelf using a stored procedure
    const [booksRows] = await connection.query(
      'CALL GetShelfBookRatingAndStatus(?, ?)',
      [userId, shelf.shelf_id]
    );

    const booksDataRaw = booksRows[0]; // Extract data from the result set

    // Fetch book details from Google Books API
    const booksData = await Promise.all(
      booksDataRaw.map(async (book) => {
        const response = await fetch(
          `https://www.googleapis.com/books/v1/volumes/${book.book_id}`
        );
        const bookData = await response.json();

        // Extract relevant data from the API response
        return {
          id: bookData.id,
          title: bookData.volumeInfo.title || 'No Title',
          author: bookData.volumeInfo.authors?.join(', ') || 'Unknown Author',
          coverID:
            bookData.volumeInfo.imageLinks?.thumbnail || '/placeholder.png',
          rating: book.rating,
          status: book.status, // Status (category) for books in library if needed
        };
      })
    );

    // Pass the data to the client component
    return (
      <div className="mx-auto min-h-[100vh] w-11/12">
        <h1 className="mt-8 text-3xl font-bold">{shelf.shelf_name}</h1>
        <ClientShelfPage books={booksData} shelfName={shelf.shelf_name} />
      </div>
    );
  } catch (error) {
    console.error('Error loading shelf:', error);
    return <p>Error loading shelf.</p>;
  } finally {
    if (connection) await connection.end();
  }
}