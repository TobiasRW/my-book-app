import { FaBookOpen, FaStar, FaThumbsUp, FaBarcode } from "react-icons/fa6";
import { IoPencilOutline } from "react-icons/io5";
import { LiaGlobeEuropeSolid } from "react-icons/lia";

export default function ShelfBookFacts({ book }) {
    return (
        <div className=" border-t border-lightgray flex flex-col gap-4 py-4">
            <div className="flex justify-between w-10/12 mx-auto text-darkgray dark:text-offwhite">
                <div className="flex gap-4 justify-center items-center">
                    <FaBookOpen  />
                    <p>Pages</p>
                </div>
                <p>{book.pageCount}</p>
            </div>
            <div className="flex justify-between w-10/12 mx-auto text-darkgray dark:text-offwhite">
                <div className="flex gap-4 justify-center items-center">
                    <IoPencilOutline  />
                    <p>Released</p>
                </div>
                <p>{book.publishDate}</p>
            </div>
            <div className="flex justify-between w-10/12 mx-auto gap-5 text-darkgray dark:text-offwhite">
                <div className="flex gap-4 justify-center items-center">
                    <LiaGlobeEuropeSolid  />
                    <p>Publisher</p>
                </div>
                <p className="truncate">{book.publisher}</p>
            </div>
            <div className="flex justify-between w-10/12 mx-auto text-darkgray dark:text-offwhite">
                <div className="flex gap-4 justify-center items-center">
                    <FaBarcode />
                    <p>ISBN</p>
                </div>
                <p>{book.isbn}</p>
            </div>
        </div>
    )
}