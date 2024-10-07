import Back from '@/app/components/navs/Back';
import Button from '@/app/components/navs/Button';
import React from 'react';
import sharp from 'sharp';

export default async function BookDetailPage({ params }) {
    const { id } = params;

    let book = null;
    let error = '';
    let averageColor = '#2a4b9a'; // Default background color

    const defaultCover = "/assets/img/default-cover.webp"; // Default cover image path

    const API_KEY = process.env.GOOGLE_API_KEY;

    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}?key=${API_KEY}`);

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch book details');
        }

        // Parse the response JSON data
        const data = await response.json();

        // Create a book object with the required details
        book = {
            title: data.volumeInfo.title || 'No Title',
            author: data.volumeInfo.authors?.join(', ') || 'Unknown Author',
            pageCount: data.volumeInfo.pageCount || 'N/A',
            publishDate: data.volumeInfo.publishedDate || 'N/A',
            isbn: data.volumeInfo.industryIdentifiers?.[0]?.identifier || 'N/A',
            coverID: data.volumeInfo.imageLinks?.thumbnail,
            rating: data.volumeInfo.averageRating || 'No Rating',
            description: data.volumeInfo.description || 'No Description Available',
        };

        // Fetch and process the cover image to get the average color
        if (book.coverID) {
            const imageResponse = await fetch(book.coverID); // Fetch the cover image

            // Check if the response is successful
            if (!imageResponse.ok) {
                throw new Error('Failed to fetch cover image');
            }

            // Convert the image response to an ArrayBuffer
            const imageBuffer = await imageResponse.arrayBuffer();

            // Resize the image to 50x50 pixels and extract the raw pixel data
            const image = sharp(Buffer.from(imageBuffer)).resize(50, 50, { fit: 'inside' });
            const { data: rawData, info } = await image
                .raw()
                .toBuffer({ resolveWithObject: true });

            // Proess pixel data to get the average color
            let totalR = 0;
            let totalG = 0;
            let totalB = 0;
            let count = 0;

            for (let i = 0; i < rawData.length; i += info.channels) {
                const r = rawData[i];
                const g = rawData[i + 1];
                const b = rawData[i + 2];

                // Exclude pixels that are close to white or black
                if (
                    !(r > 240 && g > 240 && b > 240) && // Exclude white pixels
                    !(r < 15 && g < 15 && b < 15)      // Exclude black pixels
                ) {
                    totalR += r;
                    totalG += g;
                    totalB += b;
                    count++;
                }
            }

            // Calculate the average color
            if (count > 0) {
                const avgR = Math.round(totalR / count);
                const avgG = Math.round(totalG / count);
                const avgB = Math.round(totalB / count);
                averageColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
            }
        }
    } catch (err) {
        console.error('Error fetching book details:', err);
        error = 'An error occurred while fetching the book details. Please try again later.';
    }

    return (
        <div className="min-h-screen">
            {error && (
                <div className="max-w-md w-11/12 mx-auto bg-red-500 text-white text-sm text-center p-4 rounded mt-10">
                    {error}
                </div>
            )}
            <Back />
            <section
                className='flex flex-col items-center justify-center gap-2 pt-20 pb-10'
                style={{ backgroundColor: averageColor }}
            >
                <img
                    src={book.coverID || defaultCover}
                    className="w-2/6 rounded-md aspect-[2/3] object-cover drop-shadow-xl"
                    alt={`${book.title} cover`}
                />

                <div className="text-center">
                    <h1 className='text-2xl font-bold text-white'>{book.title}</h1>
                    <p className='text-base mb-1 text-offwhite/60'>{book.author}</p>
                </div>

                <Button content="+ Add to library" btnType="primary" />
            </section>
        </div>
    );
}
