import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

export default function CitiesContextProvider({children}) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        if (res.ok) {
          const data = await res.json();
          console.log(data);
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

  return <CitiesContext.Provider value={{
    cities,
    isLoading,
  }}>
    {children}
  </CitiesContext.Provider>
}

export function useCitiesContext() {
    const context = useContext(CitiesContext);
    if(context === undefined) {
        throw new Error("useCitiesContext was used outside CitiesContextProvider")
    }
    return context;
}
