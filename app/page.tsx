import Link from "next/link";
import Image from "next/image";

const cities = [
  { name: "Gran Canaria", image: "/images/laspalmas.jpg", slug: "Gran-Canaria" },
  { name: "Tenerife", image: "/images/tenerife.png", slug: "Tenerife" },
  { name: "Madrid", image: "/images/madrid.avif", slug: "Madrid" },
  { name: "Barcelona", image: "/images/barcelona.avif", slug: "Barcelona" },
  { name: "Sevilla", image: "/images/sevilla.jpg", slug: "Sevilla" },
  { name: "Valencia", image: "/images/valencia.jpg", slug: "Valencia" },
  { name: "Mallorca", image: "/images/mallorca.avif", slug: "Mallorca" },
  { name: "Málaga", image: "/images/malaga.jpg", slug: "Malaga" },
  { name: "Galicia", image: "/images/galicia.jpg", slug: "Galicia" },
  { name: "Ibiza", image: "/images/ibiza.webp", slug: "Ibiza" },
  { name: "Granada", image: "/images/granada.jpg", slug: "Granada" },
  { name: "Bilbao", image: "/images/bilbao.jpg", slug: "Bilbao" }
];

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center bg-white">
      <div className="bg-primary w-full py-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-black">
          Explore Destinations
        </h1>
      </div>
      <div className="max-w-6xl w-full px-4 py-10 bg-[var(--color-primary-20)] shadow-md rounded-md mt-6 text-center">
        <h2 className="text-2xl md:text-3xl font-semibold text-orange-700 mb-8">
          Visit the most famous places Spain!
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cities.map((city) => (
            <Link key={city.name} href={`/details`}>
              <div className="cursor-pointer transition duration-300 transform hover:scale-105">
                <div className="rounded-lg overflow-hidden shadow hover:shadow-lg">
                  <Image
                    src={city.image}
                    alt={city.name}
                    width={400}
                    height={250}
                    className="object-cover w-[400px] h-[250px] hover:brightness-75 transition duration-300"
                  />
                </div>
                <p className="mt-2 text-lg font-medium text-black">{city.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
