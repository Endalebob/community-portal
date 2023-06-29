import React from "react";
import Image from "next/image";

const Partners: React.FC = () => {
  const images = ["palantir", "meta", "google", "data-bricks", "instadeep"];
  return (
    <div className="flex justify-center items-center my-auto  mb-8 w-full mt-16 gap-16 max-w-8xl flex-wrap px-20">
      {images.map((url, index) => (
        <Image
          key={index}
          src={`/images/home/partners/${url}.png`}
          alt={`${index}`}
          width={250}
          height={500}
          className="w-44 h-24 object-contain"
        />
      ))}
    </div>
  );
};

export default Partners;
