import firebase from "../firebase/clientApp";
import { useCollection } from "react-firebase-hooks/firestore";
import ListAttractions from "@/components/ListAttractions";
import Header from "@/components/Header";
import Register from "@/components/register";

export default function Home() {

  return (
    <>
      <div className="bg-white h-screen w-screen text-black flex flex-col items-center justify-center">
        
        <Register />
      </div>
    </>
  );
}
