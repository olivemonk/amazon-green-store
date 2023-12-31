"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// import { FaCheck } from 'react-icons/fa';
import {
  TruckIcon,
  Package,
  PackageOpen,
  ShieldCheck,
  PackageCheckIcon,
  Boxes,
  CheckCheck,
  Leaf,
  Footprints,
} from "lucide-react";

const Summary = () => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);
  const [selectedPackaging, setSelectedPackaging] = useState<string | null>(null);
  const [selectedDelivery, setSelectedDelivery] = useState<string | null>(null) ;
  const [randomGreenPoints, setRandomGreenPoints] = useState(0);
  const [randomCarbonFootprintReduction, setRandomCarbonFootprintReduction] =
    useState(0);
  const [impactMessage, setImpactMessage] = useState("");
  const [showThankYou, setShowThankYou] = useState(false);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
    if (
      selectedPackaging === "Green" ||
      (selectedPackaging === "Minimal" &&
        (selectedDelivery === "Community" || selectedDelivery === "EcoFlex"))
    ) {
      setShowThankYou(true);
      const timer = setTimeout(() => {
        setShowThankYou(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, removeAll, selectedPackaging, selectedDelivery]);

  const onDeliveryOptionClick = (option:string) => {
    if (selectedDelivery === option) {
      setSelectedDelivery(null);
    } else {
      setSelectedDelivery(option);
      setRandomValues(deliveryOptionsInfo[option]);
    }
  };
  const onPackageOptionClick = (option:string) => {
    if (selectedPackaging === option) {
      setSelectedPackaging(null);
    } else {
      setSelectedPackaging(option);
      setRandomValues(packagingOptionsInfo[option]);
    }
  };
  type OptionInfo = {
    greenPoints: number;
    carbonFootprintReduction: number;
    impactMessage: string;
  };
  const getRandomValue = (baseValue: any) => {
    const randomFactor = 0.8 + Math.random() * 0.4;
    return Math.floor(baseValue * randomFactor);
  };
  const setRandomValues = (optionInfo: OptionInfo) => {
    setRandomGreenPoints(getRandomValue(optionInfo.greenPoints));
    setRandomCarbonFootprintReduction(getRandomValue(optionInfo.carbonFootprintReduction));
    setImpactMessage(optionInfo.impactMessage);
  };
  const calculateDeliveryCharges = () => {
    let deliveryCharges = 0;
    if (selectedDelivery === "Prime") {
      deliveryCharges += 0.05 * totalPrice;
    }
    if (selectedDelivery === "Standard") {
      deliveryCharges += 0.03 * totalPrice;
    } else if (selectedDelivery === "Community") {
      deliveryCharges -= 0.01 * totalPrice;
    } else if (selectedDelivery === "EcoFlex") {
      deliveryCharges -= 0.02 * totalPrice;
    }
    return deliveryCharges;
  };
  const calculatePackagingCharges = () => {
    let packagingCharges = 0;

    if (selectedPackaging === "Standard") {
      packagingCharges += 0.03 * totalPrice;
    }
    if (selectedPackaging === "Green") {
      packagingCharges += 0.02 * totalPrice;
    } else if (selectedPackaging === "Minimal") {
      packagingCharges -= 0.02 * totalPrice;
    }
    return packagingCharges;
  };

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);
  const deliveryCharges = calculateDeliveryCharges();
  const packagingCharges = calculatePackagingCharges();
  const extraCharges = deliveryCharges + packagingCharges;
  const finalTotal = totalPrice + extraCharges;
  const amountSaved = totalPrice - finalTotal;
  // const baseValues = {
  //   Standard: { greenPoints: 0, carbonFootprintReduction: 0 },
  //   Prime: { greenPoints: 2, carbonFootprintReduction: 5 },
  //   Community: { greenPoints: 5, carbonFootprintReduction: 10 },
  //   EcoFlex: { greenPoints: 8, carbonFootprintReduction: 15 },
  //   Green: { greenPoints: 5, carbonFootprintReduction: 8 },
  //   Minimal: { greenPoints: 7, carbonFootprintReduction: 12 },
  // };

  const onCheckout = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
      {
        productIds: items.map((item) => item.id),
      }
    );

    window.location = response.data.url;
  };

  const packagingOptionsInfo: Record<string,OptionInfo> = {
    Standard: {
      greenPoints: 0,
      carbonFootprintReduction: 0,
      impactMessage:
        "Choosing Standard options may result in a higher carbon footprint.",
    },
    Green: {
      greenPoints: Math.floor(Math.random() * 10 + 1),
      carbonFootprintReduction: Math.floor(Math.random() * 5 + 1),
      impactMessage:
        "Opting for Green packaging contributes to a healthier environment.",
    },
    Minimal: {
      greenPoints: Math.floor(Math.random() * 10 + 1),
      carbonFootprintReduction: Math.floor(Math.random() * 5 + 1),
      impactMessage:
        "Minimal packaging minimizes waste and environmental impact.",
    },
  };

  const deliveryOptionsInfo: Record<string,OptionInfo> = {
    Standard: {
      greenPoints: 0,
      carbonFootprintReduction: 0,
      impactMessage:
        "Choosing Standard options may result in a higher carbon footprint.",
    },
    Prime: {
      greenPoints: Math.floor(Math.random() * 10 + 1),
      carbonFootprintReduction: Math.floor(Math.random() * 5 + 1),
      impactMessage:
        "Prime delivery helps reduce carbon emissions and earns you green points.",
    },
    Community: {
      greenPoints: Math.floor(Math.random() * 10 + 1),
      carbonFootprintReduction: Math.floor(Math.random() * 5 + 1),
      impactMessage: "Community delivery contributes to a greener planet.",
    },
    EcoFlex: {
      greenPoints: Math.floor(Math.random() * 10 + 1),
      carbonFootprintReduction: Math.floor(Math.random() * 5 + 1),
      impactMessage:
        "Choosing EcoFlex delivery reduces carbon footprint while earning green points.",
    },
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      {/* {showThankYou && (
        <div className="absolute top-0 p-4  mt-2 mr-2 bg-green-500 text-white font-black rounded-lg shadow-lg">
          Thank you for trying to save the environment!
        </div>
      )} */}
      <h2 className="text-lg font-bold text-gray-900">Order summary</h2>
      <div className="mt-6 space-y-4">
        <h3 className="text-base font-medium text-gray-900 mb-2">
          Choose Delivery:
        </h3>
        <div className="my-2 flex gap-x-2">
          <br />
          <TooltipProvider>
            {["Prime", "Standard", "Community", "EcoFlex"].map((option) => (
              <Tooltip key={option}>
                <TooltipTrigger asChild>
                  <div
                    className={`p-3 flex items-center flex-col rounded-lg cursor-pointer ${
                      selectedDelivery === option
                        ? "bg-blue-200"
                        : "bg-gray-200"
                    }`}
                    onClick={() => onDeliveryOptionClick(option)}
                  >
                    {option === "Prime" && (
                      <PackageCheckIcon
                        size={30}
                        strokeWidth={1}
                        color="gray"
                      />
                    )}
                    {option === "Standard" && (
                      <TruckIcon size={30} strokeWidth={1} color="gray" />
                    )}
                    {option === "Community" && (
                      <Boxes size={30} strokeWidth={1} color="gray" />
                    )}
                    {option === "EcoFlex" && (
                      <PackageOpen size={30} strokeWidth={1} color="gray" />
                    )}
                    <span className="text-xs font-black text-gray-500 text-center">
                      {option}
                    </span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-green-100 font-semibold p-2 rounded-lg opacity-80">
                  <p>
                    {option === "Prime"
                      ? "Prime Delivery: Fast, expedited service for quick deliveries, prioritizing speed and efficiency."
                      : option === "Standard"
                      ? "Standard Delivery: Conventional delivery service with regular shipping times, offering a balance between speed and eco-conscious practices."
                      : option === "Community"
                      ? "Community Delivery: Centralized pick-up points reduce travel, earning users green coins."
                      : option === "EcoFlex"
                      ? "EcoFlex Delivery: Opt for longer delivery times, reducing rush deliveries, promoting sustainable logistics."
                      : ""}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
      <div>
        <h3 className="text-base font-medium text-gray-900 mt-4 mb-2">
          Choose Packaging:{" "}
        </h3>
        <div className="my-2 flex gap-x-2">
          <TooltipProvider>
            {["Standard", "Green", "Minimal"].map((option) => (
              <Tooltip key={option}>
                <TooltipTrigger asChild>
                  <div
                    className={`flex items-center flex-col justify-between p-3 rounded-lg cursor-pointer ${
                      selectedPackaging === option
                        ? "bg-blue-200"
                        : "bg-gray-200"
                    }`}
                    onClick={() => onPackageOptionClick(option)}
                  >
                    <div className="flex items-center gap-x-1">
                      {option === "Standard" && (
                        <Package size={30} strokeWidth={1} color="gray" />
                      )}
                      {option === "Green" && (
                        <Leaf size={30} strokeWidth={1} color="gray" />
                      )}
                      {option === "Minimal" && (
                        <ShieldCheck size={30} strokeWidth={1} color="gray" />
                      )}
                      <span className="text-xs font-black text-gray-500 text-center">
                        {option}
                      </span>
                    </div>
                    {selectedPackaging === option && (
                      <CheckCheck
                        size={20}
                        className="text-green-500 mt-2 mr-2"
                      />
                    )}
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-green-100 font-semibold p-2 rounded-lg opacity-80">
                  <p>
                    {option === "Standard"
                      ? "Standard Packaging: Regular packaging methods for safe delivery without additional environmental considerations."
                      : option === "Green"
                      ? "Green Packaging: Minimal eco-packaging, green coins, and vouchers as rewards."
                      : option === "Minimal"
                      ? "Minimal Packaging: Eco-friendly, minimal packaging to reduce waste and environmental impact during delivery."
                      : ""}
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </div>
      {selectedPackaging && selectedDelivery && (
        <div
          className={`mt-6 rounded-lg p-4 ${
            selectedDelivery === "Standard" ? "bg-red-200" : "bg-green-200"
          }`}
        >
          <p
            className={`${
              selectedDelivery === "Standard"
                ? "text-red-500"
                : "text-green-500"
            } font-medium text-lg mb-2`}
          >
            {impactMessage}
          </p>
          {selectedPackaging && selectedDelivery && (
            <div className="mt-4 space-y-2">
              <div className=" text-lg font-bold text-gray-900">
                Impact Details
              </div>
              <div className="flex items-center font-semibold text-base text-lime-700">
                <span className="text-green-600">
                  <Leaf size={24} className="mr-2" />
                </span>
                Green Coins Earned:{" "}
                <span className="font-bold">{randomGreenPoints}</span>{" "}
                <span>
                  {" "}
                  <Image
                    src="/coin.svg"
                    alt="coin"
                    width={20}
                    height={20}
                  />{" "}
                </span>
              </div>
              <div className="flex items-center font-semibold text-base text-green-600">
                <span className="text-red-600">
                  <Footprints size={24} className="mr-2" color="black" />
                </span>
                Carbon Footprint Reduction:{" "}
                <span className="font-bold">
                  {randomCarbonFootprintReduction}%
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="mt-6 space-y-4">
        <div className="border-t border-gray-200 pt-4">
          <div className="text-base font-bold text-green-600 hover:underline hover:text-green-400">
            Order Breakdown
          </div>
          <div className="text-base text-gray-900 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Base Cost</span>
              <Currency value={totalPrice} />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Delivery Charges</span>
              <Currency value={deliveryCharges} />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Packaging Charges</span>
              <Currency value={packagingCharges} />
            </div>
          </div>
        </div>
        {extraCharges !== 0 && (
          <div className="text-base text-gray-900 space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Extra Charges</span>
              <Currency value={extraCharges} />
            </div>
            <div className="text-red-500 text-sm">
              (All extra charges contribute to saving the environment)
            </div>
          </div>
        )}
        {amountSaved > 0 && (
          <div className="mt-6 text-green-500 font-medium flex items-center space-x-2">
            <span>
              <CheckCheck size={24} />
            </span>
            You are saving money and the environment! Good Job!
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="font-bold">Total :</span>
          <Currency value={finalTotal} />
        </div>
        <Button
          onClick={onCheckout}
          disabled={items.length === 0}
          className="w-full mt-6"
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Summary;
