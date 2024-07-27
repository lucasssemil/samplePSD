import { CardData } from "./card";
import Image from "next/image";

export interface CardIconData extends CardData {
  subtitle: string;
  number: number;
}

export const IconCard = ({
  title,
  content,
  subtitle,
  number,
}: CardIconData) => {
  return (
    <div
      className={`rounded-3xl border-1 max-h-full w-fit border-gray-600 px-3 drop-shadow-md `}
    >
      <div className="font-semibold 3xs:text-sm text-xs">{title}</div>
      <div className="font-normal 3xs:text-xs text-3xs text-orange-400">
        {subtitle}
      </div>
      <div className="p-3">
        <div className="flex-wrap text-xs">
          <Image
            src={`/box${number}.png`}
            alt="Logo"
            width={50}
            height={50}
            className="inline-block mr-4 mb-2 float-left"
          />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            suscipit suscipit nunc, nec aliquam eros. Integer vitae ligula
            felis. Praesent ut est fringilla, tincidunt sem vel, interdum orci.
          </p>
        </div>
        <div className="bottom-0 static text-xs px-6 py-4"> Read More </div>
        {content}
      </div>
    </div>
  );
};
