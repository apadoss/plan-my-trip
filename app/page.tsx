import firebase from "../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import ListAttractions from "@/components/ListAttractions";
import Header from "@/components/Header";


export default function Home() {

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Plan My Trip</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your personalized travel itinerary starts here.
      </p>
    </main>
  );
}

