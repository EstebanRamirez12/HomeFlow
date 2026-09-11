import Logo from "../../assets/pig_icon2.png";
import { MoreVertical, ChevronLast, ChevronFirst } from "lucide-react";
import { useContext, createContext, useState } from "react";
import { NavLink } from "react-router-dom";


const SidebarContext = createContext<{ expanded: boolean } | null>(null);

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <aside
      className={`h-screen shrink-0 transition-all duration-300 ${
        expanded ? "w-64" : "w-20"
      }`}
    >
      <nav className="h-full flex flex-col bg-white border-r border-gray-200 shadow-sm overflow-x-hidden">
        <div className="p-4 pb-2 flex items-center justify-between">
          <div
            className={`overflow-hidden transition-all duration-300 ${
              expanded ? "w-20 opacity-100" : "w-0 opacity-0"
            }`}
          >
            <img src={Logo} className="w-15" alt="Logo" />
          </div>

          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-full bg-gray-50 hover:bg-gray-100 flex-shrink-0"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 mb-5 overflow-y-auto overflow-x-hidden">
            {children}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t border-gray-200 flex items-center p-3">
          <label className="w-10 h-10 rounded-full text-blue-500 font-bold bg-blue-100 flex items-center justify-center">
            MR
          </label>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              expanded ? "ml-3 w-40 opacity-100" : "ml-0 w-0 opacity-0"
            }`}
          >
            <div className="leading-4">
              <h4 className="font-semibold">John Doe</h4>
              <span className="text-xs text-gray-600">johndoe@gmail.com</span>
            </div>
          </div>

          <div
            className={`transition-all duration-300 ${
              expanded ? "opacity-100 ml-2" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            <MoreVertical size={20} />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, href, alert }) {
  const context = useContext(SidebarContext);
  const expanded = context?.expanded ?? true;

  return (
    <li className="group relative flex items-center w-full transition-colors duration-200 mt-1">
      <NavLink
        to={href}      
        className={({ isActive }) =>
          `
            relative flex items-center w-full rounded-md cursor-pointer
            px-2 py-2 transition-colors duration-200
            ${expanded ? "justify-start" : "justify-center"}
            ${
              isActive
                ? "bg-indigo-100 text-indigo-800 font-semibold"
                : "bg-white text-gray-600 hover:bg-indigo-50"
            }
          `
        }
      >
        <span className="flex h-8 w-8 items-center justify-center shrink-0">
          {icon}
        </span>

        <span
          className={`
            inline-block overflow-hidden whitespace-nowrap
            transition-all duration-300
            ${
              expanded
                ? "ml-3 max-w-40 opacity-100"
                : "ml-0 max-w-0 opacity-0"
            }
          `}
        >
          {text}
        </span>

        {alert && (
          <span
            className={`absolute right-2 top-3 h-2 w-2 rounded-full bg-indigo-400 ${
              !expanded ? "right-1.5 top-1.5" : ""
            }`}
          />
        )}
      </NavLink>

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-2 py-1 ml-6
            bg-indigo-100 text-indigo-800 text-sm
            invisible opacity-0 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}