import Image from "next/image";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT — Text */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Manage your family finances effortlessly
          </h1>

          <p className="text-lg text-gray-600">
            Track expenses, set financial goals, collaborate with loved ones,
            and stay in control of your money — all in one powerful family
            finance platform.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
            >
              Get Started Free
            </Link>

            <Link
              href="/login"
              className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
            >
              Login
            </Link>
          </div>

          {/* Trusted Badge */}
          <p className="text-sm text-gray-500">
            Trusted by thousands of families managing their finances together.
          </p>
        </div>

        {/* RIGHT — Hero Image */}
        <div className="flex justify-center md:justify-end">
          <Image
            src="/family-hero.png"
            alt="Family finance dashboard preview"
            width={550}
            height={450}
            className="rounded-2xl shadow-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
