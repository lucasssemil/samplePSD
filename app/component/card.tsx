import { ReactNode } from "react";

export interface CardData {
  title: string;
  content?: ReactNode;
}

export const CardCustom = ({ title, content }: CardData) => {
  return (
    <div
      className={`rounded-3xl border-1 max-h-full w-fit border-gray-600 p-3 drop-shadow-md `}
    >
      <div className="rounded-xl border-2 border-white p-3">{content}</div>
    </div>
  );
};
