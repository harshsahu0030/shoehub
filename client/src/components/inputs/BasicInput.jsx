import { createElement, useRef } from "react";
import propTypes from "prop-types";

const BasicInput = ({
  id,
  label,
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
}) => {
  //ref
  const inpurRef = useRef();

  //functions
  const handlePasswordLook = (typeValue) => {
    if (typeValue === "password") {
      inpurRef.current.setAttribute("type", "text");
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-semibold text-lightGray">
        {label}
      </label>
      <div className="relative flex items-center">
        <div
          className="absolute inset-y-0 start-0 flex items-center p-3.5 cursor-pointer"
          onClick={() => handlePasswordLook(type)}
        >
          {createElement(icon)}
        </div>
        <input
          ref={inpurRef}
          type={type}
          id={id}
          name={name}
          className="bg-transparent outline-none border-2 border-lightGray focus:border-blue text-black text-base rounded-lg w-full pl-10 p-2"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete="off"
        ></input>
      </div>
      {error && (
        <span className="text-sm text-red-400 font-medium">{error}</span>
      )}
    </div>
  );
};

BasicInput.propTypes = {
  id: propTypes.string,
  label: propTypes.string,
  icon: propTypes.func,
  type: propTypes.string,
  name: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string,
  onChange: propTypes.func,
  error: propTypes.string,
};

export default BasicInput;
