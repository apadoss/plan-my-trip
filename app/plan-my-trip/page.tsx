"use client";

import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays, differenceInDays } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useRouter } from "next/navigation";

export default function PlanMyTrip() {
  const [form, setForm] = useState({
    destination: "",
    startDate: new Date(),
    endDate: addDays(new Date(), 1),
    numberOfDays: 2,
    budget: "" as "Low" | "Mid-range" | "Luxury" | "",
    groupType: "" as "Solo" | "Couples" | "Family with Kids" | "",
    interests: [] as string[],
  });

  const categories = [
    "Adventure & Sports",
    "Culture",
    "Beach Leisure",
    "Food & Drink",
    "Historical & Education",
    "Local Gem",
    "Road Trip",
    "Photography",
    "Nightlife & Entertainment",
    "Nature & Wildlife",
    "Winter Activities",
    "Water Activities",
  ];

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSelect = (field: "budget" | "groupType", value: string) => {
    setForm((p) => ({
      ...p,
      [field]: p[field] === value ? "" : value,
    }));
  };

  const handleToggleInterest = (cat: string) => {
    setForm((p) => ({
      ...p,
      interests: p.interests.includes(cat)
        ? p.interests.filter((i) => i !== cat)
        : [...p.interests, cat],
    }));
  };

  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.destination || !form.budget || !form.groupType) {
      alert("Please complete all required fields.");
      return;
    }
    localStorage.setItem("tripFormData", JSON.stringify(form));
    router.push("/itinerary");
  };

  return (
    <main className="flex-1 bg-white text-gray-800 flex flex-col">
      <header className="bg-primary py-6 px-4 shadow-md flex items-center">
        <h1 className="text-2xl font-bold text-black text-center w-full">
          Tell us about your trip!
        </h1>
      </header>

      <p className="text-center mt-6 text-lg font-medium px-4 leading-relaxed">
        We will create an itinerary with the information you provide below.
      </p>

      <form onSubmit={handleSubmit} className="flex-grow">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 p-8">
          {/* LEFT */}
          <div className="space-y-6">
            {/* Destination */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Destination</h2>
              <input
                name="destination"
                value={form.destination}
                onChange={handleInput}
                placeholder="Enter city or country"
                className="w-full border rounded-md px-4 py-2 text-base focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>

            {/* Dates */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Trip dates and days</h2>
              <DateRange
                editableDateInputs
                onChange={({ selection }) => {
                  const days =
                    differenceInDays(selection.endDate!, selection.startDate!) + 1;
                  setForm((p) => ({
                    ...p,
                    startDate: selection.startDate!,
                    endDate: selection.endDate!,
                    numberOfDays: days,
                  }));
                }}
                moveRangeOnFirstSelection={false}
                ranges={[
                  {
                    startDate: form.startDate,
                    endDate: form.endDate,
                    key: "selection",
                  },
                ]}
              />
              <p className="text-sm mt-2 text-gray-600">
                You selected {form.numberOfDays} day
                {form.numberOfDays !== 1 && "s"}
              </p>
            </div>

            {/* Budget */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Budget</h2>
              <div className="flex flex-wrap gap-2">
                {["Low", "Mid-range", "Luxury"].map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleSelect("budget", opt)}
                    className={`px-4 py-2 border rounded-md text-sm cursor-pointer transition duration-200 ${
                      form.budget === opt
                        ? "bg-primary text-white"
                        : "hover:bg-orange-100"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* Interests */}
            <div>
              <h2 className="font-semibold text-lg mb-4">Travel interests</h2>
              <div className="flex flex-wrap gap-3">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleToggleInterest(cat)}
                    className={`px-4 py-2 border rounded-md text-sm cursor-pointer transition duration-200 ${
                      form.interests.includes(cat)
                        ? "bg-primary text-white"
                        : "hover:bg-orange-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Group */}
            <div>
              <h2 className="font-semibold text-lg mb-2">Who is travelling</h2>
              <div className="flex flex-wrap gap-2">
                {["Solo", "Couples", "Family with Kids"].map((type) => (
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
        </div>

        <div className="flex justify-center py-8">
          <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-md text-lg transition duration-200"
          >
            Plan My Trip
          </button>
        </div>
      </form>
    </main>
  );
}
