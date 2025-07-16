import React from "react";
import adoptionBg from "../assets/adoptionbg.jpg";
import { FaPaw } from "react-icons/fa";

const Adoption = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${adoptionBg})`,
      }}
      className="bg-no-repeat bg-center bg-cover py-16 sm:py-24 relative bg-fixed"
    >
      <div className="absolute inset-0 bg-neutral-800/85 z-0"></div>

      <div className="relative">
        <div className="text-center mb-24">
          <p className="text-sm text-white uppercase tracking-widest mb-2">
            — FIND YOUR FRIEND —
          </p>
          <h2 className="text-5xl font-bold text-white mb-4">ADOPTION</h2>
          <div className="text-[#018AE0]/50 rotate-12 text-xl flex justify-center">
            <FaPaw />
          </div>
        </div>
        <div className="text-center">
            <h2 className="font-bold text-3xl text-white mb-4">Adopting is an act of <span className="text-[#D61C62]">love</span></h2>
            <p className="text-white text-lg mb-4">Etiam rhoncus leo a dolor placerat, nec elem entum ipsum convall.</p>
            <p className="text-white font-semibold  mb-4">Maecenas at arcu risus. Donec commodo sodales ex, scelerisque laoreet nibh hendrerit id Maecenas at arcu ro In aliquet magna nec <br /> lobortis maximus. Etiam rhoncus leo a dolor placerat, nec elementum ipsum convall.</p>
        </div>
      </div>
    </div>
  );
};

export default Adoption;
