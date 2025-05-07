import React from "react";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from './Message';
import { useCitiesContext } from "../contexts/CitiesContext";
export default function CityList(
  // { cities, isLoading }
  
) {
  const {cities, isLoading} = useCitiesContext()
  if (isLoading) return <Spinner />;
  if(!cities.length) return <Message message={"Add your first city by clicking on the map"} />
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} /> 
      ))}
    </ul>
  );
}
