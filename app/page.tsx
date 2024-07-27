import Image from "next/image";
import { IconCard } from "./component/icon.card";
import { LongCard } from "./component/long.card";

export default function Home() {
  return (
    <div className="mx-10 py-3 justify-center flex flex-col">
      <div className="relative w-full h-64 ">
        {" "}
        <Image
          src="/banner.png"
          alt="Banner"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0"
        />
      </div>
      <div className="flex md:flex-row flex-col pt-5 my-5 border-y-2 border-dotted border-gray-300">
        <IconCard
          title="WEB DESIGN"
          subtitle="LOREM IPSUM DOLOR SIT AMET"
          number={1}
        />
        <IconCard
          title="WEB DEVELOPMENT"
          subtitle="LOREM IPSUM DOLOR SIT AMET"
          number={2}
        />
        <IconCard
          title="PRINT DESIGN"
          subtitle="LOREM IPSUM DOLOR SIT AMET"
          number={3}
        />
        <IconCard
          title="DIGITAL MEDIA"
          subtitle="LOREM IPSUM DOLOR SIT AMET"
          number={4}
        />
      </div>

      <div className="flex md:flex-row flex-col border-b-2 border-dotted border-gray-300">
        <LongCard
          title="WELCOME"
          subtitle="WHY WERE HERE AND WHAT WE DO"
          input={false}
        />
        <LongCard
          title="STAY UPDATED"
          subtitle="JOIN OUR MAILING LIS"
          input={true}
        />
      </div>
    </div>
  );
}
