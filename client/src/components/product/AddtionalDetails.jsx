import propTypes from "prop-types";
import parse from "html-react-parser";
import { useMemo, useState } from "react";
import { productDetailsTitle } from "../../data/product";

const AddtionalDetails = ({ product }) => {
  const { description, features } = product;

  //state
  const [currentShow, setCurrentShow] = useState("");

  //function
  const onChangeHandler = (item) => {
    setCurrentShow(item);
  };

  useMemo(() => {
    if (productDetailsTitle && currentShow === "") {
      setCurrentShow(() => productDetailsTitle[0]);
    }
  }, [currentShow]);

  return (
    <div className="container flex flex-col gap-5">
      {/* //heading  */}
      <div className="container text-sm md:text-lg text-center font-bold capitalize flex">
        {productDetailsTitle?.map((item, i) => (
          <h3
            key={i}
            className={`flex-1 py-2 px-1 md:py-4 border-b-2 border-lightGray/40 cursor-pointer hover:border-black ${
              currentShow === item && "border-black bg-blue text-white"
            }`}
            onClick={() => onChangeHandler(item)}
          >
            {item}
          </h3>
        ))}
      </div>

      <div>
        {currentShow === productDetailsTitle[0] && (
          <div className="flex flex-col gap-1">{parse(description)}</div>
        )}
        {currentShow === productDetailsTitle[1] && (
          <table className="container border-collapse border border-slate-500">
            <thead>
              <tr>
                <td className="font-bold text-lg border border-slate-700 py-2 px-3">
                  KEYWORD
                </td>
                <td className="font-bold text-lg border border-slate-700 py-2 px-3">
                  VALUE
                </td>
              </tr>
            </thead>
            <tbody>
              {features &&
                features.map((item, i) => (
                  <tr key={i}>
                    <td className="text-base font-medium capitalize border border-slate-700 py-2 px-3">
                      {item.key}
                    </td>
                    <td className="text-base font-medium capitalize border border-slate-700 py-2 px-3">
                      {item.value}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

AddtionalDetails.propTypes = {
  product: propTypes.object,
};

export default AddtionalDetails;
