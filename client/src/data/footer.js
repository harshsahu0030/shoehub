import { TbShoe } from "react-icons/tb";
import { LuBadgePercent } from "react-icons/lu";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { TbTruckDelivery } from "react-icons/tb";
import Footer_Coupen from "/footer_coupon.png";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";


export const footer_data = {
  subscribe: {
    subHeading: "$20 discount for your first order",
    heading: "Join our newsletter and get...",
    desc: "Join our email subscription now to get updates on promotions and coupons.",
    button: "Subscribe",
    imgUrl: Footer_Coupen,
  },

  copyRights:
    "Copyright 2024 © Shoehub. All rights reserved. Powered by Harsh.",

  features: [
    {
      icon: TbShoe,
      desc: "Everyday fresh products",
    },
    {
      icon: TbTruckDelivery,
      desc: "Free delivery for order over $70",
    },
    {
      icon: LuBadgePercent,
      desc: "Daily Mega Discounts",
    },
    {
      icon: HiOutlineCurrencyRupee,
      desc: "Best price on the market",
    },
  ],

  social: [
    {
      icon: FaXTwitter,
      url: "#",
    },
    {
      icon: FaInstagram,
      url: "#",
    },
    {
      icon: FaFacebookF,
      url: "#",
    },
  ],

  customerPolicies: [
    {
      name: "FAQs",
      url: "#",
    },
    {
      name: "T&C",
      url: "#",
    },
    {
      name: "terms of use",
      url: "#",
    },
    {
      name: "track orders",
      url: "#",
    },
    {
      name: "shipping",
      url: "#",
    },
    {
      name: "cancellation",
      url: "#",
    },
    {
      name: "returns",
      url: "#",
    },
  ],

  policies: [
    {
      name: "Privacy Policy",
      url: "#",
    },
    {
      name: "Terms and Conditions",
      url: "#",
    },
    {
      name: "Cookie",
      url: "#",
    },
  ],
};
