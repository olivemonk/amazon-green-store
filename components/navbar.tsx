import Link from "next/link";

import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import NavbarActions from "@/components/navbar-actions";
import getCategories from "@/actions/get-categories";
import Image from "next/image";

const Navbar = async () => {
  const categories = await getCategories();

  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-2 mt-3 flex lg:ml-0 gap-x-2">
            {/* <p className="font-bold text-xl">Amazon Green</p> */}
            <Image src="/logo.png" width={100} height={50} alt="logo" />
          </Link>
          <div className="group">
            <b className="absolute top-[23px] left-[282px] text-base text-limegreen group-hover:text-green-600 cursor-pointer transition-colors">
              Home
            </b>
          </div>
          <div className="group">
            <div className="absolute top-[23px] left-[371px] text-base font-medium text-gainsboro group-hover:text-green-600 cursor-pointer transition-colors">
              Green Deals
            </div>
          </div>
          <div className="group">
            <div className="absolute top-[23px] left-[503px] text-base font-medium text-gainsboro group-hover:text-green-600 cursor-pointer transition-colors">
              Best Sellers
            </div>
          </div>
          <div className="absolute top-[23px] left-[632px] w-[89.36px] h-[19px] text-base text-gainsboro">
        <div className="absolute top-[0px] left-[0px] font-medium  hover:text-green-600 cursor-pointer transition-colors">
          Categories
        </div>
        <Image
          className="absolute h-[28.95%] w-[11.04%] top-[48.68%] right-[-0.84%] bottom-[27.37%] left-[89.8%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/vector.svg"
          width={100} height={50}
        />
      </div>
      {/* <div className="absolute h-[2.75%] w-[1.79%] top-[2.04%] right-[7.67%] bottom-[95.21%] left-[90.54%] text-[7px] text-white">
        <Image
          className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
          alt=""
          src="/vector1.svg"
          width={100} height={50}
        />
        <div className="absolute top-[0px] left-[17px] w-2.5 h-2.5">
          <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-limegreen w-2.5 h-2.5" />
          <b className="absolute top-[0px] left-[3px] inline-block w-[5px] h-[9px]">
            2
          </b>
        </div>
      </div> */}
      <Image
        className="absolute h-[2.75%] w-[1.79%] top-[2.04%] right-[11.24%] bottom-[95.21%] left-[86.97%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/vector2.svg"
        width={100} height={50}
      />
          <MainNav data={categories} />
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
