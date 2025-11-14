const StatsSection = () => {
  return (
    <section className="w-full bg-blue-600 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-10 text-center text-white">
          {/* Stat 1 */}
          <div>
            <h3 className="text-4xl font-bold">10,000+</h3>
            <p className="text-blue-100 mt-2 text-lg">
              Families Using FamLedger
            </p>
          </div>

          {/* Stat 2 */}
          <div>
            <h3 className="text-4xl font-bold">$50M+</h3>
            <p className="text-blue-100 mt-2 text-lg">Tracked & Managed</p>
          </div>

          {/* Stat 3 */}
          <div>
            <h3 className="text-4xl font-bold">4.9/5</h3>
            <p className="text-blue-100 mt-2 text-lg">User Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
