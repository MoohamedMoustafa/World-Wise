import React from "react";
import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCitiesContext } from "../contexts/CitiesContext";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
export default function CityItem({ city }) {
  const { currentCity } = useCitiesContext();
  const {isLoading, deleteCity} = useCitiesContext();
  const { cityName, emoji, date, id, position } = city;
  function handleDeleteCity(e) {
    e.preventDefault();
    deleteCity(city.id);
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          currentCity.id === id && styles["cityItem--active"]
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}> {cityName} </h3>
        <time className={styles.date}> ({formatDate(date)}) </time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>&times;</button>
      </Link>
    </li>
  );
}
