export default function Button(props) {

    function btnType() {
        if (props.btnType === "primary") {
            return "text-darkgray text-base bg-offwhite font-bold font-satoshi rounded-lg px-5 py-2.5 mb-2 w-11/12";
        }
    }

    return (
        <>
            <button className={` flex justify-center items-center ${btnType()}`} onClick={props.click}>
                {props.content}
            </button>
        </>
    )
}