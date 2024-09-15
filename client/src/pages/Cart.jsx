import {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useBackToTop from "../hook/useBackToTop";
import MetaData from "../utils/MetaData";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserCartApi } from "../app/api/userApi";
import CartProductCard from "../components/cards/CartProductCard";
import CartSubTotal from "../components/CartSubTotal";
import toast from "react-hot-toast";
import AddressForm from "../components/AddressForm";
import * as Yup from "yup";
import Logo from "/logo.png";
import {
  checkoutOrderApi,
  createOrderApi,
  getRazorpayApiKeyApi,
} from "../app/api/orderApi";
import { AuthContext } from "../context/Authuser";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const backToTopHanlder = useBackToTop();
  const { currentUser, refetch: userRefetch } = useContext(AuthContext);
  const navigate = useNavigate();

  //states
  const [errors, setErrors] = useState({});
  const [shippingInfoForm, setShippingInfoForm] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
    phoneNo: "",
  });
  const [finalShippingInfoForm, setFinalShippingInfoForm] = useState({});

  //ref
  const shippingInfoRef = useRef();

  //errorHandling
  const validationSchema = Yup.object({
    address: Yup.string().required("Address is Required"),
    city: Yup.string().required("City is Required"),
    state: Yup.string().required("State is Required"),
    pincode: Yup.number()
      .typeError("That doesn't look like a pincode number")
      .positive("A phone number can't start with a minus")
      .min(6)
      .required("A pincode is required"),
    phoneNo: Yup.number()
      .typeError("That doesn't look like a phone number")
      .positive("A phone number can't start with a minus")
      .integer("A phone number can't include a decimal point")
      .min(10)
      .required("A phone number is required"),
  });

  //react-queries
  const {
    isError,
    data: cartData,
    error,
    isLoading: cartLoading,
    refetch,
  } = useQuery({
    queryKey: ["get-cart"],
    queryFn: getUserCartApi,
    refetchOnWindowFocus: false,
  });

  const {
    isError: razorpayKeyisError,
    data: razorpayKeyData,
    error: razorpayKeyError,
    isLoading: razorpayKeyisLoading,
  } = useQuery({
    queryKey: ["get-razorpay-key"],
    queryFn: getRazorpayApiKeyApi,
    refetchOnWindowFocus: false,
  });

  const { mutate: createOrderMutation } = useMutation({
    mutationFn: createOrderApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);
      userRefetch();
      navigate("/orders");
    },
  });

  const {
    mutate: checkoutMutation,
    isPending,
    data: checkoutData,
  } = useMutation({
    mutationFn: checkoutOrderApi,

    onError: (error) => {
      toast.error(error.response.data.message);
    },
    onSuccess: (data) => {
      toast.success(data.message);

      const options = {
        key: razorpayKeyData?.data?.key,
        amount: data?.data?.amount,
        currency: "INR",
        name: "Shoehub",
        description: "payment system",
        image: Logo,
        order_id: data?.data?.id,
        handler: function (response) {
          createOrderMutation({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
            address: finalShippingInfoForm,
          });
        },
        prefill: {
          name: currentUser?.username,
          email: currentUser?.email,
          contact: finalShippingInfoForm?.phoneNo,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    },
  });

  // functions
  const handleShippingInfoBox = (value) => {
    if (value === "show") {
      shippingInfoRef.current.style.opacity = 1;
      shippingInfoRef.current.style.visibility = "visible";
      document.body.style.overflow = "hidden";
    } else {
      shippingInfoRef.current.style.opacity = 0;
      shippingInfoRef.current.style.visibility = "hidden";
      document.body.style.overflow = "visible";
    }
  };

  const handleChange = (e) => {
    setShippingInfoForm({
      ...shippingInfoForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetShippingInfo = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(shippingInfoForm, { abortEarly: false });

      setFinalShippingInfoForm({
        ...shippingInfoForm,
      });
      handleShippingInfoBox();
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  const handlePlaceOrder = async () => {
    checkoutMutation({ amount: cartData.data.totalPrice });

    // const options = {
    //   key: razorpayKeyData?.data?.key,
    //   amount: checkoutData?.data?.amount,
    //   currency: "INR",
    //   order_id: checkoutData?.data?.id,
    //   callback_url: "http://localhost:4000/api/paymentverification",
    //   shippingInfo: finalShippingInfoForm,
    //   products: cartData?.data?.products,
    // };
  };

  //useEffect
  useEffect(() => {
    if (isError) {
      toast.error(error.response.data.message);
    }
    if (razorpayKeyisError) {
      toast.error(razorpayKeyError.response.data.message);
    }
  }, [isError, error, razorpayKeyError, razorpayKeyisError]);

  useLayoutEffect(() => {
    backToTopHanlder();
  }, []);
  return (
    <>
      <MetaData
        title={"Shoehub | Cart"}
        description={"Cart page of shoehub"}
        keywords={"user cart, cart products"}
      />
      <div className="flex flex-col gap-3 mt-10 w-full">
        <h1 className="text-3xl font-semibold">Your Cart</h1>

        <hr className="border-b-2 border-lightGray/50" />

        {/* address form  */}
        <div
          ref={shippingInfoRef}
          className="fixed top-0 left-0 opacity-0 invisible h-[100vh] w-[100%] bg-black/80 z-50 flex items-center justify-center transition-all ease-in-out duration-500"
        >
          <AddressForm
            shippingInfoForm={shippingInfoForm}
            setShippingInfoForm={setShippingInfoForm}
            handleShippingInfoBox={handleShippingInfoBox}
            handleChange={handleChange}
            handleSetShippingInfo={handleSetShippingInfo}
            errors={errors}
          />
        </div>

        <div className="flex flex-col-reverse lg:flex-row gap-10">
          {/* left */}
          <div className="w-[100%] lg:w-[65%] flex flex-col gap-5">
            {!cartLoading
              ? cartData?.data?.products.map((item) => (
                  <CartProductCard
                    key={item._id}
                    data={item}
                    f
                    refetch={refetch}
                  />
                ))
              : "Loading..."}
          </div>

          {/* right  */}
          <div className="w-[100%] lg:w-[35%]">
            <CartSubTotal
              data={cartData?.data}
              handleShippingInfoBox={handleShippingInfoBox}
              finalShippingInfoForm={finalShippingInfoForm}
              handlePlaceOrder={handlePlaceOrder}
              isPending={isPending}
              razorpayKeyisLoading={razorpayKeyisLoading}
              razorpayKeyError={razorpayKeyError}
              checkoutData={checkoutData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
