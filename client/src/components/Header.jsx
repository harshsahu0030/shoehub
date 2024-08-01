import { Link } from "react-router-dom";
import { headerData } from "../data/header";
import { useState } from "react";

const Header = () => {
  //useStates
  const [headerLanguage, setHeaderLanguage] = useState(
    headerData && headerData.dropdownLanguage[0]
  );
  const [headerCurrency, setHeaderCurrency] = useState(
    headerData && headerData.dropdownCurrency[0]
  );

  return (
    <div className="container h-full text-sm font-medium flex items-center gap-6 justify-between text-gray">
      {/* left  */}
      <ul className="flex gap-5">
        {headerData &&
          headerData.headerLinks.map((item, i) => (
            <li key={i}>
              <Link to={item.url} className="hover:text-blue">
                {item.name}
              </Link>
            </li>
          ))}
      </ul>

      {/* center  */}
      <div className="gap-5 hidden xl:flex">
        <span>{headerData && headerData.content}</span>
      </div>

      {/* right  */}
      <div className="flex gap-5">
        <select
          name="header-language"
          id="header-language"
          className="outline-none capitalize"
          defaultValue={headerLanguage.name}
          onChange={(e) => setHeaderLanguage(e.target.value)}
        >
          {headerData &&
            headerData.dropdownLanguage.map((item, i) => (
              <option key={i} value={item} className="capitalize">
                {item}
              </option>
            ))}
        </select>
        <select
          name="header-currency"
          id="header-currency"
          className="outline-none capitalize"
          defaultValue={headerCurrency}
          onChange={(e) => setHeaderCurrency(e.target.value)}
        >
          {headerData &&
            headerData.dropdownCurrency.map((item, i) => (
              <option key={i} className="capitalize">
                {item}{" "}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default Header;
