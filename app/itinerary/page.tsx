"use client";

import { useEffect, useState } from "react";
import db from "@/firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";

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
  price: string;
}

export default function ItineraryPage() {
  const [itinerary, setItinerary] = useState<(Attraction | null)[]>([]);
  const [loading, setLoading] = useState(true);
  const [tripInfo, setTripInfo] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const stored = localStorage.getItem("tripFormData");
      if (!stored) return;

      const form = JSON.parse(stored);
      setTripInfo(form);

      const ref = collection(db, "attractions");

      // Podrías ajustar los filtros aquí según tu lógica deseada
      const snapshot = await getDocs(ref);
      const all = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Attraction[];

      const filtered = all.filter((item) => {
        const matchesGroup = item.idealFor?.includes(form.groupType);
        const matchesInterest = item.categories?.some((cat: string) =>
          form.interests.includes(cat)
        );
        const matchesLocation =
          item.country?.toLowerCase().includes(form.destination.toLowerCase()) ||
          item.city?.toLowerCase().includes(form.destination.toLowerCase()) ||
          item.region?.toLowerCase().includes(form.destination.toLowerCase());

        return matchesGroup && matchesInterest && matchesLocation;
      });

      // Crear el itinerario con máximo 1 por día
      const finalItinerary: (Attraction | null)[] = [];

      for (let i = 0; i < form.numberOfDays; i++) {
        finalItinerary.push(filtered[i] || null);
      }

      setItinerary(finalItinerary);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return <p className="p-10 text-center text-lg">Loading itinerary...</p>;

  return (
    <main className="max-w-6xl mx-auto p-8 text-gray-800">
      <h1 className="text-3xl font-bold text-primary mb-6 text-center">
        Your {tripInfo?.numberOfDays}-Day Itinerary
      </h1>

      {itinerary.map((activity, i) => (
        <div
          key={i}
          className="mb-6 bg-primary-light p-6 rounded-lg shadow-md"
        >
          <h2 className="text-xl font-semibold mb-2 text-primary-dark">Day {i + 1}</h2>
          {activity ? (
            <>
              <h3 className="text-lg font-bold">{activity.name}</h3>
              <p className="text-sm text-gray-700 italic mb-2">{activity.city}, {activity.region}</p>
              <p className="mb-2">{activity.description}</p>
              <p className="text-sm text-gray-600">
                Duration: {activity.duration} · Price: {activity.price}
              </p>
            </>
          ) : (
            <p className="text-gray-600 italic">Día libre o sin actividad recomendada</p>
          )}
        </div>
      ))}
    </main>
  );
}
