import React from "react";
import YearCard from "../components/YearCard"; // Import the YearCard component

const yearbookData = [
  { year: 2026, members: 40 },
  { year: 2025, members: 138 },
  { year: 2024, members: 65 },
  { year: 2023, members: 66 },
  { year: 2022, members: 48 },
  { year: 2021, members: 34 },
  { year: 2020, members: 95 },
  { year: 2019, members: 56 },
  { year: 2018, members: 58 },
  { year: 2017, members: 52 },
  { year: 2016, members: 62 },
  { year: 2015, members: 67 },
  { year: 2014, members: 53 },
  { year: 2013, members: 56 },
  { year: 2012, members: 11 },
  { year: 2011, members: 49 },
  { year: 2010, members: 36 },
  { year: 2009, members: 12 },
  { year: 2008, members: 38 },
  { year: 2007, members: 21 },
  { year: 2006, members: 31 },
  { year: 2005, members: 67 },
  { year: 2004, members: 26 },
  { year: 2003, members: 49 },
];

const Yearbook = () => {
  return (
    <div>
      <div className="container mx-auto p-6 bg-gradient-to-b from-blue-50 to-gray-200 min-h-screen">
        <h2 className="text-5xl font-extrabold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-teal-500 animate-pulse">
          Yearbook
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {yearbookData.map((classYear, index) => (
            <YearCard
              key={index}
              year={classYear.year}
              members={classYear.members}
            />
          ))}
        </div>
      </div>

    </div>
  );
};

export default Yearbook;
