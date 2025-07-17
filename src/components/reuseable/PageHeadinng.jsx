import React from "react";
import pageHeadingImg from "../../assets/jumbotron.jpg";

const PageHeading = ({ title, breadcrumb }) => {
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat h-64 flex items-center justify-center lg:justify-start lg:pl-72"
      style={{ backgroundImage: `url(${pageHeadingImg})` }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-white text-left px-2">
        <h1 className="text-5xl font-bold mb-6">{title}</h1>
        <div className="flex bg-[#D61C62] py-2 justify-center space-x-2 text-sm font-medium">
          {breadcrumb?.map((item, idx) => (
            <span key={idx}>
              {idx > 0 && <span className="mx-1">/</span>}
              <span className={item.active ? "text-white/70" : "text-white"}>
                {item.link ? (
                  <a href={item.link} className="hover:underline">
                    {item.label}
                  </a>
                ) : (
                  item.label
                )}
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PageHeading;
