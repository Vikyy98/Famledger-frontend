type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title = "",
  description = "",
}) => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition">
      <div className="text-blue-600">{icon}</div>
      <div className="mt-5">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};
