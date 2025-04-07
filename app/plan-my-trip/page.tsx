"use client";

import React, { useState } from "react";

const interests = [
  "Adventure & Sports",
  "Arts & Culture",
  "Beach Leasure",
  "Food & Drink",
  "Historical & Education",
  "Local Gems",
  "Road Trip",
  "Photography",
  "Nightlife & Entertainment",
  "Nature & Wildlife",
  "Winter Activities",
  "Water Activities",
];

export default function PlanMyTrip() {
  const [form, setForm] = useState({
    destination: "",
    date: "",
    budget: "",
    groupType: "",
    interests: [] as string[],
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelect = (type: string, value: string) => {
    setForm((prev) => ({
      ...prev,
      [type]: prev[type as "budget" | "groupType"] === value ? "" : value,
    }));
  };

  const handleToggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  return (
    <main className="flex-1 bg-white text-gray-800 flex flex-col">
      {/* Page Header */}
      <header className="bg-primary py-6 px-4 shadow-md flex items-center">
        <h1 className="text-2xl font-bold text-black text-center w-full">
          Tell us about your trip!
        </h1>
      </header>

      {/* Intro Text */}
      <p className="text-center mt-6 text-lg font-medium px-4 leading-relaxed">
        We will create an itinerary with the information you provide below.
      </p>

      {/* Form Section */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-8 w-full flex-1">
        {/* Left Side */}
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg mb-2">Destinations</h2>
            <input
              name="destination"
              value={form.destination}
              onChange={handleInput}
              placeholder="Enter name of city, country..."
              className="w-full border rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Trip dates and days</h2>
            <input
              name="date"
              value={form.date}
              onChange={handleInput}
              placeholder="Enter dates"
              className="w-full border rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Budget</h2>
            <div className="flex flex-wrap gap-2">
              {["Budget", "Mid-Range", "Luxury"].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleSelect("budget", option)}
                  className={`px-4 py-2 border rounded-md text-sm cursor-pointer transition duration-200 ${
                    form.budget === option
                      ? "bg-primary text-white"
                      : "hover:bg-orange-100"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-semibold text-lg mb-2">Who is travelling</h2>
            <div className="flex flex-wrap gap-2">
              {["Solo", "Couple", "Group", "Family with Kids"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleSelect("groupType", type)}
                  className={`px-4 py-2 border rounded-md text-sm cursor-pointer transition duration-200 ${
                    form.groupType === type
                      ? "bg-primary text-white"
                      : "hover:bg-orange-100"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div>
          <h2 className="font-semibold text-lg mb-4">Travel interests</h2>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <button
                key={interest}
                type="button"
                onClick={() => handleToggleInterest(interest)}
                className={`px-4 py-2 border rounded-md text-sm cursor-pointer transition duration-200 ${
                  form.interests.includes(interest)
                    ? "bg-primary text-white"
                    : "hover:bg-orange-100"
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center py-8">
        <button className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-md text-lg transition duration-200 cursor-pointer">
          Plan My Trip
        </button>
      </div>
    </main>
  );
}
