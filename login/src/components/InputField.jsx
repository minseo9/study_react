const InputField = ({
    label,
    name,
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    className,
    ref,
}) => {
    const checkOverlap = () => {};

    return (
        <div className={`input-${id}`}>
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                name={name}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={className}
                ref={ref}
            />
            {id === "id" ? (
                <button className="check-overlap-button" onClick={checkOverlap}>
                    중복확인
                </button>
            ) : null}
        </div>
    );
};

export default InputField;
