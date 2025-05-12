// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCitiesContext } from "../contexts/CitiesContext";
import { useNavigate } from "react-router-dom";

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const {createNewCity, isLoading} = useCitiesContext();
  const [lat, lng] = useUrlPosition();
  const navigation = useNavigate();
  // const [startDate, setStartDate] = useState(new Date());
  const [isLoadingGeocodins, setIsLoadingGeocodins] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geoError, setGeoError] = useState("");

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocodins(true);
        setGeoError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        if (!res.OK) {
          const data = await res.json();
          // console.log(data);
          if (!data.countryCode) {
            throw new Error("this is not a valid country");
          }
          setCityName(data.city || data.locality || "");
          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        }
      } catch (error) {
        console.error(error);
        setGeoError(error.message);
      } finally {
        setIsLoadingGeocodins(false);
      }
    }

    fetchCityData();
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };
    // console.log("newCity",newCity);
    await createNewCity(newCity);
    navigation("/app/cities")
  }

  if (isLoadingGeocodins) {
    return <Spinner />;
  }

  if (geoError) {
    return <Message message={geoError} />;
  }
  if (!lat || !lng) {
    return <Message message="Start by clicking somewhere on the map." />;
  }

  // if(isLoading) {
  //   return <Spinner />;
  // }

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          /> */}
        <DatePicker
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        {/* <Button type="back" onClick={navigateBack} >&larr; Back</Button> */}
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
