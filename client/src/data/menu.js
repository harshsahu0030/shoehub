import { MdNewReleases } from "react-icons/md";
import { GiStarSwirl } from "react-icons/gi";
import { BiSolidDiscount } from "react-icons/bi";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsHandbag } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { PiEyesLight } from "react-icons/pi";

export const menuData = {
  categoryLinks: [
    { name: "newly launched", link: "/", icon: MdNewReleases },
    { name: "trending", link: "/", icon: GiStarSwirl },
    { name: "best sellers", link: "/", icon: BiSolidDiscount },
  ],
  profileLinks: [
    { name: "my account", link: "/", icon: AiOutlineUser },
    { name: "cart", link: "/", icon: BsHandbag },
    { name: "wishlist", link: "/", icon: IoMdHeartEmpty },
    { name: "recently visited", link: "/", icon: PiEyesLight },
  ],
};
