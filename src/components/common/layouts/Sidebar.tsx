import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiHome,
  FiFilePlus,
  FiUserPlus,
  FiUsers,
  FiEdit,
  FiEye,
} from "react-icons/fi";

type SidebarProps = {
  isOpen?: boolean;
};

function Sidebar({ isOpen }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      section: "Dashboard",
      items: [{ label: "Dashboard", icon: FiHome, href: "/Dashboard" }],
    },
    {
      section: "Quotation",
      items: [
        { label: "Add Quotation", icon: FiFilePlus, href: "/AddQuotation" },
        { label: "Manage Quotations", icon: FiEdit, href: "/ManageQuotations" },
      ],
    },
    {
      section: "Invoice",
      items: [
        { label: "Add Invoice", icon: FiFilePlus, href: "/AddInvoice" },
        { label: "Manage Invoices", icon: FiEdit, href: "/ManageInvoices" },
      ],
    },
    {
      section: "Slip",
      items: [
        { label: "Create Slip", icon: FiEdit, href: "/CreateSlip" },
        { label: "View Slip", icon: FiEye, href: "/ViewSlip" },
      ],
    },
    {
      section: "Clients",
      items: [
        { label: "Add Client", icon: FiUserPlus, href: "/AddClient" },
        { label: "Manage Clients", icon: FiUsers, href: "/ManageClients" },
      ],
    },
  ];

  return (
    <div
      className={`absolute top-6 md:top-0 left-0 z-40 overflow-y-auto h-full w-[260px] bg-white shadow-sm border-r border-gray-200
        transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
    >
      <ul className="flex flex-col space-y-2 px-0 pt-2">
        {menuItems.map((section) => (
          <div key={section.section}>
            <p className="text-xs font-bold text-gray-500 uppercase px-6 py-1">
              {section.section}
            </p>

            {section.items.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.label} href={item.href} className="w-full">
                  <li
                    className={`flex items-center space-x-3 pl-6 pr-0 py-3 w-full font-medium text-sm cursor-pointer transition-all duration-150
                      ${isActive
                        ? "bg-gray-100 text-blue-600 border-r-4 border-blue-500"
                        : "text-gray-700 hover:bg-gray-50 hover:border-r-4 border-transparent hover:border-blue-400"
                      }`}
                  >
                    <Icon
                      size={24}
                      className={`p-1.5 rounded ${
                        isActive
                          ? "bg-blue-500 text-white"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    />
                    <span>{item.label}</span>
                  </li>
                </Link>
              );
            })}
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
