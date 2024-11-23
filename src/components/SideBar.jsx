import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Book,
  DollarSign,
  Home,
  Package2,
  Search,
  UtensilsCrossed,
  User,
  Droplet,
  Settings,
  MessageSquare,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/SideNavBar";
import { Input } from "./ui/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/DropDown";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Button } from "./ui/Button";
import { Card } from "./ui/Card";

const SideBar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Inventory", href: "/inventory", icon: Package2 },
    { name: "Sales", href: "/sales", icon: DollarSign },
    { name: "Restaurant", href: "/restaurant", icon: UtensilsCrossed },
    { name: "Bookshop", href: "/bookshop", icon: Book },
    { name: "Water", href: "/water", icon: Droplet },
    { name: "Feedback", href: "/feedback", icon: MessageSquare },
    { name: "Report", href: "/reports", icon: Droplet },
  ];

  const pathname = useParams();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex h-[52px] items-center px-4">
          <Package2 className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl">MaxHelp</span>
        </div>
        {/* <div className="px-4 py-2">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full pl-8"
              />
            </div>
          </form>
        </div> */}
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-center">
        <SidebarMenu>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link
                      to={item.href}
                      className="flex items-center w-full h-full"
                    >
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger onClick={toggleDropdown}>
            <div className="w-full justify-start bg-transparent">
              <Avatar className="h-9 w-9 mr-2">
                <AvatarFallback>MH</AvatarFallback>
              </Avatar>
              <span>{user.role}</span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-56 top-[calc(-16px-93px)]"
            open={isOpen}
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user.role}</p>
                <p className="text-xs leading-none text-muted-foreground">
                  {user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLogOut()}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
