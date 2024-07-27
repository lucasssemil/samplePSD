import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="w-[100vw] ">
      <div className=" justify-between flex md:flex-row flex-col sm:text-lg text-xs  border-b-4 mx-10 mt-4  border-sky-600">
        <div className="px-4 py-2 pr-">
          <Image src="/logo.png" alt="Logo" width={100} height={50} />
        </div>
        <div className="flex sm:flex-row text-sm flex-col gap-5 px-4 mr-4 pt-3">
          <div className="font-bold">HOME</div>
          <div className="font-bold">SHORTCODE</div>
          <div className="font-bold">PORTOFOLIO</div>
          <div className="font-bold">BLOG</div>
          <div className="font-bold">CONTACT</div>
        </div>
      </div>
    </div>
  );
};
