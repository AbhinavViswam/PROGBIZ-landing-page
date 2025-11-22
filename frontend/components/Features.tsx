import Image from "next/image";

function Features() {
  return (
    <div className="bg-[#FCFCFD] flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-0 sm:justify-between p-8 sm:p-16">
      <div className="w-full sm:max-w-xl flex flex-col items-start justify-center gap-6">
        <h1 className="text-[#23262F] font-black text-4xl">
          Maximizing your Health potential together
        </h1>
        <div className="flex flex-col gap-1">
          <p className="text-[#23262F] text-base font-semibold">subtitle hereee</p>
          <p className="text-[#777E90] text-sm w-full sm:max-w-[30vw]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. In, ullam
            reprehenderit quo velit dolorem id veritatis dicta labore harum
            similique.
          </p>
        </div>
        <button className="bg-white cursor-pointer hover:scale-105 transition-all duration-200 text-sm font-semibold shadow-sm py-2 px-4 rounded-full">
          Read More
        </button>
      </div>
      <div className="bg-[#F4F5F6] relative h-auto sm:h-[50vh] w-full sm:max-w-lg p-2 rounded-xl">
        <Image
          alt="img"
          src={"/kkk"}
          fill
          className="object-contain rounded-xl"
        />
      </div>
    </div>
  );
}

export default Features;
