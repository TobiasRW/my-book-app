export default function Button(props) {

    function btnType() {
        if (props.btnType === "primary") {
            return "text-darkgray text-base bg-offwhite font-bold font-satoshi rounded-lg px-5 py-2.5 mb-2 w-10/12";
        } else if (props.btnType === "secondary") {
            return "text-darkgray dark:text-offwhite drop-shadow-xl text-base bg-offwhite dark:bg-darkgray font-bold font-satoshi rounded-lg px-5 py-2.5 mb-2 w-10/12";
        } else if (props.btnType === "third") {
            return "flex justify-center items-center bg-darkgray w-full dark:bg-offwhite text-offwhite dark:text-darkgray font-bold font-satoshi rounded px-5 py-2.5 mb-2 w-10/12";
        }
    }

    return (
        <>
            <button className={` flex justify-center items-center ${btnType()}`} onClick={props.click} type={props.type}>
                {props.content}
            </button>
        </>
    )
}