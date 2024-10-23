import React from 'react';
import Link from 'next/link';

export default function ShelfBookCard({ book, shelfName }) {

    // Slugify function
    const generateSlug = (title) => {
        return title
            .toLowerCase() // Convert to lowercase
            .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
            .replace(/(^-|-$)/g, ''); // Remove leading or trailing hyphens
    };

    const slug = generateSlug(book.title);

    return (
        <Link href={`/library/shelf/${encodeURIComponent(shelfName)}/${encodeURIComponent(book.id)}/${slug}`}>
            <div className="flex">
                <div className="flex items-center gap-4 w-full">
                    <img
                        src={book.coverID}
                        alt={book.title}
                        className="w-16 rounded-lg aspect-[2/3] object-cover"
                    />
                    <div className=" h-full w-full">
                        <div className="flex flex-col justify-center h-full border-b border-darkgray">
                            <p className="font-semibold text-textgray">{book.title}</p>
                            <p className="text-lightgray font-semibold">{book.author}</p>
                        </div>
                            
                    </div>
                </div>
            </div>
        </Link>
    )
}