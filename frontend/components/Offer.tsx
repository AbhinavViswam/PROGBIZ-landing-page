import IosAndAndroid from "./button/IosAndAndroid";

function Offer() {
  return (
    <div className="w-full flex items-center justify-center py-16">
      <div className="max-w-lg flex flex-col items-center justify-center gap-8">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <p className="text-[#23262F] text-sm font-semibold">
            Special Launch offer
          </p>
          <h1 className="text-2xl sm:text-5xl font-semibold">
            Your journey to better health starts now
          </h1>
          <h4 className="text-[#777E90] text-sm">
            Get 50% off your first 3 months when you start your trial today!
          </h4>
        </div>
        <IosAndAndroid />
      </div>
    </div>
  );
}

export default Offer;
