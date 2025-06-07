export default function NavItem({ name, icon: Icon, active }) {
  return (
    <a
      href="#"
      className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
        active
          ? " text-white text-[10px] flex flex-col"
          : "hover:text-foreground text-gray-500 text-[10px] flex-col"
      }`}
    >
      <Icon className="text-lg" />
      <span>{name}</span>
    </a>
  );
}
