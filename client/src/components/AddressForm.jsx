import { IoClose } from "react-icons/io5";
import NormalInput from "./inputs/NormalInput";
import propTypes from "prop-types";

const AddressForm = ({
  shippingInfoForm,
  handleShippingInfoBox,
  handleChange,
  handleSetShippingInfo,
  errors,
}) => {
  return (
    <form
      className="flex flex-col gap-5  w-[90%] md:w-[70%] xl:w-[60%] bg-white rounded-lg p-5"
      onSubmit={handleSetShippingInfo}
    >
      <div className="flex justify-between w-[100%] pb-2 border-b">
        <div className="flex flex-col">
          <h3 className="text-2xl font-semibold">Update address</h3>
          <p className="text-sm font-medium text-gray">
            Enter your address where we can deliver your products.
          </p>
        </div>
        <IoClose
          className="text-3xl cursor-pointer hover:scale-110 transition-all"
          onClick={() => handleShippingInfoBox()}
        />
      </div>

      <div className="flex flex-col gap-3">
        <NormalInput
          id={"shipping-address"}
          label={"Shipping Address"}
          type={"text"}
          name={"address"}
          placeholder="Enter Address here..."
          value={shippingInfoForm.address}
          onChange={handleChange}
          error={errors.address}
        />

        <div className="grid grid-cols-2 gap-3">
          <NormalInput
            id={"shipping-city"}
            label={"Shipping City"}
            type={"text"}
            name={"city"}
            placeholder="Enter City here..."
            value={shippingInfoForm.city}
            onChange={handleChange}
            error={errors.city}
          />
          <NormalInput
            id={"shipping-state"}
            label={"Shipping State"}
            type={"text"}
            name={"state"}
            placeholder="Enter State here..."
            value={shippingInfoForm.state}
            onChange={handleChange}
            error={errors.state}
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <NormalInput
            id={"shipping-pincode"}
            label={"Shipping Pincode"}
            type={"number"}
            name={"pincode"}
            placeholder="Enter Pincode here..."
            value={shippingInfoForm.pincode}
            onChange={handleChange}
            error={errors.pincode}
          />
          <NormalInput
            id={"shipping-phoneNo"}
            label={"Phone No."}
            type={"number"}
            name={"phoneNo"}
            placeholder="Enter phone No here..."
            value={shippingInfoForm.phoneNo}
            onChange={handleChange}
            error={errors.phoneNo}
          />
        </div>
      </div>

      <button
        type="submit"
        className="text-white font-semibold w-full py-2 bg-blue rounded-lg hover:bg-blue/80"
      >
        Submit
      </button>
    </form>
  );
};

AddressForm.propTypes = {
  shippingInfoForm: propTypes.object,
  errors: propTypes.object,
  handleShippingInfoBox: propTypes.func,
  handleChange: propTypes.func,
  handleSetShippingInfo: propTypes.func,
};

export default AddressForm;
