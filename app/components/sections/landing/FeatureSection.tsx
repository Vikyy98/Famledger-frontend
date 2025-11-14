const FeaturesSection = () => {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Everything your family needs to stay financially organized
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            From tracking expenses to managing goals, FamLedger keeps everyone
            aligned and informed, every step of the way.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Feature 1 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-5">
              <span className="text-blue-600 text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Track Spending
            </h3>
            <p className="text-gray-600 mt-2">
              Monitor expenses effortlessly and get clarity on where your money
              goes each month.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-5">
              <span className="text-green-600 text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">Set Goals</h3>
            <p className="text-gray-600 mt-2">
              Create saving targets and track progress as a family to stay
              motivated and accountable.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-5">
              <span className="text-purple-600 text-2xl">👨‍👩‍👧‍👦</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Collaborate Together
            </h3>
            <p className="text-gray-600 mt-2">
              Add family members, share budgets, and manage expenses
              transparently and in real-time.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition">
            <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-5">
              <span className="text-yellow-600 text-2xl">💼</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              Manage Accounts
            </h3>
            <p className="text-gray-600 mt-2">
              Keep track of multiple bank accounts, wallets, and cash flow
              without any hassle.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
