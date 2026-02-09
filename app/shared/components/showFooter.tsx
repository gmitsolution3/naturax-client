import React from "react";
import {
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { ComLogo } from "./ComLogo";
import { getBrandInfo } from "@/lib/social";
import SocialIcons from "./SocialIcons";
import Link from "next/link";

interface SocialLink {
  icon: React.ReactNode;
  url: string;
  label: string;
}

interface FooterLink {
  label: string;
  url: string;
}

const ShowFooter: React.FC = async () => {
  const currentYear: number = new Date().getFullYear();

  const brandInfoRaw = await getBrandInfo();

  const brandInfo = {
    logo: brandInfoRaw?.data?.logo ?? "/placeholder.svg",
    name: brandInfoRaw?.data?.name ?? "GMIT",
    phone: brandInfoRaw?.data?.phone ?? "+88001234567",
    socials: brandInfoRaw?.data?.socials ?? [],
    email: brandInfoRaw?.data?.email ?? "info@gmail.com",
    address: brandInfoRaw?.data?.address ?? "Dhaka, Bangladesh",
  };

  const quickLinks: FooterLink[] = [
    { label: "Home", url: "#" },
    { label: "Shop", url: "#" },
    { label: "Products", url: "#" },
    { label: "Deals", url: "#" },
    { label: "Blog", url: "#" },
  ];

  const aboutLinks: FooterLink[] = [
    { label: "About Us", url: "/support/about-us" },
    { label: "Contact", url: "/support/contact" },
    { label: "Careers", url: "/support/careers" },
    { label: "Terms and Conditions", url: "/support/terms-and-conditions" },
    { label: "Refund Policy", url: "/support/refund-policy" },
  ];

  const supportLinks: FooterLink[] = [
    { label: "Help Center", url: "/support/help-center" },
    { label: "FAQs", url: "support/faq" },
    { label: "Shipping Info", url: "/support/shipping-info" },
    { label: "Return & Exchange Policy", url: "/support/return-and-exchange" },
    { label: "Privacy Policy", url: "/support/privacy-policy" },
  ];

  const socialLinks: SocialLink[] = [
    { icon: <Linkedin size={24} />, url: "#", label: "LinkedIn" },
    { icon: <Facebook size={24} />, url: "#", label: "Facebook" },
    { icon: <Instagram size={24} />, url: "#", label: "Instagram" },
    { icon: <Youtube size={24} />, url: "#", label: "YouTube" },
  ];

  return (
    <footer className="bg-secondary !text-white border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Company Info */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <ComLogo />
            </div>
            <p className="text-white text-sm leading-relaxed mb-6">
              Your trusted online destination for quality products and
              exceptional service.
            </p>

            {/* Contact Info - WoodMart Style */}
            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="text-white shrink-0 mt-1" />
                <p className="text-white text-sm">{brandInfo.address}</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone size={16} className="text-white shrink-0 mt-1" />
                <p className="text-white text-sm">{brandInfo.phone}</p>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail size={16} className="text-white shrink-0 mt-1" />
                <p className="text-white text-sm break-all">
                  {brandInfo.email}
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="sm:col-span-1">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link: FooterLink, idx: number) => (
                <li key={idx}>
                  <a
                    href={link.url}
                    className="text-white transition-colors duration-200 text-sm inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: About */}
          <div className="sm:col-span-1">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              About
            </h4>
            <ul className="space-y-2.5">
              {aboutLinks.map((link: FooterLink, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.url}
                    className="text-white transition-colors duration-200 text-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Support */}
          <div className="sm:col-span-1">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Support
            </h4>
            <ul className="space-y-2.5">
              {supportLinks.map((link: FooterLink, idx: number) => (
                <li key={idx}>
                  <Link
                    href={link.url}
                    className="text-white transition-colors duration-200 text-sm inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section - WoodMart Style */}
      <div className="border-t border-gray-200 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <p className="text-white text-sm">
                © {currentYear} Your Brand. All rights reserved.
              </p>
            </div>

            {/* Payment Methods */}
            <div className="order-1 lg:order-2">
              <img
                src="https://i.postimg.cc/8ctcRTKS/SSLCommerz-Pay-With-logo-All-Size-01-2048x330-removebg-preview.png"
                alt="Payment Methods"
                className="h-12 object-contain"
              />
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 order-3">
              <SocialIcons socials={brandInfo.socials} />
            </div>
          </div>

          {/* Developer Credit */}
          <div className="text-center mt-4 pt-4 border-t border-gray-200">
            <p className="text-white text-xs">
              Designed & Developed by{" "}
              <a
                href="https://www.gmitsolution.net"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white-700 hover:text-white-900 font-medium transition-colors"
              >
                GM IT Solution
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ShowFooter;