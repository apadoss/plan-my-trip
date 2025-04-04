import firebase from "../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import ListAttractions from "@/components/ListAttractions";

export default function Home() {

  return (
    <div className="bg-white h-screen w-screen text-black flex flex-col items-center justify-center">
      PlanMyTrip
      <ListAttractions />
    </div>
  );
}
