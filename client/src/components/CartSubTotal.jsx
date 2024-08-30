const CartSubTotal = () => {
  return (
    <div className="h-[60vh] w-full flex flex-col gap-4 border rounded-lg p-3">
      {/* heading */}
      <div className="flex flex-col gap-1 border-b pb-1 border-lightGray">
        <h2 className="text-2xl font-bold">CART SUB-TOTAL</h2>
        <p></p>
      </div>

      <div className="flex flex-col justify-around gap-2 h-full">
        <div className="flex items-center justify-between text-lg">
          <span className="font-medium">SubTotal MRP</span>
          <span className="font-semibold">1234</span>
        </div>
        <div className="flex items-center justify-between text-lg">
          <span className="font-medium">Discount on MRP</span>
          <span className="font-semibold">1234</span>
        </div>
        <div className="flex items-center justify-between text-lg">
          <span className="font-medium">SubTotal Price</span>
          <span className="font-semibold">1234</span>
        </div>
        <div className="flex items-center justify-between text-lg">
          <span className="font-medium">Discount on Price</span>
          <span className="font-semibold">1234</span>
        </div>
        <div className="flex items-center justify-between text-lg">
          <span className="font-medium">Shipping Charges</span>
          <span className="font-semibold">1234</span>
        </div>

        <hr className="border my-1 border-lightGray" />

        <div className="flex items-center justify-between text-lg">
          <span className="font-semibold">Estimated Total</span>
          <span className="font-semibold">1234</span>
        </div>

        <hr className="border my-1 border-lightGray" />

        <button className="flex justify-self-end justify-center items-center py-2 border rounded-lg bg-yellow-400 font-bold hover:bg-yellow-500 transition-all">
          Place Order
        </button>
      </div>
    </div>
  );
};

export default CartSubTotal;
