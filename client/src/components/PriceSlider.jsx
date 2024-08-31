import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";
import propTypes from "prop-types";

export default function PriceSlider({ setLPrice, setHPrice }) {
  const [value, setValue] = useState([0, 21000]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = () => {
    setLPrice(value[0]);
    setHPrice(value[1]);
  };

  return (
    <Box className="w-[80%] flex gap-4">
      <Slider
        getAriaLabel={() => "Temperature range"}
        max={21000}
        min={0}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
      <button
        className="px-3 py-1 rounded-md bg-blue text-sm font-semibold text-white"
        onClick={handleSubmit}
      >
        GO
      </button>
    </Box>
  );
}

PriceSlider.propTypes = {
  hPrice: propTypes.number,
  setHPrice: propTypes.func,
  lPrice: propTypes.number,
  setLPrice: propTypes.func,
};
