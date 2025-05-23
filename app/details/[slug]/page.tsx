"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import db from "../../../firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";

// Interfaces
interface Attraction {
  id: string;
  name?: string;
  description?: string;
  categories?: string[];
  idealFor?: string[];
  city?: string;
  country?: string;
  region?: string;
  duration?: string;
  price?: string; // "Low" | "Mid-range" | "Luxury"
  foto?: string;
}

interface CityData {
  name: string;
  slug: string;
  image: string;
  description: string;
}

const cities: CityData[] = [
  { name: "Gran Canaria", image: "/images/laspalmas.jpg", slug: "Gran-Canaria", description: "Beautiful island in the Canaries with amazing beaches and volcanic landscapes." },
  { name: "Tenerife", image: "/images/tenerife.png", slug: "Tenerife", description: "Home to Mount Teide, Tenerife offers vibrant cities and tranquil villages." },
  { name: "Madrid", image: "/images/madrid.avif", slug: "Madrid", description: "Spain’s bustling capital filled with historic architecture and cultural landmarks." },
  { name: "Barcelona", image: "/images/barcelona.avif", slug: "Barcelona", description: "Famous for its unique blend of modernist and Gothic architecture." },
  { name: "Sevilla", image: "/images/sevilla.jpg", slug: "Sevilla", description: "Known for flamenco, Moorish influences, and rich cultural festivals." },
  { name: "Valencia", image: "/images/valencia.jpg", slug: "Valencia", description: "The City of Arts and Sciences and Mediterranean beaches await." },
  { name: "Mallorca", image: "/images/mallorca.avif", slug: "Mallorca", description: "A top Balearic Island destination known for cliffs and beaches." },
  { name: "Málaga", image: "/images/malaga.jpg", slug: "Malaga", description: "A vibrant port city with an old soul and Picasso’s birthplace." },
  { name: "Galicia", image: "/images/galicia.jpg", slug: "Galicia", description: "Lush green landscapes and unique Galician culture." },
  { name: "Ibiza", image: "/images/ibiza.webp", slug: "Ibiza", description: "Renowned for nightlife, but also peaceful coves and countryside." },
  { name: "Granada", image: "/images/granada.jpg", slug: "Granada", description: "Home of the Alhambra and a blend of Moorish and Spanish styles." },
  { name: "Bilbao", image: "/images/bilbao.jpg", slug: "Bilbao", description: "A revitalized industrial city known for the Guggenheim Museum." },
];

export default function CityDetailsPage() {
  const { slug } = useParams();
  const citySlug = (slug as string).toLowerCase(); 

  const city = cities.find((c) => c.slug.toLowerCase() === citySlug);

  const [attractions, setAttractions] = useState<Attraction[]>([]);
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        if (!city) return;
  
        const cityNameWithoutHyphens = city.name.replace(/-/g, " ").trim();
  
        const q = query(
          collection(db, "attractions"),
          where("region", "==", cityNameWithoutHyphens.trim())       );
        const querySnapshot = await getDocs(q);
  
        const cityAttractions = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        })) as Attraction[];
  
        setAttractions(cityAttractions);
      } catch (error) {
        console.error("Error fetching attractions:", error);
      }
    };
  
    fetchAttractions();
  }, [city]);
  
  if (!city) return <div className="p-6">City not found.</div>;

  return (
    <div className="min-h-screen bg-[#fdf5eb] text-black">
      <div className="bg-primary px-6 py-4 flex items-center">
        <Link href="/">
          <button className="text-2xl font-bold text-black hover:text-white transition">←</button>
        </Link>
        <h1 className="text-3xl font-bold mx-auto text-black">Explore Destinations</h1>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 bg-[#fff3e0]">
        <h2 className="text-3xl font-extrabold text-red-600 mb-4">{city.name}</h2>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="md:w-1/2">
            <Image
              src={city.image}
              alt={city.name}
              width={500}
              height={300}
              className="rounded-md object-cover"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="text-xl font-bold text-orange-600 mb-2">Description:</h3>
            <p className="text-md leading-relaxed">{city.description}</p>
          </div>
        </div>

        <div className="bg-[#ffe0b2] font-semibold text-center py-3 rounded text-[18px] mb-4">
          Iconic Landmarks & Monuments
        </div>

        <h4 className="text-md font-bold mb-2">Lista de atracciones:</h4>
        {attractions.length > 0 ? (
          <div className="space-y-6">
            {attractions.map((a) => (
              <div key={a.id} className="bg-[#ffe0b2] p-6 rounded-lg shadow-xl flex flex-col md:flex-row items-center space-x-4">
                <div className="w-full md:w-1/3 mb-4 md:mb-0">
                  {a.foto ? (
                    <img
                      src={a.foto}
                      alt={`${a.name} photo`}
                      width={300}
                      height={200}
                      className="rounded-md object-cover"
                    />
                  ) : (
                    <div className="bg-gray-300 w-full h-24 rounded-md"></div>
                  )}
                </div>
                <div className="w-full md:w-2/3">
                  {a.name && <h5 className="text-2xl font-bold mb-2">{a.name}</h5>}
                  {a.description && <p className="text-sm text-gray-700 mb-2">{a.description}</p>}
                  {a.categories && <p><strong>Categories:</strong> {a.categories.join(", ")}</p>}
                  {a.idealFor && <p><strong>Ideal for:</strong> {a.idealFor.join(", ")}</p>}
                  {a.city && <p><strong>City:</strong> {a.city}</p>}
                  {a.country && <p><strong>Country:</strong> {a.country}</p>}
                  {a.region && <p><strong>Region:</strong> {a.region}</p>}
                  {a.duration && <p><strong>Duration:</strong> {a.duration}</p>}
                  {a.price && <p><strong>Price:</strong> {a.price}</p>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm italic">No attractions found.</p>
        )}
      </div>
    </div>
  );
}
