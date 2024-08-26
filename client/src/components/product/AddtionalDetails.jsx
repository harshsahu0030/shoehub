import propTypes from "prop-types";
import parse from "html-react-parser";
import { useMemo, useRef, useState } from "react";
import { productDetailsTitle } from "../../data/product";
import { IoStar } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import AddComment from "./AddComment";

const AddtionalDetails = ({ product }) => {
  const { description, features, reviews, _id } = product;

  //state
  const [currentShow, setCurrentShow] = useState("");

  // ref
  const toggleCommentBoxRef = useRef(false);

  //function
  const onChangeHandler = (item) => {
    setCurrentShow(item);
  };

  const toggleCommentBoxHandler = (value) => {
    if (value === "show") {
      toggleCommentBoxRef.current.style.visibility = "visible";
      toggleCommentBoxRef.current.style.opacity = "1";
    } else {
      toggleCommentBoxRef.current.style.visibility = "hidden";
      toggleCommentBoxRef.current.style.opacity = "0";
    }
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

        {currentShow === productDetailsTitle[2] && (
          <div className="flex flex-col gap-4">
            <button
              className="w-fit py-2 px-5 text-md font-semibold border rounded-lg bg-blue text-white hover:bg-blue/90 transition-all self-end"
              onClick={() => toggleCommentBoxHandler("show")}
            >
              +Add New Comment
            </button>

            {/* comment box */}
            <div
              ref={toggleCommentBoxRef}
              className="fixed h-[100vh] w-full bg-lightGray/80 top-0 left-0 z-50 flex items-center justify-center opacity-0 invisible transition-all ease-in-out duration-500"
            >
              <AddComment id={_id} handleHide={toggleCommentBoxHandler} />
            </div>

            <hr className="border-b border-lightGray/30" />

            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {reviews
                ? reviews.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between items-center p-3 border rounded-lg text-sm "
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-semibold text-gray flex items-center gap-1">
                          <FaUserCircle /> {item.name}
                        </span>
                        <span className="font-semibold">{item.comment}</span>
                      </div>
                      <div className="flex items-center w-fit h-fit py-1 px-2 gap-1 rounded-lg bg-blue text-white font-semibold">
                        <IoStar /> {item.rating}
                      </div>
                    </div>
                  ))
                : ""}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

AddtionalDetails.propTypes = {
  product: propTypes.object,
};

export default AddtionalDetails;
