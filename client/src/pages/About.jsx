import { useLayoutEffect } from "react";
import useBackToTop from "../hook/useBackToTop";
import MetaData from "../utils/MetaData";

const About = () => {
  const backToTopHanlder = useBackToTop();

  useLayoutEffect(() => {
    backToTopHanlder();
  }, [backToTopHanlder]);
  return (
    <>
      <MetaData
        title={"Shoehub | About"}
        description={"About page of shoehub"}
        keywords={"shoehub journey, objectives, motives, history"}
      />

      <div className="flex flex-col gap-3 mt-10 w-full">
        <h1 className="text-3xl font-semibold">About Us</h1>

        <hr className="border-b-2 border-lightGray/50" />

        <div className="flex flex-col gap-3">
          <h2 className="text-2xl font-medium">
            <span className="font-bold text-red-500">OUR GOAL:</span> Every
            Customer Delighted
          </h2>

          <p className="text-base font-medium">
            {
              "Shoehub.com is all about footwear. We have been in the shoe business for over 130 years. Yes, you read that correctly, over a century plus a quarter. Today we are proud to offer our best customer service to patrons both online here at Shoehub.com and in our shoe stores in the Indianapolis, IN area. For more information about the 130+ history of Shoehub's Footwear, visit our history page."
            }
          </p>

          <p className="text-base font-medium">
            {
              "Shoehub’s Footwear, the oldest shoe store in the India and our parent company, proudly opened its doors to the world of ecommerce in 2009. Since starting shoehub.com, we have devoted our energy to providing personable and knowledgable customer service with quick free shipping to every customer. Excellent customer service is the standard of Shoehub’s Footwear and Shoehub.com that will not be compromised.Our goal is to make sure that your demands of quality, style and comfort are fulfilled."
            }
          </p>

          <p className="text-base font-medium">
            {
              "Style, comfort and quality are the focus of the Shoehub.com buying team. The brands we carry are a reflection of our values which is why we search the world for the finest footwear every season. We know that if you don’t take care of your feet then your whole body suffers. Brands such as New Balance, Munro, Ecco, KEEN, Birkenstock and Sorel epitomize what we are about. Top-quality styles that are crafted with support, style and exquisite materials."
            }
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
