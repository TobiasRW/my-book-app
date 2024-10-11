export default function InputField(props) {

    function inputType() {
        if (props.inputType === "primary") {
            return "block w-full font-light font-satoshi text-offwhite rounded py-3 px-3 border-0 bg-background ring-1 ring-inset ring-lightgray dark:ring-darkgray focus:ring-lightgray outline-none placeholder:text-textgray placeholder:italic mb-4";
        } 
    }

    return (
        <>
            <label htmlFor={props.labelFor} className="font-light font-satoshi">{props.label}</label>
            <div className="mt-2">
                <input type={props.type} name={props.name} required placeholder={props.placeholder} className={inputType()} />
            </div>
        </>
    )
}