import React from "react";
import Calendar from "@/components/misc/Calendar";
import Stocks from "@/components/misc/Stocks";
import Crypto from '@/components/misc/Crypto';
import Weather from '@/components/misc/Weather';
import RoundClock from "@/components/misc/RoundClock";

const Dashboard: React.FC = () => {
  return (
    <section>
      <h1 className="p-5 text-gray-700 text-4xl font-extrabold robobto bg-gradient-to-r from-cyan-500 to-blue-500">Dashboard</h1>
      <div className="flex flex-col">
        <div className="flex justify-evenly items-center p-4 bg-gray-950 shadow-md">
          <RoundClock />
          <Calendar />
          <Weather />
        </div>
        <div className="flex px-4 py-6">
          <div className="basis-1/2">
            <h2>Bitcoin</h2>
            <Crypto />
          </div>
          <div className="basis-1/2">
            <h2>Stock Price</h2>
            <Stocks />
          </div>
        </div>
      </div>
    </section>

  )
}

export default Dashboard;