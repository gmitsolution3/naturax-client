"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Send,
  ShieldCheck,
  Truck,
  CreditCard,
  HeadphonesIcon
} from "lucide-react";

interface FooterProps {
  brandName?: string;
}

const Footer = ({ brandName = "WoorMart" }: FooterProps) => {
  const footerLinks = {
    shop: ["New Arrivals", "Best Sellers", "Sale", "Collections", "Gift Cards"],
    company: ["About Us", "Careers", "Blog", "Press", "Partnerships"],
    support: ["Help Center", "Track Order", "Shipping", "Returns", "FAQs"],
    legal: ["Privacy", "Terms", "Cookies", "Sitemap"]
  };

  const features = [
    { icon: Truck, text: "Free Shipping", subtext: "On orders over $50" },
    { icon: ShieldCheck, text: "Secure Payment", subtext: "100% protected" },
    { icon: HeadphonesIcon, text: "24/7 Support", subtext: "Dedicated support" },
    { icon: CreditCard, text: "Easy Returns", subtext: "30-day guarantee" }
  ];

  return (
    <footer className="relative overflow-hidden">
      {/* Features Bar */}
      <div className="bg-gradient-to-r from-gold/10 via-amber-500/10 to-gold/10 border-y border-gold/20">
        <div className="container mx-auto px-6 lg:px-12 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.text}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-amber-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{feature.text}</p>
                  <p className="text-xs text-muted-foreground">{feature.subtext}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="bg-slate-950 text-slate-300">
        <div className="container mx-auto px-6 lg:px-12 py-16">
          <div className="grid md:grid-cols-12 gap-12 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-4">
              <div className="mb-6">
                <h2 className="font-display text-4xl font-bold mb-2">
                  <span className="bg-gradient-to-r from-gold via-amber-400 to-gold bg-clip-text text-transparent">
                    {brandName}
                  </span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-gold to-amber-500 rounded-full"></div>
              </div>
              
              <p className="text-slate-400 leading-relaxed mb-6 text-sm">
                Experience premium shopping with curated collections, 
                exceptional quality, and customer service that goes above and beyond.
              </p>

              {/* Newsletter */}
              <div className="bg-slate-900/50 rounded-2xl p-6 border border-slate-800">
                <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold" />
                  Stay Updated
                </h4>
                <p className="text-xs text-slate-400 mb-4">
                  Subscribe for exclusive deals and early access
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:border-gold focus:ring-1 focus:ring-gold outline-none transition-all"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2.5 bg-gradient-to-r from-gold to-amber-500 rounded-lg hover:shadow-lg hover:shadow-gold/20 transition-all"
                  >
                    <Send className="w-4 h-4 text-white" />
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Links Grid */}
            <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                  Shop
                </h4>
                <ul className="space-y-3">
                  {footerLinks.shop.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-400 hover:text-gold transition-colors inline-flex items-center gap-2 group"
                      >
                        <span className="w-0 h-0.5 bg-gold group-hover:w-3 transition-all"></span>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                  Company
                </h4>
                <ul className="space-y-3">
                  {footerLinks.company.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-400 hover:text-gold transition-colors inline-flex items-center gap-2 group"
                      >
                        <span className="w-0 h-0.5 bg-gold group-hover:w-3 transition-all"></span>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                  Support
                </h4>
                <ul className="space-y-3">
                  {footerLinks.support.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-slate-400 hover:text-gold transition-colors inline-flex items-center gap-2 group"
                      >
                        <span className="w-0 h-0.5 bg-gold group-hover:w-3 transition-all"></span>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">
                  Contact
                </h4>
                <div className="space-y-4">
                  <a href="tel:+8801234567890" className="flex items-start gap-3 text-sm text-slate-400 hover:text-gold transition-colors group">
                    <Phone className="w-4 h-4 mt-0.5 text-gold group-hover:scale-110 transition-transform" />
                    <span>+880 1234-567890</span>
                  </a>
                  <a href="mailto:support@woormart.com" className="flex items-start gap-3 text-sm text-slate-400 hover:text-gold transition-colors group">
                    <Mail className="w-4 h-4 mt-0.5 text-gold group-hover:scale-110 transition-transform" />
                    <span>support@woormart.com</span>
                  </a>
                  <div className="flex items-start gap-3 text-sm text-slate-400">
                    <MapPin className="w-4 h-4 mt-0.5 text-gold" />
                    <span>Dhaka, Bangladesh<br />Sat-Thu: 10AM-8PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Social & Bottom */}
          <div className="pt-8 border-t border-slate-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              {/* Social Links */}
              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500 uppercase tracking-wider">Follow Us</span>
                <div className="flex gap-2">
                  {[
                    { icon: Facebook, label: "Facebook", color: "hover:bg-blue-600" },
                    { icon: Twitter, label: "Twitter", color: "hover:bg-sky-500" },
                    { icon: Instagram, label: "Instagram", color: "hover:bg-pink-600" },
                    { icon: Linkedin, label: "LinkedIn", color: "hover:bg-blue-700" }
                  ].map(({ icon: Icon, label, color }) => (
                    <motion.a
                      key={label}
                      href="#"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center ${color} hover:border-transparent transition-all group`}
                      aria-label={label}
                    >
                      <Icon className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Legal Links */}
              <div className="flex flex-wrap gap-6 items-center">
                {footerLinks.legal.map((link) => (
                  <a
                    key={link}
                    href="#"
                    className="text-xs text-slate-500 hover:text-gold transition-colors"
                  >
                    {link}
                  </a>
                ))}
              </div>

              {/* Copyright */}
              <p className="text-xs text-slate-500">
                © {new Date().getFullYear()} {brandName}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </footer>
  );
};

export default Footer;