"use client";

export default function ReccomendedBook({ coverID, title }) {
  const defaultCover = "/assets/img/default-cover.webp"; // Default cover image path

  return (
    <>
      <img
        src={coverID || defaultCover} // Google Books cover URL or default cover
        alt={title}
        className=" rounded-md aspect-[2/3] object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultCover; // Fallback to default cover
        }}
      />
    </>
  );
}
