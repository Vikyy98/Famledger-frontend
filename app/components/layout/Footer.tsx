import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-14 mt-10">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h3 className="text-xl font-semibold text-white">FamLedger</h3>
          <p className="text-gray-400 mt-3 max-w-xs">
            The smarter way for families to track expenses, set goals, and
            manage money together.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">Product</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/features" className="hover:text-white">
                Features
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-white">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/testimonials" className="hover:text-white">
                Testimonials
              </Link>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">Company</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-white">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="text-white font-semibold text-lg mb-3">Legal</h4>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} FamLedger. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
