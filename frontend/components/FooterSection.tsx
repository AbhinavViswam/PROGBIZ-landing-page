"use client";

import Image from "next/image";
import {
  IconBrandFacebook,
  IconBrandTwitter,
  IconBrandInstagram,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full">
      <div className="flex items-center justify-between w-full px-20 py-8">
        <div className="flex flex-col items-start justify-center gap-1">
         <div className="flex items-center justify-center gap-1">
             <Image src={"/logo-64.png"} alt="logo" width={30} height={30} />
          <h2 className="text-lg font-bold">Reppoo</h2>
         </div>

          <div className="flex flex-col items-start justify-center gap-1">
            <span className="max-w-xs sm:max-w-sm text-xs">
              innovative health assistant app that leverages artificial
              intelligence to provide personalized wellness recommendations.
            </span>
            <span className="text-xs hover:underline cursor-pointer">hello@reppoo.com</span>
          </div>
        </div>
        <div className="flex items-start justify-center gap-4 sm:gap-20">
          <div className=" flex flex-col gap-1">
            <span className="font-semibold text-sm">Company</span>
            <Link href={"#"} className="text-[#696B68] text-xs">Home</Link>
            <Link href={"#"} className="text-[#696B68] text-xs">Early access</Link>
            <Link href={"#"} className="text-[#696B68] text-xs">404</Link>
          </div>
          <div className=" flex flex-col gap-1">
            <span className="font-semibold text-sm">App</span>
            <Link href={"#"} className="text-[#696B68] text-xs">Download for IOS</Link>
            <Link href={"#"} className="text-[#696B68] text-xs">Download for Android</Link>
          </div>
          <div className=" flex flex-col gap-1">
            <span className="font-semibold text-sm">Legal Pages</span>
            <Link href={"#"} className="text-[#696B68] text-xs">Privacy Policy</Link>
            <Link href={"#"} className="text-[#696B68] text-xs">Terms & Conditions</Link>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-200 my-4"></div>

      <div className="flex items-center justify-between w-full px-20 pb-8">
        <span className="text-xs">© Copyright Reppoo</span>
        <div className="flex items-center gap-4">
          <IconBrandFacebook size={18} />
          <IconBrandTwitter size={18} />
          <IconBrandInstagram size={18} />
          <IconBrandLinkedin size={18} />
        </div>
      </div>
    </footer>
  );
}