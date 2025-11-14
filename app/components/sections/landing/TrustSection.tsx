import Image from "next/image";

const TrustSection = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Built for families who want clarity and control
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            FamLedger helps you plan, track, and manage expenses seamlessly —
            whether {"you're"} budgeting alone or managing finances with family.
          </p>
        </div>

        {/* 3 Feature Cards */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* CARD 1 - Planning */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
            <div className="relative w-full h-40 mb-6">
              <Image
                src="/planning-card.png" // replace with your image
                alt="Family budgeting"
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Plan Together
            </h3>
            <p className="text-gray-600 mt-2">
              Share budgets, set spending limits, and keep your family aligned
              with transparent financial planning.
            </p>
          </div>

          {/* CARD 2 - Tracking */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
            <div className="relative w-full h-40 mb-6">
              <Image
                src="/tracking-card.png" // replace with your image
                alt="Expense tracking"
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Track Expenses
            </h3>
            <p className="text-gray-600 mt-2">
              Monitor all expenses in one place with real-time updates and
              category-wise insights.
            </p>
          </div>

          {/* CARD 3 - Mobile Access */}
          
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
            <div className="relative w-full h-40 mb-6">
              <Image
                src="/mobile-card.png" // replace with your image
                alt="Mobile budgeting"
                fill
                className="object-cover rounded-xl"
              />
            </div>
            <h3 className="text-xl font-semibold text-gray-800">
              Access Anywhere
            </h3>
            <p className="text-gray-600 mt-2">
              Stay in control on the go. Add transactions, update budgets, and
              collaborate from any device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
