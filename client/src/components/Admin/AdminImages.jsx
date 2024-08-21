import propTypes from "prop-types";

const AdminImages = ({
  handleChange,
  images,
  //   setImages,
  imagePrev,
  //   setImagePrev,
}) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="h-[80%] grid grid-cols-3 gap-4 p-4">
        {imagePrev.map((image, i) => (
          <img
            key={i}
            src={image}
            alt="image"
            className="h-[25vh] w-full object-contain bg-white"
          />
        ))}
      </div>

      <hr className="border-b border-lightGray my-3 " />

      <div className="h-[20%]">
        <label
          className="block mb-2 text-md font-semibold text-lightGray"
          htmlFor="file_input"
        >
          Upload file
        </label>
        <input
          className="block w-full text-sm text-lightGray border border-lightGray rounded-lg cursor-pointer focus:outline-none p-2"
          id="file_input"
          type="file"
          onChange={handleChange}
          disabled={images.length >= 6}
        />
        <p
          className="mt-1 text-sm text-lightGray dark:text-gray-300"
          id="file_input_help"
        >
          SVG, PNG, JPG or GIF (MAX. 800x400px).
        </p>
      </div>
    </div>
  );
};

AdminImages.propTypes = {
  handleChange: propTypes.func,
  images: propTypes.array,
  imagePrev: propTypes.array,
};

export default AdminImages;
