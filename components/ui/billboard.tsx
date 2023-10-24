"use client";
import { Billboard } from "@/types";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BillboardProps {
  data: Billboard;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  const [showAnimation, setshowAnimation] = useState(false);

  useEffect(() => {
    // Add a delay before showing the carousel
    const timeout = setTimeout(() => {
      setshowAnimation(true);
    }, 2000); // Adjust the delay time as needed

    return () => {
      clearTimeout(timeout);
    };
  }, []);
  const animationVariants = {
    hidden: { opacity: 0, scale: 2 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };
  console;
  return (
    <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
      <div
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
        className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
      >
        <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-8">
          <AnimatePresence>
            {!showAnimation && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={animationVariants}
                // transition={{ duration: 1 }}
                className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs"
              >
                Amazon <span style={{ color: "#1dc943" }}>Green</span>
              </motion.div>
            )}
          </AnimatePresence>
          {showAnimation && (
            <div className="content">
              <div className="h-full w-full flex flex-col justify-center items-center text-center gap-y-4 align-middle">
                <div className="absolute top-[121px] left-[92px] rounded-8xs [background:linear-gradient(110deg,_#006304,_#4ada6a)] w-[340px] h-[193px]" />
                <div className="absolute top-[121px] left-[456px] rounded-8xs [background:linear-gradient(108.58deg,_#008c62,_#42ab59)] w-[340px] h-[193px]" />
                <div className="absolute top-[121px] left-[820px] rounded-8xs [background:linear-gradient(109.1deg,_#346800,_#a0ce3e)] w-[340px] h-[193px]" />
                {/* <div className="absolute top-[121px] left-[1126px] rounded-8xs [background:linear-gradient(108.66deg,_#14636e,_rgba(51,_248,_248,_0.15))] w-[340px] h-[193px]" /> */}
                <b className="absolute top-[138px] left-[116px] text-xl text-white">
                  Hot Sellers of the week
                </b>
                <b className="absolute top-[137px] left-[483px] text-xl text-white">
                  Top Reusable Products
                </b>
                <b className="absolute top-[137px] left-[840px] text-xl text-white">
                  <p className="m-0">{`Buy Refurbished & Recycled `}</p>
                  <p className="m-0">Products</p>
                </b>
                {/* <b className="absolute top-[137px] left-[1146px] text-xl text-white">{`Earn Green Coins & Vouchers `}</b> */}
                <div className="absolute top-[178px] left-[111px]  w-[211px] h-[117px]">
                  <img
                    className="absolute top-[0px] left-[118px]  w-[93px] h-[117px] object-cover"
                    alt=""
                    src="/image-22@2x.png"
                  />
                  <div className="absolute top-[25px] left-[0px] w-[86px] h-[90.69px]">
                    <img
                      className="absolute top-[0px] left-[-4px] w-[68.98px] h-[98.69px] object-cover"
                      alt=""
                      src="/image-15@2x.png"
                    />
                    <img
                      className="absolute top-[12.51px] left-[30.4px] w-[59.6px] h-[86.18px] object-cover"
                      alt=""
                      src="/image-16@2x.png"
                    />
                  </div>
                  <img
                    className="absolute top-[50px] left-[76px] w-[76px] h-[81px] object-cover"
                    alt=""
                    src="/image-12@2x.png"
                  />
                </div>
                <img
                  className="absolute top-[198px] left-[589px] w-[74px] h-[94px] object-cover"
                  alt=""
                  src="/image-25@2x.png"
                />
                <img
                  className="absolute top-[221px] left-[510px] w-[94px] h-[79px] object-cover"
                  alt=""
                  src="/image-26@2x.png"
                />
                <img
                  className="absolute top-[188px] left-[620px] w-[142px] h-[121px] object-cover"
                  alt=""
                  src="/allnewkindle-black-tilte15530318185081260x1080-1@2x.png"
                />
                <img
                  className="absolute top-[199px] left-[894px] w-[164px] h-[116px] object-cover"
                  alt=""
                  src="/image-29@2x.png"
                />
                <img
                  className="absolute top-[243px] left-[849px] w-[82px] h-[66px] object-cover"
                  alt=""
                  src="/image-27@2x.png"
                />
                {/* <div className="absolute top-[201px] left-[1192px] shadow-[-3px_4px_4px_rgba(0,_0,_0,_0.25)] w-[183.52px] h-[94px]">
                  <img
                    className="absolute top-[0px] left-[0px] w-[183.52px] h-[94px]"
                    alt=""
                    src="/vector-1.svg"
                  />
                  <img
                    className="absolute top-[14.92px] left-[33.78px] w-[131.96px] h-[53.39px] object-cover"
                    alt=""
                    src="/white-logo-11@2x.png"
                  />
                </div> */}
                
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Billboard;
