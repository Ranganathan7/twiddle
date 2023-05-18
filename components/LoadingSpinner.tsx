import React from "react";
import { VscLoading, VscRefresh } from "react-icons/vsc";

export const LoadingSpinner: React.FC<{ big?: boolean }> = ({
  big = false,
}) => {
  const sizeClasses = big ? "w-16 h-16" : "w-10 h-10";

  return (
    <div className="flex justify-center items-center p-2">
      <VscRefresh className={`animate-spin ${sizeClasses}`} />
    </div>
  );
};
