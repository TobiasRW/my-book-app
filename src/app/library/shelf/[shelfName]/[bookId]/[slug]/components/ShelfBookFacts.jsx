import { FaBookOpen, FaStar, FaThumbsUp, FaBarcode } from "react-icons/fa6";
import { IoPencilOutline } from "react-icons/io5";
import { LiaGlobeEuropeSolid } from "react-icons/lia";

export default function ShelfBookFacts({ book }) {
  return (
    <div className="flex flex-col gap-4 border-t border-lightgray py-4">
      <div className="mx-auto flex w-10/12 justify-between text-darkgray dark:text-offwhite">
        <div className="flex items-center justify-center gap-4">
          <FaBookOpen />
          <p>Pages</p>
        </div>
        <p>{book.pageCount}</p>
      </div>
      <div className="mx-auto flex w-10/12 justify-between text-darkgray dark:text-offwhite">
        <div className="flex items-center justify-center gap-4">
          <IoPencilOutline />
          <p>Released</p>
        </div>
        <p>{book.publishDate}</p>
      </div>
      <div className="mx-auto flex w-10/12 justify-between gap-5 text-darkgray dark:text-offwhite">
        <div className="flex items-center justify-center gap-4">
          <LiaGlobeEuropeSolid />
          <p>Publisher</p>
        </div>
        <p className="truncate">{book.publisher}</p>
      </div>
      <div className="mx-auto flex w-10/12 justify-between text-darkgray dark:text-offwhite">
        <div className="flex items-center justify-center gap-4">
          <FaBarcode />
          <p>ISBN</p>
        </div>
        <p>{book.isbn}</p>
      </div>
    </div>
  );
}
