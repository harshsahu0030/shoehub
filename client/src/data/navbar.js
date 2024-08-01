import { IoHomeOutline } from "react-icons/io5";
import { RiSearch2Line } from "react-icons/ri";
import { SlHandbag } from "react-icons/sl";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";

export const navbar = {
  states: {
    AN: "Andaman and Nicobar Islands",
    AP: "Andhra Pradesh",
    AR: "Arunachal Pradesh",
    AS: "Assam",
    BR: "Bihar",
    CG: "Chandigarh",
    CH: "Chhattisgarh",
    DN: "Dadra and Nagar Haveli",
    DD: "Daman and Diu",
    DL: "Delhi",
    GA: "Goa",
    GJ: "Gujarat",
    HR: "Haryana",
    HP: "Himachal Pradesh",
    JK: "Jammu and Kashmir",
    JH: "Jharkhand",
    KA: "Karnataka",
    KL: "Kerala",
    LA: "Ladakh",
    LD: "Lakshadweep",
    MP: "Madhya Pradesh",
    MH: "Maharashtra",
    MN: "Manipur",
    ML: "Meghalaya",
    MZ: "Mizoram",
    NL: "Nagaland",
    OR: "Odisha",
    PY: "Puducherry",
    PB: "Punjab",
    RJ: "Rajasthan",
    SK: "Sikkim",
    TN: "Tamil Nadu",
    TS: "Telangana",
    TR: "Tripura",
    UP: "Uttar Pradesh",
    UK: "Uttarakhand",
    WB: "West Bengal",
  },

  links: [
    {
      icon: IoMdHeartEmpty,
      url: "/",
    },
    {
      icon: AiOutlineUser,
      url: "/profile",
    },
    {
      icon: BsHandbag,
      url: "/cart",
    },
  ],

  navigations: [
    {
      icon: IoHomeOutline,
      url: "/",
    },
    {
      icon: SlHandbag,
      url: "/cart",
    },
    {
      icon: RiSearch2Line,
      url: "/search",
    },
    {
      icon: AiOutlineHeart,
      url: "/wishlist",
    },
    {
      icon: AiOutlineUser,
      url: "/profile",
    },
  ],
};
