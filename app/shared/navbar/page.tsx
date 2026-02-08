import { ComLogo } from "../components/ComLogo";
import HeaderSearchBar from "../components/HeaderSearchBar";
import { BookCard } from "../components/BookCard";
import { getCategories, getMarquee } from "@/lib/categories";
import { MenuNavbar } from "../components/Menu";
import MarqueeText from "../components/marquee";
import { getBrandInfo } from "@/lib/social";
import { NavBarMenu } from "../components/navBarMenu";
import AccountDropdown from "../components/AccountDropdown";

const Navbar = async () => {
  const getAllCategories = await getCategories();
  const brandInfoRaw = await getBrandInfo();
  const marqueeText = await getMarquee();

  const brandInfo = {
    logo: brandInfoRaw?.data?.logo ?? "/placeholder.svg",
    name: brandInfoRaw?.data?.name ?? "GMIT",
    phone: brandInfoRaw?.data?.phone ?? "+88001234567",
    socials: brandInfoRaw?.data?.socials ?? [],
  };

  return (
    <header className="w-full bg-white sticky top-0 z-50 shadow-sm">
      {/* Top Promotional Banner */}
      <MarqueeText text={marqueeText.data.text} />

      {/* Main Header */}
      <div className="bg-white">
        <div className="mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <div>
              <MenuNavbar categories={getAllCategories.data} />
            </div>

            {/* Center Section - Search Bar (Desktop) */}
            <div className="hidden text-center lg:flex flex-1 w-full mx-auto mx-8">
              <ComLogo />
            </div>

            {/* Right Section - Nav Menu & Cart */}
            <div className="flex items-center justify-end gap-4 lg:gap-6 basis-2/5">
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