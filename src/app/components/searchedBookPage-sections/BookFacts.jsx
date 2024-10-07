import { FaBookOpen, FaStar, FaThumbsUp, FaBarcode } from "react-icons/fa6";
import { IoPencilOutline } from "react-icons/io5";
import { LiaGlobeEuropeSolid } from "react-icons/lia";

export default function BookFacts({ book }) {
    return (
        <div className=" border-t border-lightgray flex flex-col gap-4 py-4">
            <div className="flex justify-between w-10/12 mx-auto">
                <div className="flex gap-4 justify-center items-center">
                    <FaThumbsUp color='lightgray' />
                    <p>Rating</p>
                </div>
                <p className='flex justify-center items-center gap-1'><FaStar color="white" /> {book.rating}</p>
            </div>
            <div className="flex justify-between w-10/12 mx-auto">
                <div className="flex gap-4 justify-center items-center">
                    <FaBookOpen color='lightgray' />
                    <p>Pages</p>
                </div>
                <p>{book.pageCount}</p>
            </div>
            <div className="flex justify-between w-10/12 mx-auto">
                <div className="flex gap-4 justify-center items-center">
                    <IoPencilOutline color='lightgray' />
                    <p>Released</p>
                </div>
                <p>{book.publishDate}</p>
            </div>
            <div className="flex justify-between w-10/12 mx-auto gap-5">
                <div className="flex gap-4 justify-center items-center">
                    <LiaGlobeEuropeSolid color='lightgray' />
                    <p>Publisher</p>
                </div>
                <p className="truncate">{book.publisher}</p>
            </div>
            <div className="flex justify-between w-10/12 mx-auto">
                <div className="flex gap-4 justify-center items-center">
                    <FaBarcode color='lightgray' />
                    <p>ISBN</p>
                </div>
                <p>{book.isbn}</p>
            </div>
        </div>
    )
}