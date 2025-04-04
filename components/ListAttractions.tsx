"use client"

import { useState, useEffect } from "react"
import db from "../firebase/firestore"
import { collection, getDocs } from "firebase/firestore"

// Define an interface for your attraction data
interface Attraction {
  id: string;
  // Add other properties that your attractions have
  name?: string;
  description?: string;
  location?: string;
  // Add any other fields from your Firestore documents
}

const ListAttractions = () => {
  // Specify the type for your state
  const [attractions, setAttractions] = useState<Attraction[]>([])
  
  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "attractions"))
        setAttractions(
          querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
          })) as Attraction[]
        )
      } catch (error) {
        console.error("Error fetching attractions:", error)
      }
    }
    
    fetchAttractions()
  }, []) // Don't forget the dependency array to prevent infinite loops
  
  return (
    <div>
      <h1>Attractions</h1>
      <ul>
        {attractions.map((attraction) => (
          <li key={attraction.id}>
            {attraction.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListAttractions