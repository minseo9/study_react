const InputField = ({
    label,
    name,
    id,
    type = "text",
    placeholder,
    value,
    onChange,
    className,
}) => {
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
            />
            {id === "id" ? (
                <button className="check-overlap-button">중복확인</button>
            ) : null}
        </div>
    );
};

export default InputField;
