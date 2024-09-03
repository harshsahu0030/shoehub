import { useLayoutEffect, useState } from "react";
import useBackToTop from "../hook/useBackToTop";
import * as Yup from "yup";
import NormalInput from "../components/inputs/NormalInput";
import Textarea from "../components/inputs/Textarea";
import MetaData from "../utils/MetaData";

const Contact = () => {
  const backToTopHanlder = useBackToTop();

  //states
  const [errors, setErrors] = useState({});
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  //errorHandling
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "* Name must be at least 3 characters")
      .required("Username is Required"),

    email: Yup.string().required("Email is Required"),

    phone: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10)
      .required("A phone number is required"),

    message: Yup.string()
      .min(3, "* Message must be at least 15 characters")
      .required("Message is Required"),
  });

  //functons
  const handleChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(contactForm, { abortEarly: false });
      console.log(contactForm);
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  useLayoutEffect(() => {
    backToTopHanlder();
  }, [backToTopHanlder]);
  return (
    <>
      <MetaData
        title={"Shoehub | Contact"}
        description={"Contact page of shoehub"}
        keywords={"contact, issues, queries"}
      />
      <div className="h-full container flex justify-center items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 p-5 border border-lightGray rounded-lg mt-10 w-[90%] sm:w-[50%] lg:w-[40%] xl:w-[30%]"
        >
          <div className="flex flex-col gap-1">
            <h1 className="text-3xl font-semibold">Contact Us</h1>
            <h5 className="text-base font-semibold text-lightGray">
              Welcome to Shoehub
            </h5>
            <hr className="border-b-0 border-lightGray" />
          </div>

          <div className="flex flex-col gap-3">
            <NormalInput
              id={"contact-name"}
              label={"Your Name"}
              type={"text"}
              name={"name"}
              placeholder="example"
              value={contactForm.name}
              onChange={handleChange}
              error={errors.name}
            />

            <NormalInput
              id={"contact-email"}
              label={"Your Email"}
              type={"text"}
              name={"email"}
              placeholder="example01@gmail.com"
              value={contactForm.email}
              onChange={handleChange}
              error={errors.email}
            />

            <NormalInput
              id={"contact-phone"}
              label={"Your Phone"}
              type={"number"}
              name={"phone"}
              placeholder="9876543210"
              value={contactForm.phone}
              onChange={handleChange}
              error={errors.phone}
            />

            <Textarea
              id={"contact-message"}
              label={"Your Message"}
              type={"text"}
              name={"message"}
              placeholder="Enter your message here..."
              value={contactForm.message}
              onChange={handleChange}
              error={errors.message}
            />
          </div>

          <button
            type="submit"
            className="bg-blue text-white py-2 rounded-lg font-semibold transition-all ease-in-out duration-300 hover:bg-cyan"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
