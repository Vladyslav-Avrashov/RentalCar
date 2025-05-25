import CarCard from "../CarCard/CarCard";
import styles from "./CarList.module.css";

const CarList = ({ cars }) => {
  return (
    <ul className={styles.list}>
      {cars.map((car) => (
        <li key={car.id} className={styles.item}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
};

export default CarList;
