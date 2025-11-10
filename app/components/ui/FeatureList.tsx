import { FC } from "react";

type FeatureListProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureList: FC<FeatureListProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-row gap-3 items-center">
      <div className="">{icon}</div>
      <div className="leading-10">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default FeatureList;
