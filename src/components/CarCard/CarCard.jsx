import { useNavigate } from "react-router-dom";
import s from "./CarCard.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectFavorites } from "../../redux/favs/selectors";
import { toggleFavorite } from "../../redux/favs/slice";
import { BsHeart, BsHeartFill } from "react-icons/bs";

const CarCard = ({ car }) => {
  const {
    id,
    img,
    brand,
    model,
    year,
    rentalPrice,
    address,
    rentalCompany,
    type,
    mileage,
  } = car;

  const location = address.split(", ").slice(1, 3);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const favorites = useSelector(selectFavorites);
  const isFavorite = favorites.includes(id);

  const handleFavoriteToggle = () => {
    dispatch(toggleFavorite(id));
  };

  const handleReadMore = () => {
    navigate(`/catalog/${id}`);
  };

  return (
    <div className={s.card}>
      <div className={s.imgWrapper}>
        <img src={img} alt={`${brand} ${model}`} className={s.image} />
        <button
          className={`${s.favoriteIcon} ${isFavorite ? s.active : ""}`}
          onClick={handleFavoriteToggle}
        >
          {isFavorite ? <BsHeartFill /> : <BsHeart />}
        </button>
      </div>

      <div className={s.header}>
        <p className={s.title}>
          {brand} <span className={s.model}>{model}</span>, {year}
        </p>
        <p>${rentalPrice}</p>
      </div>

      <div className={s.infoContainer}>
        <ul className={s.infoRow}>
          <li>{location[0]}</li>
          <li>{location[1]}</li>
          <li>{rentalCompany}</li>
        </ul>
        <ul className={s.infoRow}>
          <li>{type}</li>
          <li>{mileage.toLocaleString()} km</li>
        </ul>
      </div>

      <button className={s.button} onClick={handleReadMore}>
        Read more
      </button>
    </div>
  );
};

export default CarCard;
