import { BiFemale, BiMale } from "react-icons/bi";

export const categories = [
  {
    gender: "men",
    icon: BiMale,
    types: ["oxfords", "loafers", "boots", "sneakers", "sandal", "running"],
  },
  {
    gender: "women",
    icon: BiFemale,
    types: ["oxfords", "loafers", "boots", "sneakers", "heels", "running"],
  },
];

export const all_category = {
  gender: "all",
  types: [
    "oxfords",
    "loafers",
    "boots",
    "sneakers",
    "sandal",
    "heels",
    "running",
  ],
};

export const gender_data = ["men", "women"];

export const sizes_data = [
  {
    gender: "men",
    sizes: [5, 6, 7, 8, 9, 10],
  },
  {
    gender: "women",
    sizes: [4, 5, 6, 7, 8],
  },
];

export const products_discount = [
  {
    name: "10% and above",
    value: 10,
  },
  {
    name: "20% and above",
    value: 20,
  },
  {
    name: "30% and above",
    value: 30,
  },
  {
    name: "40% and above",
    value: 40,
  },
  {
    name: "50% and above",
    value: 50,
  },
  {
    name: "60% and above",
    value: 60,
  },
  {
    name: "70% and above",
    value: 70,
  },
  {
    name: "80% and above",
    value: 80,
  },
];

export const product_rating_data = [0, 1, 2, 3, 4];

export const product_action_data = ["active", "disabled"];

export const colorPallets = [
  { name: "multicolors", color: { R: 255, G: 255, B: 255 } },
  { name: "black", color: { R: 0, G: 0, B: 0 } },
  { name: "gray", color: { R: 128, G: 128, B: 128 } },
  { name: "silver", color: { R: 192, G: 192, B: 192 } },
  { name: "white", color: { R: 255, G: 255, B: 255 } },
  { name: "beige", color: { R: 245, G: 245, B: 220 } },
  { name: "tan", color: { R: 218, G: 200, B: 160 } },
  { name: "taupe", color: { R: 176, G: 156, B: 130 } },
  { name: "navy", color: { R: 19, G: 43, B: 83 } },
  { name: "purple", color: { R: 103, G: 53, B: 126 } },
  { name: "blue", color: { R: 31, G: 94, B: 158 } },
  { name: "peacock", color: { R: 0, G: 128, B: 128 } },
  { name: "aqua", color: { R: 85, G: 194, B: 195 } },
  { name: "light_blue", color: { R: 144, G: 193, B: 228 } },
  { name: "pink", color: { R: 235, G: 111, B: 164 } },
  { name: "brown", color: { R: 79, G: 41, B: 7 } },
  { name: "burgundy", color: { R: 117, G: 15, B: 23 } },
  { name: "terracotta", color: { R: 178, G: 77, B: 56 } },
  { name: "coral", color: { R: 247, G: 117, B: 100 } },
  { name: "peach", color: { R: 251, G: 189, B: 147 } },
  { name: "orange", color: { R: 250, G: 118, B: 10 } },
  { name: "red", color: { R: 192, G: 7, B: 24 } },
  { name: "dark_green", color: { R: 32, G: 75, B: 33 } },
  { name: "green", color: { R: 36, G: 138, B: 15 } },
  { name: "olive", color: { R: 128, G: 128, B: 0 } },
  { name: "gold", color: { R: 222, G: 170, B: 13 } },
  { name: "yellow", color: { R: 255, G: 210, B: 70 } },
];

export const product_sorting_data = [
  {
    name: "price: low to hight",
    key: "price",
    value: 1,
  },
  {
    name: "price: high to low",
    key: "price",
    value: -1,
  },
  {
    name: "ratings: low to hight",
    key: "ratings",
    value: 1,
  },
  {
    name: "ratings: high to low",
    key: "ratings",
    value: -1,
  },
  {
    name: "orders: low to hight",
    key: "numOfOrders",
    value: 1,
  },
  {
    name: "orders: high to low",
    key: "numOfOrders",
    value: -1,
  },
  {
    name: "what's new",
    key: "createdAt",
    value: -1,
  },
];
