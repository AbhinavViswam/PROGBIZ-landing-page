"use client";
import { UserContext } from "@/config/userContext";
import Image from "next/image";
import { useContext } from "react";
import LoginModal from "./login/loginModal";
import { useRouter } from "next/navigation";

function Navbar() {
  const { user } = useContext(UserContext);
  const router = useRouter();

  return (
    <section className="flex items-center justify-between py-6 px-10 sticky top-0 left-0 bg-white z-50 shadow-sm">
      <div className="flex items-center justify-center gap-1">
        <Image src={"/logo-64.png"} alt="logo" width={30} height={30} />
        <h2 className="text-lg font-bold">Reppoo</h2>
      </div>

      {user ? (
        <div className="flex items-center justify-center gap-1">
          <div className="flex items-center justify-center gap-1">
            <div className="w-8 h-8 relative rounded-full overflow-hidden bg-[#FFBC99]" />
            <div className="flex flex-col items-start justify-center">
              <p className="text-sm font-semibold">{user?.name || "Admin"}</p>
              <p className="text-xs">{user?.email || "admin@mail"} </p>
            </div>
          </div>
          <button
            onClick={() => router.push("/edit")}
            className="border border-blue-600 px-4 py-1 rounded-2xl text-xs text-blue-600 cursor-pointer"
          >
            Edit
          </button>
        </div>
      ) : (
        <LoginModal />
      )}
    </section>
  );
}

export default Navbar;
