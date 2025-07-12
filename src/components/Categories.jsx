import React from "react";
import { Cat, Dog, Rabbit, Fish, PawPrint } from "lucide-react";

const Categories = () => {
  const petCategories = [
    { name: "Cats", icon: Cat, description: "Furry feline friends" },
    { name: "Dogs", icon: Dog, description: "Loyal canine companions" },
    { name: "Rabbits", icon: Rabbit, description: "Hopping bundles of joy" },
    { name: "Fish", icon: Fish, description: "Aquatic wonders" },
    { name: "Birds", icon: PawPrint, description: "Feathered singing pals" },
    {
      name: "Reptiles",
      icon: PawPrint,
      description: "Scaly and fascinating creatures",
    },
    {
      name: "Small Animals",
      icon: PawPrint,
      description: "Hamsters, guinea pigs, and more",
    },
    {
      name: "Exotic Pets",
      icon: PawPrint,
      description: "Unique and rare companions",
    },
  ];

  const handleCategoryClick = (categoryName) => {
    console.log(`Clicked on ${categoryName} category`);
  };

  return (
    <div className="w-full mx-auto max-w-6xl text-center bg-white rounded-3xl p-6 sm:p-8 lg:pt-18">
      <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">
        — CATEGORIES —
      </p>
      <h2 className="text-4xl sm:text-4xl font-bold text-center text-black pb-4 sm:pb-8">
        Discover Your Perfect Pet
      </h2>

      <p className="text-md sm:text-xl text-center text-gray-600 mb-10 sm:mb-12 max-w-3xl mx-auto">
        Explore our diverse range of pet categories to find the ideal companion
        for your home and lifestyle.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
        {petCategories.map((category, index) => (
          <button
            key={index}
            className="flex flex-col items-center justify-center p-6 bg-transparent border-2 border-[#018AE0] text-[#018AE0] rounded-2xl shadow-lg
                       hover:bg-[#018AE0] hover:text-white hover:shadow-xl transition-all duration-300 ease-in-out
                       transform hover:-translate-y-2 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-[#018AE0] focus:ring-opacity-75"
            onClick={() => handleCategoryClick(category.name)}
            aria-label={`Explore ${category.name} pets`}
          >
            {category.icon &&
              React.createElement(category.icon, {
                className: "w-16 h-16 sm:w-20 sm:h-20 mb-4 opacity-90",
              })}
            <span className="text-2xl font-bold mb-2 tracking-wide">
              {category.name}
            </span>
            <span className="text-sm sm:text-base text-gray-600 text-center opacity-80 group-hover:text-white">
              {category.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
