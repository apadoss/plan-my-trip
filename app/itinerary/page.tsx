"use client";

import { useEffect, useState } from "react";
import db from "@/firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

interface Attraction {
  id: string;
  name: string;
  description: string;
  categories: string[];
  idealFor: string[];
  city: string;
  country: string;
  region: string;
  duration: string;
  price: string; // "Low" | "Mid-range" | "Luxury"
}

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState<(Attraction | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [tripInfo, setTripInfo] = useState<any>(null);

  useEffect(() => {
    const fetchItinerary = async () => {
      const stored = localStorage.getItem("tripFormData");
      if (!stored) return;
      const form = JSON.parse(stored);
      setTripInfo(form);

      // 1) Fetch all
      const snapshot = await getDocs(collection(db, "attractions"));
      const all = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<Attraction, "id">),
      }));

      // 2) Base filter: group + location
      const base = all.filter((a) => {
        const matchesGroup = a.idealFor.includes(form.groupType);
        const loc = form.destination.toLowerCase();
        const matchesLoc =
          a.city.toLowerCase().includes(loc) ||
          a.country.toLowerCase().includes(loc) ||
          a.region.toLowerCase().includes(loc);
        return matchesGroup && matchesLoc;
      });

      // 3) Interest filter
      const byInterest = base.filter((a) =>
        a.categories.some((cat) => form.interests.includes(cat))
      );

      // 4) Price filter
      const byBudget = (byInterest.length ? byInterest : base).filter(
        (a) => a.price === form.budget
      );

      // 5) Final set: prefer interest+budget, else interest, else base
      let finalSet = byBudget;
      if (!finalSet.length && byInterest.length) finalSet = byInterest;
      if (!finalSet.length) finalSet = base;

      // 6) Build one per day (or null)
      const result: (Attraction | null)[] = [];
      for (let i = 0; i < form.numberOfDays; i++) {
        result.push(finalSet[i] || null);
      }

      setItinerary(result);
      setLoading(false);
    };

    fetchItinerary();
  }, []);

  if (loading)
    return <p className="p-10 text-center text-lg">Loading itinerary…</p>;

  return (
    <main className="max-w-6xl mx-auto p-8 text-gray-800">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Your {tripInfo.numberOfDays}-Day Itinerary
      </h1>

      {itinerary.map((a, i) => (
        <div
          key={i}
          className="mb-6 bg-primary-light p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2 text-primary-dark">
            Day {i + 1}
          </h2>
          {a ? (
            <>
              <h3 className="text-lg font-bold">{a.name}</h3>
              <p className="text-sm text-gray-700 italic mb-2">
                {a.city}, {a.region}
              </p>
              <p className="mb-2">{a.description}</p>
              <p className="text-sm text-gray-600">
                Duration: {a.duration} · Price: {a.price}
              </p>
            </>
          ) : (
            <p className="text-gray-600 italic">
              Free day or no recommendation
            </p>
          )}
        </div>
      ))}
    </main>
  );
}
