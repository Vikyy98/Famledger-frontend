"use client";

import React, { useState } from "react";
import { Info } from "lucide-react";

interface InfoTooltipProps {
  text: string;
}

const InfoTooltip: React.FC<InfoTooltipProps> = ({ text }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className="relative inline-flex items-center"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <Info className="h-4 w-4 text-gray-400 cursor-pointer" />
      {visible && (
        <div className="absolute left-6 top-0 z-10 w-48 rounded-lg bg-gray-800 p-2 text-xs text-white shadow-md">
          {text}
        </div>
      )}
    </div>
  );
};

export default InfoTooltip;
