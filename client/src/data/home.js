import { GrSchedulePlay } from "react-icons/gr";
import { BsAward } from "react-icons/bs";
import VerticalBanner01 from "/vertival_banner01.png";
import VerticalBanner02 from "/vertical_banner02.png";
import { FiTruck } from "react-icons/fi";
import HorizontalBanner01 from "/long_vertical_banner.png";
import { TbTruckReturn } from "react-icons/tb";
import SmallBanner01 from "/small-banner01.png";
import SmallBanner02 from "/small-banner02.png";
import SmallBanner03 from "/small-banner03.png";
import SmallBanner04 from "/small-banner04.png";

export const homeData = {
  banner: {
    vertical: [
      {
        img: VerticalBanner01,
        url: "/products",
        query: {
          discount: 50,
          category: ["sneakers"],
        },
      },
      {
        img: VerticalBanner02,
        url: "/products",
        query: {
          discount: 50,
          category: ["running shoes"],
        },
      },
    ],
    horizontal: [
      {
        img: HorizontalBanner01,
        url: "/products",
        query: {},
      },
    ],
    small: [
      {
        img: SmallBanner01,
        url: "/products",
        query: {
          color: ["white"],
        },
      },
      {
        img: SmallBanner02,
        url: "/products",
        query: {
          category: ["sandal"],
        },
      },
      {
        img: SmallBanner03,
        url: "/products",
        query: {
          category: ["loafers"],
        },
      },
      {
        img: SmallBanner04,
        url: "/products",
        query: {
          color: ["black"],
          category: ["sneakers"],
        },
      },
    ],
  },

  features: [
    {
      icon: BsAward,
      desc: "All products are genuine and assured with a guarantee.",
    },
    {
      icon: GrSchedulePlay,
      desc: "Order now so you dont miss the opportunities.",
    },
    {
      icon: FiTruck,
      desc: "Your order will arrive at your door within a week.",
    },
    {
      icon: TbTruckReturn,
      desc: "Every product have 2-5 days return policy.",
    },
  ],
};
