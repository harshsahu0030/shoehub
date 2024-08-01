import { Link } from "react-router-dom";
import { headerData } from "../data/header";
import { footer_data } from "../data/footer";
import { createElement } from "react";
import LocationBox from "./LocationBox";
import useBackToTop from "../hook/useBackToTop.jsx";

const Footer = () => {
  const backToTopHanlder = useBackToTop();

  return (
    <div className="flex flex-col gap-16 container h-full py-5 text-sm">
      {/* back to top  */}
      <button
        className="container bg-cyan text-white py-2 md:py-3 xl:py-4 text-md font-semibold transition-all ease-in-out duration-300 hover:bg-blue"
        onClick={() => backToTopHanlder()}
      >
        BACK TO TOP
      </button>
      {/* top  */}
      <div className="container grid grid-cols-1 gap-10 md:grid-cols-3">
        {/* useful links  */}
        <div className="grid grid-cols-2">
          <div className="flex flex-col gap-5">
            <h5 className=" font-bold">USEFUL LINKS</h5>
            <ul className="flex flex-col gap-1 font-medium capitalize">
              <li>
                <Link to="/" className="hover:text-blue">
                  home
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-blue">
                  blog
                </Link>
              </li>
              {headerData &&
                headerData.headerLinks.map((item, i) => (
                  <li key={i}>
                    <Link to={item.url} className="hover:text-blue">
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="flex flex-col gap-5">
            <h5 className=" font-bold">CUSTOMER POLICIES</h5>
            <ul className="flex flex-col gap-1 font-medium capitalize">
              {footer_data &&
                footer_data.customerPolicies.map((item, i) => (
                  <li key={i}>
                    <Link to={item.url} className="hover:text-blue">
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* social links  */}
        <div className="flex flex-col gap-5">
          <div className="container hidden md:block h-[5vh] xl:hidden">
            <LocationBox />
          </div>

          <div className="flex flex-col gap-5">
            <h5 className=" font-bold">KEEP IN TOUCH</h5>

            <div className="flex gap-4">
              {footer_data &&
                footer_data.social.map((item, i) => (
                  <Link
                    className="text-2xl cursor-pointer transition-all ease-in-out duration-200 hover:scale-110 hover:text-blue"
                    key={i}
                    to={item.url}
                  >
                    {createElement(item.icon)}
                  </Link>
                ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <h5 className=" font-bold">ONLINE SHOPPING MADE EASY AT SHOEHUB</h5>

          <span className="text-xs">
            Another reason why Shoehub is the best of all online stores is the
            complete convenience that it offers. You can view your favourite
            brands with price options for different products in one place. A
            user-friendly interface will guide you through your selection
            process. Comprehensive size charts, product information and
            high-resolution images help you make the best buying decisions. You
            also have the freedom to choose your payment options, be it card or
            cash-on-delivery. The 2-5-day returns policy gives you more power as
            a buyer. Additionally, the try-and-buy option for select products
            takes customer-friendliness to the next level.
          </span>
        </div>
      </div>
      {/* middle  */}
      <div className="flex flex-col md:flex-row gap-8 md:items-center justify-between">
        {/* left  */}
        <div className="flex flex-col gap-5">
          <h5 className=" font-bold">REGISTERED OFFICE ADDRESSS</h5>
          <span className="">
            Buildings Alyssa,
            <br /> Begonia and Clover situated in Embassy Tech Village,
            <br /> Outer Ring Road,
            <br /> Devarabeesanahalli Village,
            <br /> Varthur Hobli,
            <br />
            Bengaluru – 560103, India
          </span>
        </div>

        {/* right  */}
        <div className="flex flex-col gap-1 ">
          <span className="">CIN: UXXXXXKAXXXXXTCXXXXX9</span>
          <span className="flex gap-2">
            Telephone:{" "}
            <span className="text-blue font-bold">+91-80-60000009</span>
          </span>
        </div>
      </div>
      {/* bottom  */}
      <div className="container flex flex-col md:flex-row gap-4 justify-between items-center py-1  font-medium text-gray">
        {/* left  */}
        <span className="md:w-[50%]">
          {footer_data && footer_data.copyRights}
        </span>

        {/* right */}
        <ul className="container md:w-[50%] flex justify-between md:justify-end gap-4">
          {footer_data &&
            footer_data.policies.map((item, i) => (
              <li key={i}>
                <Link to={item.url} className="hover:text-blue">
                  {item.name}
                </Link>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Footer;
