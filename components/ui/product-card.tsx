"use client";

import Image from "next/image";
import { MouseEventHandler, useState, useEffect } from "react";
import { Expand, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

import Currency from "@/components/ui/currency";
import IconButton from "@/components/ui/icon-button";
import usePreviewModal from "@/hooks/use-preview-modal";
import useCart from "@/hooks/use-cart";
import { Product } from "@/types";
import {
  ChevronDown,
  PackageOpen,
  ShieldCheck,
  Star,
  TruckIcon,
} from "lucide-react";

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();
  const [rating, setRating] = useState<number>(0);
  const [Discount, setDiscount] = useState<number>(0);

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };
  useEffect(() => {
    const DiscountValue = Math.floor(Math.random() * 41) + 10;
    const randomRating = Math.floor(Math.random() * 5) + 1;
    setRating(randomRating);
    setDiscount(DiscountValue);

    const price = parseFloat(data?.price || "0");
    const discount = DiscountValue / 100;
    const discountedPriceValue = price * (1 - discount);
    // setDiscountedPrice(discountedPriceValue);
  }, []);

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.addItem(data);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4"
    >
      {/* Image & actions */}
      {/* <div className="flex gap-x-4"> */}
      <div className="w-8 h-8 p-0">
        <Image src="/eco.svg" width={28} height={28} alt="logo" />
      </div>
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          src={data.images?.[0]?.url}
          alt=""
          fill
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-blue-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{data.name}</p>
        <div className="flex mt-1 items-center">
          <p className="text-xl mr-2 text-green-700 font-semibold ">{rating}</p>
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={20}
              className={`${
                index < rating
                  ? "text-green-500 fill-green-700"
                  : "text-gray-400"
              }`}
              color={index < rating ? "green" : "lightgreen"}
            />
          ))}
          <ChevronDown
            className="hover:text-green-700 ml-1"
            size={20}
            color="grey"
          />
          <div className="ml-4">
            <p className="text-sm text-gray-500 font-medium hover:text-gray-900">
              {rating * Discount} Ratings & Answered Questions{" "}
            </p>
          </div>
        </div>
        <p className="text-sm text-gray-500">{data.category?.name}</p>
      </div>
      {/* Price & Reiew */}
      <div className="flex items-center justify-between">
        <Currency value={data?.price} />
      </div>
      <div className="flex items-center text-md text-gray-500 font-bold">
          Get up to {" "}
          {Math.floor(Math.random() * 10) + 1} coins {" "}
                  <Image
                    src="/coin.svg"
                    alt="coin"
                    width={20}
                    height={20}
                  />{" "}
          from this order
      </div>
    </div>
  );
};

export default ProductCard;
