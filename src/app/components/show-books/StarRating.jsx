import React from "react";

export default function StarRating({ rating }) {
  const stars = [];

  const fullStar = "/assets/svg/star-solid.svg";
  const halfStar = "/assets/svg/star-half-solid.svg";
  const emptyStar = "/assets/svg/empty-star.svg";

  // for (let i = 0; i < 5; i++) {
  //   if (i < Math.floor(rating)) {
  //     // Full stars for values less than the floored rating
  //     stars.push(
  //       <img key={i} src={fullStar} className="w-4" alt="Full Star" />
  //     );
  //   } else if (i === Math.floor(rating) && rating % 1 !== 0) {
  //     // Half star for fractional values (if there's a decimal in the rating)
  //     stars.push(
  //       <img key={i} src={halfStar} className="w-4" alt="Half Star" />
  //     );
  //   } else {
  //     // Empty stars for the remaining slots
  //     stars.push(
  //       <img key={i} src={emptyStar} className="w-4" alt="Empty Star" />
  //     );
  //   }
  // }

  return <div className="flex gap-1">
    <p>{rating}</p>
    <img src={fullStar} className="w-4" alt="Full star" />
    </div>;
}
