import Back from '@/app/components/navs/Back';
import Button from '@/app/components/navs/Button';
import ReadMoreLess from '@/app/book/[id]/[slug]/components/ReadMoreLess';
import BookFacts from '@/app/book/[id]/[slug]/components/BookFacts';
import Link from 'next/link';
import React from 'react';
import sharp from 'sharp';
import MoreBooks from '@/app/book/[id]/[slug]/components/MoreBooks'; // Import the new component

export default async function BookDetailPage({ params }) {
    const { id } = params;

    let book = null;
    let error = '';
    let averageColor = '#2a4b9a'; // Default background color

    let avgR = 42; 
    let avgG = 75;
    let avgB = 154;

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
            id: data.id,
            title: data.volumeInfo.title || 'No Title',
            author: data.volumeInfo.authors?.join(', ') || 'Unknown Author',
            pageCount: data.volumeInfo.pageCount || 'N/A',
            publishDate: data.volumeInfo.publishedDate || 'N/A',
            publisher: data.volumeInfo.publisher?.replace('Publishing', '') || 'N/A',
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
                avgR = Math.round(totalR / count);
                avgG = Math.round(totalG / count);
                avgB = Math.round(totalB / count);
                averageColor = `rgb(${avgR}, ${avgG}, ${avgB})`;
            }

            // format publish date to year only
            if (book.publishDate.length > 4) {
                book.publishDate = book.publishDate.slice(0, 4);
            }

            //remove word 'publishing' from publisher
            if (book.publisher.includes('Publishing')) {
                book.publisher = book.publisher.replace('Publishing', '');
            }
        }

    } catch (err) {
        console.error('Error fetching book details:', err);
        error = 'An error occurred while fetching the book details. Please try again later.';
    }

    // Format the description by replacing HTML tags 
    const formattedDescription = book?.description
        .replace(/<\/?p>/g, '\n\n')  // Replace <p> and </p> with two line breaks
        .replace(/<\/?br>/g, '\n')    // Replace <br> with a line break
        .replace(/<\/?[^>]+(>|$)/g, ""); // Remove any other remaining HTML tags

    // Extract primary author
    const primaryAuthor = book?.author.split(',')[0].trim();

    return (
        <div className="min-h-screen pb-32">
            {error && (
                <div className="max-w-md w-11/12 mx-auto bg-red-500 text-white text-sm text-center p-4 rounded mt-10">
                    {error}
                </div>
            )}
            <Back color={averageColor} />
            <section
                className='flex flex-col items-center justify-center gap-2 pt-20 pb-10'
                style={{
                    background: `linear-gradient(to bottom, ${averageColor} 70%, rgba(${avgR + 30}, ${avgG + 30}, ${avgB + 30}, 1) 100%)`
                }}
            >
                <img
                    src={book?.coverID || defaultCover}
                    className="w-2/6 rounded-md aspect-[2/3] object-cover drop-shadow-xl"
                    alt={`${book?.title} cover`}
                />

                <div className="text-center">
                    <h1 className='text-2xl font-bold text-white'>{book?.title}</h1>
                    <p className='text-base mb-1 text-offwhite/60'>{book?.author}</p>
                </div>

                <Button content="+ Add to library" btnType="primary" />
            </section>
            <section className='rounded-t-[1.75rem] w-full -mt-5 bg-background'>
                <div className="w-10/12 mx-auto pt-10 flex flex-col gap-4">
                    <h2 className='font-bold text-lg truncate'>About: {book?.title}</h2>
                    <div className="bg-offwhite drop-shadow-xl dark:drop-shadow-none dark:bg-darkgray rounded-2xl">
                        <ReadMoreLess text={formattedDescription} />
                        <BookFacts book={book} />
                    </div>
                    <MoreBooks primaryAuthor={primaryAuthor} currentBookId={book.id} currentTitle={book.title} />
                </div>
            </section>
            <Link href={`https://www.amazon.com/s?k=${book.title + ' ' + primaryAuthor}`}
                target="_blank"
                rel="noreferrer"
                className='flex justify-center items-center mt-2'
            >
                <Button content="Buy on Amazon" btnType="secondary" />
            </Link>
        </div>
    );
}
