const StepsSection = () => {
  return (
    <section className="w-full bg-white py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Get Started in Minutes
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            Setting up your family finance workspace is fast, simple, and
            completely secure.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Step 1 */}
          <div className="text-center px-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
              1
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              Create Your Account
            </h3>
            <p className="text-gray-600 mt-2">
              Sign up for free and set up your personal or family workspace.
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center px-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
              2
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              Add Family Members
            </h3>
            <p className="text-gray-600 mt-2">
              Invite your partner or family members to collaborate in real time.
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center px-6">
            <div className="w-16 h-16 mx-auto rounded-full bg-purple-600 text-white flex items-center justify-center text-2xl font-bold shadow-md">
              3
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mt-6">
              Start Tracking Finances
            </h3>
            <p className="text-gray-600 mt-2">
              Add expenses, set budgets, and monitor spending effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StepsSection;
