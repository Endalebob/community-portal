import React from "react";
import Image from "next/image";

const Partners: React.FC = () => {
  const images = ["palantir", "meta", "google", "data-bricks", "instadeep"];
  return (
    <div className="bg-slate-100 h-full mx-auto my-auto  mb-8 w-full">
      <p className="text-xl mt-8 ml-8 md:ml-24 text-secondary-text font-semibold">
        These and other companies partnered with us
      </p>
      <div
        id="partners"
        className="grid grid-cols-2 ml-8 mr-8 gap-x-8 md:grid-cols-3 lg:grid-cols-5"
      >
        {images.map((url, index) => (
          <div key={index} className="pt-8 pb-8">
            <Image
              src={`/images/home/partners/${url}.png`}
              alt={`${index}`}
              width={250}
              height={500}
              className=""
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
