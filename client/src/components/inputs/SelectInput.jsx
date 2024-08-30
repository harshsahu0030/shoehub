import propTypes from "prop-types";

const SelectInput = ({
  id,
  label,
  type,
  name,
  value,
  onChange,
  error,
  options,
  occasion,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-lightGray">
        {label && label}
      </label>
      <div className="relative flex items-center">
        <select
          type={type && type}
          id={id && id}
          name={name && name}
          className="bg-transparent outline-none border-2 border-lightGray focus:border-blue text-base rounded-lg w-full p-2"
          value={value && value}
          onChange={onChange && onChange}
        >
          {!occasion === "cart" && <option value="">Select {name}</option>}

          {options?.map((item, i) => (
            <option key={i} className="capitalize" value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <span className="text-sm text-red-400 font-medium">{error}</span>
      )}
    </div>
  );
};

SelectInput.propTypes = {
  id: propTypes.string,
  label: propTypes.string,
  type: propTypes.string,
  name: propTypes.string,
  value: propTypes.string,
  occasion: propTypes.string,
  onChange: propTypes.func,
  error: propTypes.string,
  options: propTypes.array,
};

export default SelectInput;
