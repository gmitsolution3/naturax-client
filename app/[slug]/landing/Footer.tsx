"use client";

import { motion } from "framer-motion";

interface FooterProps {
  brandName?: string;
}

const Footer = ({ brandName = "STORE" }: FooterProps) => {
  return (
    <footer className="py-12 bg-secondary/50 border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-semibold text-gradient-gold mb-3">
              {brandName}
            </h3>
            <p className="text-muted-foreground text-sm max-w-sm leading-relaxed">
              Your trusted destination for quality products. We bring
              you the best selection with excellent customer service.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Shop All", "About Us", "Contact", "FAQs"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-gold transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-sm">
              Contact
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>support@store.com</li>
              <li>+880 1234-567890</li>
              <li>Sat - Thu: 10AM - 8PM</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {brandName}. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy", "Terms", "Cookies"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs text-muted-foreground hover:text-gold transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
