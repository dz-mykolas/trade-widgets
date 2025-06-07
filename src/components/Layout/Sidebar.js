import { FaCoins, FaCompass, FaWallet, FaGem } from "react-icons/fa";
import { AiOutlineDashboard } from "react-icons/ai";
import NavItem from "../NavItem";

export default function Sidebar() {
  const navItems = [
    { name: "Dashboard", icon: AiOutlineDashboard },
    { name: "Trenches", icon: FaCoins, active: true },
    { name: "Explore", icon: FaCompass },
    { name: "Wallets", icon: FaWallet },
    { name: "Portfolio", icon: FaGem },
  ];

  return (
    <aside className="w-15 flex flex-col shadow-lg items-center">
      <div className="bg-[#1f1f2b] rounded-2xl text-xl font-bold text-white h-[58px] w-[58px] flex items-center justify-center">cltz</div>
      <div className="flex flex-col gap-5 p-2 w-[60px]">
        <nav className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavItem key={item.name} {...item} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
