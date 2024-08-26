import { useEffect, useState } from "react";
import Textarea from "../inputs/Textarea";
import { IoStarOutline, IoStarSharp } from "react-icons/io5";
import * as Yup from "yup";
import {
  addAndUpdateReviewProductApi,
  getProductsApi,
} from "../../app/api/productApi";
import toast from "react-hot-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { IoClose } from "react-icons/io5";
import propTypes from "prop-types";

const AddComment = ({ id, handleHide }) => {
  //states
  const [errors, setErrors] = useState({});
  const [commentForm, setCommentForm] = useState({
    rating: "",
    comment: "",
  });

  //errorHandling
  const validationSchema = Yup.object({
    rating: Yup.string().required("Rating is Required"),

    comment: Yup.string().required("Comment is required"),
  });

  //react quires
  //react-quries
  const { isError, error, refetch } = useQuery({
    queryKey: ["get-product"],
    queryFn: () => getProductsApi(id),
    refetchOnWindowFocus: false,
    enabled: false,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addAndUpdateReviewProductApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      handleHide();
      refetch();
    },
  });

  //functions
  const handleChange = (event) => {
    setCommentForm({
      ...commentForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(commentForm, { abortEarly: false });
      mutate({ commentForm, id });

      // console.log(commentForm);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
      setTimeout(() => {
        setErrors({});
      }, 5000);
    }
  };

  //useEffect
  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
  }, [isError, error]);

  return (
    <form
      className="flex flex-col gap-5  w-[40%] bg-white rounded-lg p-10"
      onSubmit={handleSubmit}
    >
      <div className="flex justify-between">
        <div className="flex flex-col pb-2 border-b">
          <h3 className="text-2xl font-semibold">Add Comment</h3>
          <p className="text-sm font-medium text-gray">
            Your review is valuable to imporove our product quality and service
          </p>
        </div>
        <IoClose
          className="text-3xl cursor-pointer hover:scale-110 transition-all"
          onClick={() => handleHide()}
        />
      </div>

      <div className="flex gap-1 text-4xl">
        {[...Array(5)].map((_, index) => {
          return index >= commentForm.rating ? (
            <IoStarOutline
              key={index}
              className="cursor-pointer"
              onClick={() =>
                setCommentForm({ ...commentForm, rating: index + 1 })
              }
            />
          ) : (
            <IoStarSharp
              key={index}
              className="text-blue cursor-pointer"
              onClick={() =>
                setCommentForm({ ...commentForm, rating: index + 1 })
              }
            />
          );
        })}
      </div>
      {errors.rating && (
        <span className="text-sm text-red-400 font-medium">
          {errors.rating}
        </span>
      )}

      <Textarea
        id={"review-comment"}
        label={"Your Message"}
        type={"text"}
        name={"comment"}
        placeholder="Enter your message here..."
        value={commentForm.comment}
        onChange={handleChange}
        error={errors.comment}
      />

      <button
        type="submit"
        className="text-white font-semibold w-full py-2 bg-blue rounded-lg hover:bg-blue/80"
        disabled={isPending}
      >
        Submit
      </button>
    </form>
  );
};

AddComment.propTypes = {
  id: propTypes.string,
  handleHide: propTypes.func,
};

export default AddComment;
