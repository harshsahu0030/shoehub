import propTypes from "prop-types";

const CartSubTotal = ({
  data,
  handleShippingInfoBox,
  finalShippingInfoForm,
}) => {
  return (
    <div className="h-fit w-full flex flex-col gap-6 border rounded-lg px-3 py-6">
      {/* heading */}
      <div className="flex flex-col gap-1 border-b pb-1 border-lightGray">
        <h2 className="text-2xl font-bold">CART SUB-TOTAL</h2>
        <p></p>
      </div>

      <div className="flex flex-col justify-around gap-2 h-full">
        <div className="flex items-center justify-between text-lg">
          <span className="font-medium">SubTotal MRP</span>
          <span className="font-semibold">
            {data?.totalMrp.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "INR",
            })}
          </span>
        </div>
        <div className="flex items-center justify-between text-lg">
          <span className="font-medium">Discount on MRP</span>
          <span className="text-green-600 font-semibold">
            {data?.discountOnMrp.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "INR",
            })}
          </span>
        </div>
        <div className="flex items-center justify-between text-lg">
          <span className="font-medium">SubTotal Price</span>
          <span className="font-semibold">
            {data?.totalPrice.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "INR",
            })}
          </span>
        </div>

        <div className="flex items-center justify-between text-lg">
          <span className="font-medium flex flex-col">
            <span>Shipping Charges</span>
            <span className="text-xs">
              Price above{" "}
              {(1500).toLocaleString("en-IN", {
                maximumFractionDigits: 0,
                style: "currency",
                currency: "INR",
              })}
              /- Shipping free
            </span>
          </span>
          <span className="font-semibold">
            {data?.shippingCharges < 1500 ? (
              data?.shippingCharges.toLocaleString("en-IN", {
                maximumFractionDigits: 0,
                style: "currency",
                currency: "INR",
              })
            ) : (
              <span className="text-green-600 font-semibold">FREE</span>
            )}
          </span>
        </div>

        <hr className="border my-1 border-lightGray" />

        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Total Amount</span>
          <span className="font-semibold">
            {data?.estimatedTotal.toLocaleString("en-IN", {
              maximumFractionDigits: 0,
              style: "currency",
              currency: "INR",
            })}
          </span>
        </div>

        <hr className="border my-1 border-lightGray" />

        <div className="flex flex-col text-sm font-medium">
          <h4 className="font-semibold">DELIVERY ADDRESS:</h4>

          {!Object.keys(finalShippingInfoForm).length !== 0 ? (
            <>
              <span>{finalShippingInfoForm?.address}</span>
              <span>
                {finalShippingInfoForm?.city} , {finalShippingInfoForm?.pincode}
              </span>
              <span>{finalShippingInfoForm?.state}</span>
              <span>PH: {finalShippingInfoForm?.phoneNo}</span>
            </>
          ) : (
            <span>-</span>
          )}
        </div>

        <button
          className="flex justify-self-end justify-center items-center py-2 border rounded-lg bg-blue text-white font-bold transition-all hover:bg-blue/90"
          disabled={!data?.enable}
          onClick={() => handleShippingInfoBox("show")}
        >
          Update Address
        </button>

        <hr className="border my-1 border-lightGray" />

        <button
          className="flex justify-self-end justify-center items-center py-2 border rounded-lg bg-yellow-400 font-bold hover:bg-yellow-500 transition-all disabled:bg-lightGray disabled:cursor-not-allowed"
          disabled={
            !data?.enable || Object.keys(finalShippingInfoForm).length === 0
          }
        >
          Place Order
        </button>
        {!data?.enable && (
          <span className="text-sm font-medium text-red-500">
            Check the quantity of products (not available)
          </span>
        )}
        {Object.keys(finalShippingInfoForm).length === 0 && (
          <span className="text-sm font-medium text-red-500">
            InComplete Address (Please update your address)
          </span>
        )}
      </div>
    </div>
  );
};

CartSubTotal.propTypes = {
  data: propTypes.object,
  finalShippingInfoForm: propTypes.object,
  handleShippingInfoBox: propTypes.func,
};

export default CartSubTotal;
