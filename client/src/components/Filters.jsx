import { categories, colorPallets, products_discount } from "../data/category";

const Filters = () => {
  return (
    <div className="container flex flex-col gap-3">
      <h3 className="text-lg font-bold">FILTERS</h3>

      <hr className="border-b-2 border-lightGray/30" />

      <div className="flex flex-col gap-3">
        <h4 className="text-medium font-bold">Select Gender</h4>
        <div className="flex flex-col gap-1">
          {categories.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input type="radio" name="gender" id="gender" />
              <label
                htmlFor="gender"
                className="capitalize text-base font-medium"
              >
                {item.gender}
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-b-2 border-lightGray/30" />

      <div className="flex flex-col gap-3">
        <h4 className="text-medium font-bold">Select Categories</h4>
        <div className="flex flex-col gap-1">
          {categories[0].types.sort().map((item, i) => (
            <div key={i} className="flex items-center gap-2">
              <input type="checkbox" name="categories" id="categories" />
              <label
                htmlFor="categories"
                className="capitalize text-base font-medium"
              >
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-b-2 border-lightGray/30" />

      <div className="flex flex-col gap-3">
        <h4 className="text-medium font-bold">Select Discount</h4>
        <div className="flex flex-col gap-1">
          {products_discount.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input type="radio" name="discount" id="discount" />
              <label
                htmlFor="discount"
                className="capitalize text-base font-medium"
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-b-2 border-lightGray/30" />

      <div className="flex flex-col gap-3">
        <h4 className="text-medium font-bold">Select Colours</h4>
        <div className="flex flex-col gap-1">
          {colorPallets.map((item, i) => (
            <div key={i} className="flex gap-2">
              <input type="checkbox" name="color" id="color" />
              <label
                htmlFor="color"
                className="capitalize text-base font-medium"
              >
                {item.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
