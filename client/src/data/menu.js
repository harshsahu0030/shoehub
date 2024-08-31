import { MdNewReleases } from "react-icons/md";
import { GiStarSwirl } from "react-icons/gi";
import { BiSolidDiscount } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { PiEyesLight } from "react-icons/pi";

export const menuData = {
  categoryLinks: [
    {
      name: "newly launched",
      link: "/products?sort=createdAt+-1",
      icon: MdNewReleases,
    },
    {
      name: "top rated",
      link: "/products?sort=ratings+-1",
      icon: GiStarSwirl,
    },
    {
      name: "best sellers",
      link: "/products?numOfOrders+-1",
      icon: BiSolidDiscount,
    },
  ],
  profileLinks: [
    { name: "my account", link: "/profile", icon: AiOutlineUser },
    { name: "cart", link: "/cart", icon: BsHandbag },
    { name: "wishlist", link: "/wishlist", icon: IoMdHeartEmpty },
    { name: "recently visited", link: "/", icon: PiEyesLight },
  ],
};
