import { ComLogo } from "../components/ComLogo";
import HeaderSearchBar from "../components/HeaderSearchBar";
import { BookCard } from "../components/BookCard";
import { getCategories, getMarquee } from "@/lib/categories";
import { MenuNavbar } from "../components/Menu";
import MarqueeText from "../components/marquee";
import { getBrandInfo } from "@/lib/social";
import { NavBarMenu } from "../components/navBarMenu";
import AccountDropdown from "../components/AccountDropdown";

import { Phone, CircleQuestionMark } from "lucide-react";

const Navbar = async () => {
  const getAllCategories = await getCategories();
  const brandInfoRaw = await getBrandInfo();

  const brandInfo = {
    logo: brandInfoRaw?.data?.logo ?? "/placeholder.svg",
    name: brandInfoRaw?.data?.name ?? "GMIT",
    phone: brandInfoRaw?.data?.phone ?? "+88001234567",
    socials: brandInfoRaw?.data?.socials ?? [],
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Promotional Banner */}
      <div className="w-full overflow-hidden bg-secondary text-white py-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-y-3 lg:gap-y-0">
          <div className="inline-flex items-center gap-2 text-sm font-medium px-8">
            <Phone size={18} /> {brandInfo.phone}
          </div>
          <div className="inline-block text-sm font-semibold px-8">
            Discover the Power of Nature with Naturax
          </div>
          <div className="inline-flex items-center gap-2 text-sm font-medium px-8">
            <CircleQuestionMark size={18} /> Customer Help
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white">
        <div className="mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <div className="basis-1/3">
              <MenuNavbar categories={getAllCategories.data} />
            </div>

            {/* Center Section - Search Bar (Desktop) */}
            <div className="hidden text-center lg:flex flex-1 w-full mx-auto mx-8">
              <ComLogo />
            </div>

            {/* Right Section - Nav Menu & Cart */}
            <div className="flex items-center justify-end gap-4 lg:gap-6 basis-1/3">
              {/* Desktop Navigation Menu */}
              <div className="hidden lg:block">
                <NavBarMenu />
              </div>

              {/* Mobile Account Dropdown */}
              <div className="lg:hidden">
                <AccountDropdown />
              </div>

              {/* Shopping Cart */}
              <BookCard />
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="lg:hidden pb-4">
            <HeaderSearchBar
              categories={getAllCategories.data}
              name={brandInfo.name}
              phone={brandInfo.phone}
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
