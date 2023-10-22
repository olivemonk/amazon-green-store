"use client";

import {
  ChevronDown,
  PackageOpen,
  ShieldCheck,
  Star,
  TruckIcon,
} from "lucide-react";

import Currency from "@/components/ui/currency";
import Button from "@/components/ui/button";
import { Product } from "@/types";
import useCart from "@/hooks/use-cart";
import { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Package } from "lucide-react";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const [discountedPrice, setDiscountedPrice] = useState<number>(0);
  const [Discount, setDiscount] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);

  const onAddToCart = () => {
    cart.addItem(data);
  };

  useEffect(() => {
    const DiscountValue = Math.floor(Math.random() * 41) + 10;
    const randomRating = Math.floor(Math.random() * 5) + 1;
    setRating(randomRating);
    setDiscount(DiscountValue);

    const price = parseFloat(data?.price || "0");
    const discount = DiscountValue / 100;
    const discountedPriceValue = price * (1 - discount);
    setDiscountedPrice(discountedPriceValue);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <h3 className="text-base font-medium text-green-700 hover:underline hover:text-green-500">
        Visit {data.name.split(" ")[0]} Store
      </h3>
      <div className="flex mt-4 items-center">
        <p className="text-xl mr-2 text-green-700 font-semibold ">{rating}</p>
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            size={20}
            className={`${
              index < rating ? "text-green-500 fill-green-700" : "text-gray-400"
            }`}
            color={index < rating ? "green" : "green"}
          />
        ))}
        <ChevronDown
          className="hover:text-green-700 ml-1"
          size={20}
          color="grey"
        />
        <div className="ml-4">
          <p className="text-md text-gray-500 font-medium hover:text-gray-900">
            {rating * Discount} Ratings & Answered Questions{" "}
          </p>
        </div>
      </div>
      <hr className="my-4" />
      <div className="mt-2 flex gap-x-3">
        <Badge className="bg-slate-200 rounded-[4px] px-4 hover:cursor-pointer">
          <Image src="/eco.svg" height={20} width={20} alt="logo" />
          <p className="ml-1.5 text-[16px] py-1">AmazonEco</p>
        </Badge>
        <Badge className="bg-slate-200 rounded-[4px] hover:cursor-pointer px-4">
          <p className="text-[16px] py-1">Top Brand</p>
        </Badge>
      </div>
      <div className="mt-3 flex items-end justify-start">
        <p className="text-2xl text-gray-900">
          <Currency value={discountedPrice} />
        </p>
        <p className="text-base ml-2 font-semibold text-gray-600">M.R.P.</p>
        <p className="text-base line-through text-gray-600">
          <Currency value={data?.price} />
        </p>
        <p className="text-base ml-2 text-green-600 font-semibold">
          {Discount}% off
        </p>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.value}</div>
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
      </div>
      <hr className="my-4" />
      <div className="mt-2 flex gap-x-3">
        <Badge className="bg-slate-200 rounded-[4px] px-4 hover:cursor-pointer z-10">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <p className="flex items-center text-[16px] text-green-700 mr-1">
                Recycling Options{" "}
                <ChevronDown size={20} color="green" className="ml-1" />
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-200 text-gray-800">
              <DropdownMenuItem>
                <p>
                  {" "}
                  <span className="text-green-700 font-semibold">
                    Upcycling Workshops :
                  </span>{" "}
                  Host workshops to help people transform old tote bags into new
                  designs.
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-300" />
              <DropdownMenuItem>
                <p>
                  {" "}
                  <span className="text-green-700 font-semibold">
                    Bag Swap Events :
                  </span>
                  Organize events for swapping pre-owned tote bags, encouraging
                  reuse.
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-300" />
              <DropdownMenuItem>
                <p className="text-gray-900">
                  {" "}
                  <span className="text-green-700 font-semibold">
                    Composting :
                  </span>{" "}
                  Encourage the composting of biodegradable tote bags.
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-300" />
              <DropdownMenuItem>
                <p>
                  {" "}
                  <span className="text-green-700 font-semibold">
                    Donation to Charities :
                  </span>{" "}
                  Donate unsellable bags to charities for repurposing.
                </p>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-300" />
              <DropdownMenuItem>
                <p>
                  {" "}
                  <span className="text-green-700 font-semibold">
                    Educational Initiatives :
                  </span>{" "}
                  Provide recycling information to customers.
                </p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Badge>
        <Badge className="bg-slate-200 rounded-[4px] flex items-center hover:cursor-pointer px-4">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <p className="flex items-center text-[16px] text-green-700 mr-1">
                Certifications
                <ChevronDown size={20} color="green" className="ml-1" />
              </p>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-200 text-gray-800">
              <DropdownMenuItem>
                <Image
                  src="/certification1.svg"
                  width={20}
                  height={20}
                  alt="logo"
                />
                <p className="ml-2">Ecomark</p>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-300" />
              <DropdownMenuItem>
                <Image src="/eco.svg" width={18} height={18} alt="logo" />
                <p className="ml-2">AmazonEco</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Badge>
      </div>
      <div className="mt-4">
        {data?.category?.name === "Handbags" && (
          <div>
            <p className="font-semibold text-xl ">Product Description</p>
            <ul className="text-md">
              <li>
                &bull; Sustainable Materials: Crafted from eco-friendly,
                sustainable materials.
              </li>
              <li>
                &bull; Ethical Production: Made by artisans with fair wages and
                safe conditions.
              </li>
              <li>
                &bull; Minimal Environmental Impact: Reduced waste and
                eco-friendly packaging.
              </li>
              <li>
                &bull; Long-lasting Quality: Durable, designed for longevity.
              </li>
              <li>
                &bull; Stylish & Versatile: Fashion-forward, suitable for
                various occasions.
              </li>
            </ul>
          </div>
        )}
      </div>
      <hr className="my-4" />
      <p className="flex gap-x-2 text-lg items-center">
        Get upto {Number(rating * discountedPrice).toFixed(0)}
        <span>
          <Image src="/coin.svg" alt="coin" width={20} height={20} />
        </span>{" "}
        coins from this order{" "}
      </p>
      <div className="my-2 flex gap-x-2">
        <div className="p-3 flex items-center flex-col bg-gray-200 rounded-lg">
          <TruckIcon size={30} strokeWidth={1} color="gray" />
          <p className="text-xs font-medium text-gray-500 text-center">
            Community <br /> Delivery
          </p>
        </div>
        <div className="p-3 flex items-center flex-col bg-gray-200 rounded-lg">
          <Package size={30} strokeWidth={1} color="gray" />
          <p className="text-xs font-medium text-gray-500 text-center">
            Green <br /> Packaging
          </p>
        </div>
        <div className="p-3 flex items-center flex-col bg-gray-200 rounded-lg">
          <PackageOpen size={30} strokeWidth={1} color="gray" />
          <p className="text-xs font-medium text-gray-500 text-center">
            Green <br /> Delivery
          </p>
        </div>
        <div className="p-3 flex items-center flex-col bg-gray-200 rounded-lg">
          <ShieldCheck size={30} strokeWidth={1} color="gray" />
          <p className="text-xs font-medium text-gray-500 text-center">
            Secure <br /> Transaction
          </p>
        </div>
      </div>
      <hr className="my-6" />
      <div className="mt-2 flex items-center gap-x-3">
        <Button
          onClick={onAddToCart}
          className="flex w-full justify-center items-center gap-x-2"
        >
          Add To Cart
          {/* <ShoppingCart size={20} />/ */}
        </Button>
        <Button
          onClick={onAddToCart}
          className="flex w-full items- justify-center gap-x-2 bg-green-600"
        >
          Buy Now
          {/* <ShoppingCart size={20} /> */}
        </Button>
      </div>
    </div>
  );
};

export default Info;
