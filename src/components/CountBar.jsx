import React from "react";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { FaUserMd, FaHome, FaAward, FaUsers } from "react-icons/fa";
import countBar from "../assets/counterbg.jpg";

const stats = [
  {
    icon: FaUserMd,
    end: 14,
    label: "Professionals",
  },
  {
    icon: FaHome,
    end: 100,
    label: "Adopted Pets",
    suffix: "+",
  },
  {
    icon: FaAward,
    end: 12,
    label: "Awards",
  },
  {
    icon: FaUsers,
    end: 1200,
    label: "Clients",
    suffix: "+",
  },
];

const StatItem = ({ icon: Icon, end, suffix, label }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <div ref={ref} className="text-center">
      {/* Icon */}
      <div className="flex items-center justify-center mx-auto h-20 w-20 rounded-full bg-white mb-4">
        <Icon className="text-4xl text-[#018AE0]" />
      </div>
      {/* Number */}
      <div className="text-5xl font-extrabold text-white">
        {inView ? <CountUp end={end} duration={2.5} suffix={suffix} /> : "0"}
      </div>
      {/* Label */}
      <p className="text-lg font-medium text-white mt-2">{label}</p>
    </div>
  );
};

const CountBar = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${countBar})`,
      }}
      className="py-20 bg-cover bg-center relative bg-fixed mb-24"
    >
      <div className="absolute inset-0 bg-black/40"></div>
      {/* Content container */}
      <div className="w-2/3 mx-auto px-4 relative">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              icon={stat.icon}
              end={stat.end}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CountBar;
