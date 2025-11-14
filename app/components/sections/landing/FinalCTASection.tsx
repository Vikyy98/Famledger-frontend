import Link from "next/link";

const FinalCTASection = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Ready to take control of your family finances?
        </h2>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Join thousands of families who simplify their budgeting, track
          expenses effortlessly, and plan for a better financial future.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/register"
            className="px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
          >
            Get Started Free
          </Link>

          <Link
            href="/features"
            className="px-6 py-3 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
          >
            Explore Features
          </Link>
        </div>

        <p className="text-gray-500 text-sm mt-4">
          No credit card required · Free forever plan included
        </p>
      </div>
    </section>
  );
};

export default FinalCTASection;
