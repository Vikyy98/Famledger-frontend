import Image from "next/image";

const TestimonialsSection = () => {
  return (
    <section className="w-full bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Loved by Real Families
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Thousands of families use FamLedger to stay organized, reduce
            financial stress, and plan for a better future.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {/* Testimonial 1 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/t1.png" // replace with your image
                alt="User 1"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Meghana R</h4>
                <p className="text-gray-500 text-sm">Mother of Two</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              “FamLedger brought complete clarity into our family expenses.
              Budgeting together has never been this easy.”
            </p>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/t2.png" // replace with your image
                alt="User 2"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Gokul & Priya</h4>
                <p className="text-gray-500 text-sm">Young Couple</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              “We track rent, groceries, subscriptions, and savings goals in one
              place. Totally reduced arguments about money!”
            </p>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/t3.png" // replace with your image
                alt="User 3"
                width={60}
                height={60}
                className="rounded-full object-cover"
              />
              <div>
                <h4 className="font-semibold text-gray-900">Karthik</h4>
                <p className="text-gray-500 text-sm">Working Professional</p>
              </div>
            </div>

            <p className="text-gray-700 leading-relaxed">
              “The app helped me organize bills and shared expenses with my
              siblings. Super clean and easy UI.”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
