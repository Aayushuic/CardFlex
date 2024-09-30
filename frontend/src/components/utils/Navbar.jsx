import React, { useState } from "react";
import {
  ChevronDown,
  Menu,
  X,
  ShoppingCart,
  Search,
  User,
  Home,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { logout } from "@/features/authslice";

const Navbar = ({ setSearchDialog }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedDropdown, setSelectedDropdown] = useState("");
  const isUser = useSelector((state) => state.auth.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let cartCount = 0;
  if (isUser?.cart) {
    cartCount = isUser.cart.length;
  }
  const dropdownData = [
    {
      title: "Invitation Card",
      items: [
        { name: "Baby shower" },
        { name: "Barsi Card" },
        { name: "Bhagwat" },
        { name: "Birthday Card" },
        { name: "Griha pravesh" },
        { name: "Namkaran" },
        { name: "Opening" },
        { name: "Wedding card" },
        { name: "Festival" },
      ],
    },
    {
      title: "Template",
      items: [
        { name: "Poster" },
        { name: "Business Card" },
        { name: "Menu Card" },
        { name: "Certificate" },
        { name: "Screen Offset" },
      ],
    },
    {
      title: "ID Card",
      items: [{ name: "Company" }, { name: "Employee" }, { name: "Student" }],
    },
    {
      title: "Banner",
      items: [{ name: "Shop Banner" }, { name: "Festival Banner" }],
    },
    {
      title: "Invoice",
      items: [
        { name: "Bill Book" },
        { name: "Letter Head" },
        { name: "Rasid Book" },
      ],
    },
  ];
  const handleLinkClick = () => {
    setIsSidebarOpen(false);
  };

  const handleDropdownLinkClick = (dropdownTitle) => {
    setSelectedDropdown("");
    setIsSidebarOpen(false);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/user/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "x-api-key": import.meta.env.VITE_API_KEY,
          "X-CSRF-Token": localStorage.getItem("csrfToken"),
        },
      });

      const responseData = await response.json();
      if (responseData.success == true) {
        toast(responseData.message);
        dispatch(logout());
        navigate("/");
      }
    } catch (error) {
      toast(error.message || error);
    }
  };
  return (
    <>
      <nav className="flex items-center sticky top-0 z-40 justify-between p-4 shadow-md bg-[#FF407D] dark:bg-gray-800 text-white">
        {/* Logo */}
        <div className="flex items-baseline m-0 sm:ml-6">
          <p className="text-white text-3xl font-bold">C</p>
          <p className="text-white text-xl font-semibold">ard</p>
          <p className="text-[#24509d] text-3xl leading-none font-bold">F</p>
          <p className="text-[#24509d] text-xl font-semibold">lex</p>
        </div>
        {/* Centered Dropdown Menus - Desktop Only */}
        <div className="hidden lg:flex flex-1 justify-center space-x-4">
          <button className="font-semibold px-2 ">
            <Link to="/">Home</Link>
          </button>
          {dropdownData.map((dropdown, index) => (
            <DropdownMenu
              key={index}
              open={selectedDropdown === dropdown.title}
              onOpenChange={(isOpen) => {
                if (!isOpen) {
                  setSelectedDropdown("");
                }
              }}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded font-bold"
                  onClick={() =>
                    setSelectedDropdown(
                      selectedDropdown === dropdown.title ? "" : dropdown.title
                    )
                  }
                >
                  {dropdown.title}
                  <ChevronDown className="ml-2" size={16} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                align="start"
                className="w-48 bg-white dark:bg-gray-800 shadow-lg rounded-md"
              >
                {dropdown.items.map((item, idx) => (
                  <Link
                    to={`/category/${dropdown.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}/${item.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    onClick={() => handleDropdownLinkClick(dropdown.title)}
                    className="block p-2 bg-white hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white rounded-md transition-colors duration-200"
                    key={idx}
                  >
                    <DropdownMenuItem className="p-2 rounded-md cursor-pointer">
                      {item.name}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ))}
        </div>

        {/* Right-Aligned Actions */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            className="hidden lg:flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded font-bold"
            onClick={() => setSearchDialog(true)}
          >
            <Search className="mr-2 " size={20} />
          </Button>

          {isUser && (
            <Link to="/cart">
              <Button
                variant="ghost"
                className="hidden lg:flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded font-bold"
              >
                <ShoppingCart className="mr-2 font-bold" size={20} />
                Cart ({cartCount})
              </Button>
            </Link>
          )}

          {isUser ? (
            <DropdownMenu className="mr-5">
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="hidden lg:flex items-center p-2 bg-[#701539] rounded-full"
                >
                  <User />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white dark:bg-gray-800 shadow-lg rounded-md">
                <DropdownMenuItem className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md cursor-pointer" onClick={()=>navigate("/orders")}>
                  Your Orders
                </DropdownMenuItem>
                <DropdownMenuItem className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md">
                  <Button variant="ghost" onClick={handleLogout}>
                    Logout
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="mr-8 flex gap-3">
              <button
                variant="outline"
                className="hidden lg:block dark:bg-gray-700 font-bold p-2 rounded"
              >
                <Link to="/login">Login</Link>
              </button>
              <Button className="hidden lg:block text-white bg-[#8d1b48] hover:bg-[#71163a] rounded">
                <Link to="/signup">Signup</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}

        <div className="lg:hidden flex justify-center items-center gap-3">
          <Link to="/" className="block lg:hidden p-2">
            <Home size={20} />
          </Link>
          <span
            onClick={() => setSearchDialog(true)}
            className="block lg:hidden p-2 cursor-pointer"
          >
            <Search size={20} />
          </span>
          {isUser && (
            <Link to="/cart" className="block lg:hidden p-2">
              <ShoppingCart size={20} />
            </Link>
          )}

          <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className={`p-4 overflow-auto bg-white dark:bg-gray-800 transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <DialogTitle className="font-semibold text-lg">
                Krishna
              </DialogTitle>
              <DialogDescription>
                Below is our available categories
              </DialogDescription>
              <div className="space-y-4">
                {dropdownData.map((dropdown, index) => (
                  <Accordion type="single" collapsible key={index}>
                    <AccordionItem value={dropdown.title}>
                      <AccordionTrigger className="text-lg font-semibold">
                        {dropdown.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-1">
                          {dropdown.items.map((item, idx) => (
                            <li key={idx}>
                              <Link
                                to={`/category/${dropdown.title
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}/${item.name
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                              >
                                <Button
                                  variant="outline"
                                  className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-md"
                                  onClick={() => {
                                    handleLinkClick();
                                    setSelectedDropdown(item.name);
                                  }}
                                >
                                  {item.name}
                                </Button>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                ))}
                {isUser ? (
                  <>
                    <Link to="/orders">
                      <Button variant="outline" className="w-full">
                        Your Orders
                      </Button>
                    </Link>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        handleLinkClick();
                        handleLogout();
                      }}
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link to="/login">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => {
                          handleLinkClick();
                        }}
                      >
                        Login
                      </Button>
                    </Link>
                    <Link to="signup">
                      <Button
                        className="w-full"
                        onClick={() => {
                          handleLinkClick();
                        }}
                      >
                        SignUp
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
