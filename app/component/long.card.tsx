import { CardData } from "./card";
import Image from "next/image";

export interface CardIconData extends CardData {
  subtitle: string;
  input: boolean;
}

export const LongCard = ({ title, subtitle, input }: CardIconData) => {
  return (
    <div
      className={`rounded-3xl border-1 max-h-full w-fit border-gray-600 px-3 drop-shadow-md `}
    >
      <div className="font-semibold 3xs:text-lg text-xs">{title}</div>
      <div className="font-normal 3xs:text-xs text-3xs text-orange-400">
        {subtitle}
      </div>
      <div className="py-3">
        <div className="text-xs">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin
            suscipit suscipit nunc, nec aliquam eros. Integer vitae ligula
            felis. Praesent ut est fringilla, tincidunt sem vel, interdum orci.
          </p>
        </div>
        {input ?? (
          <div className="bottom-0 static text-xs px-6 py-4">
            <Image src={`/mail.png`} alt="Logo" fill height={50} />
          </div>
        )}
      </div>
    </div>
  );
};
