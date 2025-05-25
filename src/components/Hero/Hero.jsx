import { useNavigate } from "react-router-dom";
import styles from "./Hero.module.css";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Find your perfect rental car</h1>
      <p className={styles.subtitle}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <button className={styles.button} onClick={() => navigate("/catalog")}>
        View Catalog
      </button>
    </section>
  );
};

export default Hero;
