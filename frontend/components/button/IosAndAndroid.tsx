import { IconBrandApple, IconBrandGooglePlay } from "@tabler/icons-react";

function IosAndAndroid() {
  return (
    <div className="flex items-center justify-center gap-4">
      <button className="flex items-center justify-center gap-1 bg-white rounded-full px-4 py-2 cursor-pointer transition-all hover:scale-105 duration-200 shadow-sm">
        <IconBrandApple fill="black" size={28} />
        <span className="text-sm sm:text-lg font-bold">Download</span>
      </button>
      <button className="flex items-center justify-center gap-1 bg-white rounded-full px-4 py-2 cursor-pointer transition-all hover:scale-105 duration-200 shadow-sm">
        <IconBrandGooglePlay size={28} />
        <span className="text-sm sm:text-lg font-bold">Download</span>
      </button>
    </div>
  );
}

export default IosAndAndroid;
