const InputSelect = ({
    name,
    id,
    className,
    value,
    onChange,
    text,
    optionValue,
}) => {
    return (
        <select
            name={name}
            id={id}
            className={className}
            value={value}
            onChange={onChange}
        >
            <option value="">{text}</option>
            {optionValue.map((value) => (
                <option key={value} value={value}>
                    {value}
                </option>
            ))}
        </select>
    );
};

export default InputSelect;
