import propTypes from "prop-types";

const NormalInput = ({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-lightGray">
        {label}
      </label>

      <input
        type={type}
        id={id}
        name={name}
        className="bg-transparent outline-none border-2 border-lightGray focus:border-blue text-black text-base rounded-lg w-full p-2"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
      ></input>
      {error && (
        <span className="text-sm text-red-400 font-medium">{error}</span>
      )}
    </div>
  );
};

NormalInput.propTypes = {
  id: propTypes.string,
  label: propTypes.string,
  type: propTypes.string,
  name: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  error: propTypes.string,
};

export default NormalInput;
