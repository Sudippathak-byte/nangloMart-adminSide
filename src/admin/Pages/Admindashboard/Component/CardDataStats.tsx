import React from "react";

interface CardStatProps {
  title: string;
  count: number;
  icon: React.ReactNode;
}

const CardStat: React.FC<CardStatProps> = ({ title, count, icon }) => {
  return (
    <div className="bg-gradient-to-r from-green-500 to-sky-500 shadow-lg rounded-lg flex items-center justify-between p-6 transition-transform transform hover:scale-105 w-full h-full py-11 ">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-2xl font-bold text-white">{count}</p>
      </div>
      <div className="text-white">{icon}</div>
    </div>
  );
};

export default CardStat;
