import { useEffect, useRef, useState } from "react";
import BasicInput from "../inputs/BasicInput";
import { MdOutlineTitle } from "react-icons/md";
import SelectInput from "../inputs/SelectInput";
import { IoPricetagsOutline } from "react-icons/io5";
import { GiFeatheredWing } from "react-icons/gi";
import JoditEditor from "jodit-react";
import { IoMdClose } from "react-icons/io";
import { SiBrandfolder } from "react-icons/si";
import propTypes from "prop-types";
import { FaProductHunt } from "react-icons/fa";

import {
  categories,
  colorPallets,
  gender_data,
  product_action_data,
  sizes_data,
} from "../../data/category";
import AdminImages from "./AdminImages";

const ProductForm = ({ isPending, mutate, data }) => {
  const [productForm, setProductForm] = useState({
    title: "",
    brand: "",
    category: "",
    action: "",
    color: "",
    mrp: "",
    price: "",
  });

  const [features, setFeatures] = useState([]);
  const [featureItems, setFeatureItems] = useState({
    key: "",
    value: "",
  });
  const [gender, setGender] = useState("");
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);
  const [imagePrev, setImagePrev] = useState([]);

  //ref
  const editor = useRef(null);
  const toggleImagesRef = useRef();

  //functions
  const handleChange = (event) => {
    setProductForm({
      ...productForm,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeGender = (e) => {
    setGender(e.target.value);
    setSizes([]);

    setSizes(
      sizes_data
        .find((g) => g.gender === e.target.value)
        .sizes.map((item) => {
          return {
            size: item,
            stock: 0,
          };
        })
    );
  };

  //features
  const handleChangeFeature = (event) => {
    setFeatureItems({
      ...featureItems,
      [event.target.name]: event.target.value,
    });
  };

  const handleAddFeature = () => {
    setFeatures([...features, featureItems]);
    setFeatureItems({
      key: "",
      value: "",
    });
  };

  const handleUpdateFeature = ({ index, key, value }) => {
    let newArr = [...features];

    if (key) {
      newArr[index].key = key;
    }
    if (value) {
      newArr[index].value = value;
    }

    setFeatures(newArr);
  };

  const handleDeleteFeature = (i) => {
    let newArr = [...features];

    newArr.splice(i, 1);

    setFeatures(newArr);
  };

  //sizes
  const handleUpdateSizes = (i, stock) => {
    let newArr = [...sizes];

    newArr[i].stock = stock;

    setSizes(newArr);
  };

  //images
  const handleShowImagesBox = (value) => {
    if (value === "show") {
      toggleImagesRef.current.style.display = "flex";
    } else {
      toggleImagesRef.current.style.display = "none";
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((old) => [...old, reader.result]);
          setImagePrev((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  //form
  const handleSubmit = (e) => {
    e.preventDefault();

    const newForm = {
      ...productForm,
      gender,
      sizes,
      features,
      description,
      images,
    };

    if (data) {
      mutate({ newForm, id: data._id });
    } else {
      mutate(newForm);
    }
  };

  //useEffect
  useEffect(() => {
    if (data) {
      setProductForm({
        ...data,
        [data.key]: data.value,
      });

      setGender(data.gender);
      setDescription(data.description);
      setFeatures([...data.features]);
      setSizes([...data.sizes]);
      setImagePrev(data.images.map((img) => img.url));
    }
  }, [data]);

  return (
    <form
      className="text-white flex flex-col gap-5 p-10"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-3 gap-5">
        <BasicInput
          id={"product-brand"}
          label={"Product Brand"}
          icon={SiBrandfolder}
          type={"text"}
          name={"brand"}
          placeholder="Enter brand here..."
          value={productForm.brand}
          onChange={handleChange}

          // error={errors.input}
        />
        {data && (
          <BasicInput
            id={"product-id"}
            label={"Product Id"}
            icon={FaProductHunt}
            type={"text"}
            name={"id"}
            value={data?._id}
            disabled={true}
          />
        )}
      </div>

      <BasicInput
        id={"product-title"}
        label={"Product Title"}
        icon={MdOutlineTitle}
        type={"text"}
        name={"title"}
        placeholder="Enter title here..."
        value={productForm.title}
        onChange={handleChange}
        // error={errors.input}
      />
      <div className="grid grid-cols-3 gap-5">
        <SelectInput
          id={"product-gender"}
          label={"Product Gender"}
          type={"text"}
          name={"gender"}
          value={gender}
          onChange={handleChangeGender}
          options={gender_data}
          // error={errors.input}
        />
        <SelectInput
          id={"product-category"}
          label={"Product Category"}
          type={"text"}
          name={"category"}
          value={productForm.category}
          onChange={handleChange}
          options={
            gender
              ? categories?.find((item) => item.gender === gender).types
              : []
          }
          // error={errors.input}
        />
        <SelectInput
          id={"product-color"}
          label={"Product Color"}
          type={"text"}
          name={"color"}
          value={productForm.color}
          onChange={handleChange}
          options={colorPallets.map((item) => item.name)}
          // error={errors.input}
        />
      </div>
      <div className="grid grid-cols-3 gap-5">
        <BasicInput
          id={"product-mrp"}
          label={"Product MRP"}
          icon={IoPricetagsOutline}
          type={"number"}
          name={"mrp"}
          placeholder="Enter mrp here..."
          value={productForm.mrp}
          onChange={handleChange}
          // error={errors.input}
        />
        <BasicInput
          id={"product-price"}
          label={"Product Price"}
          icon={IoPricetagsOutline}
          type={"number"}
          name={"price"}
          placeholder="Enter price here..."
          value={productForm.price}
          onChange={handleChange}
          // error={errors.input}
        />
        <SelectInput
          id={"product-action"}
          label={"Product Action"}
          type={"text"}
          name={"action"}
          value={productForm.action}
          onChange={handleChange}
          options={product_action_data}
          // error={errors.input}
        />
      </div>
      <fieldset className="flex flex-col gap-3 border border-lightGray p-5">
        <legend className="text-lightGray font-semibold text-md p-2">
          Description
        </legend>
        <div className="input_container flex flex-col gap-2">
          <span className="text-lightGray text-sm font-medium">
            Description should be 150-250 words maximum for better expirience
            and visibiliy
          </span>
          <JoditEditor
            className="h-[100vh] text-black"
            ref={editor}
            value={description}
            onChange={(prev) => setDescription(prev)}
          />
        </div>
      </fieldset>
      <fieldset className="border border-lightGray p-5 flex flex-col gap-8">
        <legend className="text-lightGray font-semibold text-md p-2">
          Product Features
        </legend>

        <div className="grid grid-cols-3 gap-5">
          <BasicInput
            id={"feature-key"}
            label={"Feature Key"}
            icon={GiFeatheredWing}
            type={"text"}
            name={"key"}
            placeholder="Enter key here..."
            value={featureItems.key}
            onChange={handleChangeFeature}
            // error={errors.input}
          />
          <BasicInput
            id={"feature-value"}
            label={"Feature Value"}
            icon={GiFeatheredWing}
            type={"text"}
            name={"value"}
            placeholder="Enter value here..."
            value={featureItems.value}
            onChange={handleChangeFeature}
            // error={errors.input}
          />
          <button
            className="py-3 px-6 w-fit h-fit rounded-lg border text-sm font-semibold transition-all hover:bg-blue self-end"
            type="button"
            onClick={handleAddFeature}
          >
            Add
          </button>
        </div>

        <fieldset className="flex flex-col gap-3 border border-lightGray p-5">
          <legend className="text-lightGray font-semibold text-md p-2">
            Added Features
          </legend>
          {features && features.length > 0
            ? features.map((item, i) => (
                <li key={i} className="grid grid-cols-3 gap-5">
                  <BasicInput
                    id={`feature-key-${i}`}
                    type={"text"}
                    name={"key"}
                    placeholder="Enter key here..."
                    defaultValue={item.key}
                    onChange={(e) =>
                      handleUpdateFeature({
                        index: i,
                        key: e.target.value,
                      })
                    }
                    // error={errors.input}
                  />
                  <BasicInput
                    id={`feature-value-${i}`}
                    type={"text"}
                    name={"value"}
                    placeholder="Enter value here..."
                    defaultValue={item.value}
                    onChange={(e) =>
                      handleUpdateFeature({ index: i, value: e.target.value })
                    }
                    // error={errors.input}
                  />

                  <button
                    className="py-3 px-6 w-fit h-fit rounded-lg border text-sm font-semibold transition-all hover:bg-blue self-end"
                    type="button"
                    onClick={() => {
                      handleDeleteFeature(i);
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))
            : "Not Added Yet"}
        </fieldset>
      </fieldset>
      <fieldset className="border border-lightGray p-5">
        <legend className="text-lightGray font-semibold text-md p-2">
          Product Sizes
        </legend>

        <ul className="flex flex-col gap-4">
          {gender && sizes
            ? sizes.map((item, i) => (
                <>
                  <li key={i} className="grid grid-cols-3 gap-5">
                    <BasicInput
                      id={`feature-key-${i}`}
                      type={"number"}
                      name={"key"}
                      placeholder="Enter key here..."
                      defaultValue={item.size}
                      disabled={true}
                      // error={errors.input}
                    />
                    <BasicInput
                      id={`feature-value-${i}`}
                      type={"number"}
                      name={"value"}
                      placeholder="Enter stock here..."
                      defaultValue={item.stock}
                      onChange={(e) => handleUpdateSizes(i, e.target.value)}
                      // error={errors.input}
                    />
                  </li>
                </>
              ))
            : "please select gender first"}
        </ul>
      </fieldset>

      <fieldset className="border border-lightGray p-5">
        <legend className="text-lightGray font-semibold text-md p-2">
          Product Images
        </legend>

        <button
          className="py-3 px-6 w-fit h-fit rounded-lg border text-sm font-semibold transition-all hover:bg-blue"
          type="button"
          onClick={() => handleShowImagesBox("show")}
        >
          Add & Update Images
        </button>

        <div
          ref={toggleImagesRef}
          className="fixed top-0 left-0 h-[100vh] w-[100%] bg-slate-600/90 z-50 hidden justify-center items-center transition-all"
        >
          <div className="relative w-[80%] h-[90%] bg-slate-900 rounded-2xl py-10 px-5">
            <IoMdClose
              className="absolute right-2 top-2 text-3xl cursor-pointer transition-all hover:scale-110"
              onClick={() => handleShowImagesBox("hidden")}
            />
            <AdminImages
              handleChange={handleImageChange}
              images={images}
              setImages={setImages}
              imagePrev={imagePrev}
              setImagePrev={setImagePrev}
            />
          </div>
        </div>
      </fieldset>

      <button
        className="py-3 px-6 w-fit h-fit rounded-lg border text-sm font-semibold transition-all hover:bg-blue disabled:bg-gray"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "loading..." : "Submit"}
      </button>
    </form>
  );
};

ProductForm.propTypes = {
  mutate: propTypes.func,
  isPending: propTypes.bool,
  data: propTypes.object,
};

export default ProductForm;
