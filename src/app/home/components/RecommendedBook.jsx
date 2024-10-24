"use client";

export default function RecommendedBook({ coverID, title }) {
  const defaultCover = "/assets/img/default-cover.webp"; // Default cover image path

  return (
    <div className="flex-shrink-0">
      <img
        src={coverID || defaultCover} // Google Books cover URL or default cover
        alt={title}
        className="aspect-[2/3] rounded-md object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = defaultCover; // Fallback to default cover
        }}
      />
      {/* <p className="text-base mt-2 text-textgray">{title}</p> */}
    </div>
  );
}
