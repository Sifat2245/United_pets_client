import React from 'react';
import serviceImage from '../assets/introimg1.jpg'
import { FaPaw } from 'react-icons/fa';

const OurService = () => {

    return (
        <div className="w-3/4 mx-auto py-16">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
                        — WHAT WE OFFER —
                    </p>
                    <h2 className="text-4xl font-bold text-gray-800 mb-4">
                        OUR SERVICES
                    </h2>
                    <div className="text-[#018AE0]/50 rotate-12 text-xl flex justify-center">
                        <FaPaw />
                    </div>
                </div>

                {/* Content Section */}
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Left Column: Text Content */}
                    <div className="md:w-1/2 text-center md:text-left">
                        <h3 className="text-3xl font-bold text-gray-800 mb-6">
                            Quality Services for Your Pets
                        </h3>
                        <p className="text-gray-600 leading-relaxed mb-4">
                            We offer quick & easy services for cats and dogs, focusing on their health, happiness, and well-being. Our dedicated team provides comprehensive care tailored to your pet's needs.
                        </p>
                        <p className="text-gray-600 font-semibold leading-relaxed mb-8">
                            From routine check-ups and vaccinations to grooming and specialized treatments, we ensure your furry friends receive the highest standard of care in a comfortable and loving environment.
                        </p>
                        <button className="bg-[#018AE0] text-white px-8 py-3 rounded-md shadow-lg hover:bg-[#018ae0e0] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                            CONTACT US
                        </button>
                    </div>

                    {/* Right Column: Image */}
                    <div className="flex justify-center md:justify-end">
                        <img 
                            src={serviceImage} 
                            alt="Adorable Cat Resting" 
                            className="w-full h-auto" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurService;

