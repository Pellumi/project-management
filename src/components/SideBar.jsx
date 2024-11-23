import React from "react";
import { Link, useParams } from "react-router-dom";
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

const SideBar = () => {
  const pathname = useParams();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-4 py-2">
          <Package2 className="h-6 w-6 text-primary mr-2" />
          <span className="font-bold text-xl">MaxHelp</span>
        </div>
        <div className="px-4 py-2">
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
        </div>
      </SidebarHeader>
      <SidebarContent>
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
        <DropdownMenu open={isOpen} onOpenChange={toggleDropdown}>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="w-full justify-start">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span>John Doe</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs leading-none text-muted-foreground">
                  john@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default SideBar;
