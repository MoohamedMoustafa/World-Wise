import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

export default function CitiesContextProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (res.ok) {
          const data = await res.json();
          setCities(data);
        }
      } catch (error) {
        console.error("error in fetchCities()", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  async function getCurrentCity(id) {
    try {
      setIsLoading(true);
      console.log("before if");
      
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      console.log("after fetch");
      
      if (res.ok) {
        console.log("res.OK");
        const data = await res.json();
        setCurrentCity(data);
        console.log("current city: ", data);
      }
    } catch (error) {
      console.error("error in fetchCities()", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCurrentCity,
        currentCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export function useCitiesContext() {
  const context = useContext(CitiesContext);
  if (context === undefined) {
    throw new Error("useCitiesContext was used outside CitiesContextProvider");
  }
  return context;
}
