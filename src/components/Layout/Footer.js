import { FaBolt } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="flex items-center justify-between pt-2.5 shadow-inner z-10">
      <div className="flex items-center gap-6">
        <button className="h-7 flex items-center gap-1 p-2 bg-green-500 text-black rounded-md font-normal hover:bg-green-600 transition-colors text-[12px]">
          <FaBolt className="stroke-black stroke-[30px] text-[12px] text-yellow-500" />
          Fast
        </button>
      </div>
    </footer>
  );
}
