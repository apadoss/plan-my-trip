'use client';

import { useState, ChangeEvent, KeyboardEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars, FaSearch } from 'react-icons/fa';

interface City {
  name: string;
  slug: string;
}

const cities: City[] = [
  { name: "Gran Canaria", slug: "Gran-Canaria" },
  { name: "Tenerife", slug: "Tenerife" },
  { name: "Madrid", slug: "Madrid" },
  { name: "Barcelona", slug: "Barcelona" },
  { name: "Sevilla", slug: "Sevilla" },
  { name: "Valencia", slug: "Valencia" },
  { name: "Mallorca", slug: "Mallorca" },
  { name: "Málaga", slug: "Malaga" },
  { name: "Galicia", slug: "Galicia" },
  { name: "Ibiza", slug: "Ibiza" },
  { name: "Granada", slug: "Granada" },
  { name: "Bilbao", slug: "Bilbao" },
];

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState<City[]>([]);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 0) {
      const match = cities.filter(city =>
        city.name.toLowerCase().startsWith(value.toLowerCase())
      );
      setFiltered(match);
    } else {
      setFiltered([]);
    }
  };

  const handleSelect = (slug: string) => {
    setQuery('');
    setFiltered([]);
    router.push(`/details/${slug}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // <- Importante para evitar comportamiento por defecto

      const input = query.trim().toLowerCase();

      const exactMatch = cities.find(
        (city) => city.name.trim().toLowerCase() === input
      );

      if (exactMatch) {
        handleSelect(exactMatch.slug);
        return;
      }

      const partialMatches = cities.filter(city =>
        city.name.toLowerCase().startsWith(input)
      );

      if (partialMatches.length === 1) {
        handleSelect(partialMatches[0].slug);
      }
    }
  };

  return (
    <div className="relative hidden md:flex items-center bg-gray-300 rounded-full px-4 py-2 w-full max-w-lg">
      <FaBars className="text-gray-600 mr-3" />
      <input
        type="text"
        placeholder="search destinations"
        value={query}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="bg-transparent flex-1 outline-none text-sm text-gray-800 placeholder-gray-600"
      />
      <FaSearch className="text-gray-600 ml-3" />

      {filtered.length > 0 && (
        <ul className="absolute top-full left-0 right-0 bg-white mt-2 rounded shadow-lg z-10 max-h-60 overflow-y-auto">
          {filtered.map((city) => (
            <li
              key={city.slug}
              onClick={() => handleSelect(city.slug)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {city.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
