import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  // useState,
} from "react";

const BASE_URL = "http://localhost:8000";
const CitiesContext = createContext();

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};
function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.payload };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return { ...state, isLoading: false, currentCity: {} };

    case "rejected":
      return { ...state, error: action.payload };

    default:
      throw new Error("unknwon action type");
  }
}

export default function CitiesContextProvider({ children }) {
  const [{ isLoading, cities, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetchCities();
  }, []);

  async function fetchCities() {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`);
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      }
    } catch (error) {
      console.error("error in fetchCities()", error);
      dispatch({ type: "rejected", payload: "error in loading cities..." });
    }
  }
  const getCurrentCity = useCallback(
    async function getCurrentCity(id) {
      if (Number(id) === currentCity.id) return;
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        if (res.ok) {
          const data = await res.json();
          dispatch({ type: "city/loaded", payload: data });
        }
      } catch (error) {
        console.error("error in fetchCities()", error);
        dispatch({
          type: "rejected",
          payload: "there was an error in setting current city",
        });
      }
    },
    [currentCity.id]
  );

  async function createNewCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const data = await res.json(); ////////////////////////////////////////////////////////

        dispatch({ type: "city/created", payload: data });
      }
    } catch (error) {
      console.error("error in createNewCity()", error);
      dispatch({
        type: "rejected",
        payload: "there was an error adding new city",
      });
    }
  }

  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        console.log("city removed successfully");
        dispatch({ type: "city/deleted" });
        fetchCities();
      }
    } catch (error) {
      console.error("error id deleteCity()", error);
      dispatch({
        type: "rejected",
        payload: "there was an error deleting a city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        getCurrentCity,
        currentCity,
        createNewCity,
        deleteCity,
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
