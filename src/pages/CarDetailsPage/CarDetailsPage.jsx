import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarByIdThunk } from "../../redux/cars/operations";
import CarDetails from "../../components/CarDetails/CarDetails";
import Loader from "../../components/Loader/Loader";

const CarDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { selectedCar, isLoading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCarByIdThunk(id));
  }, [dispatch, id]);

  if (isLoading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!selectedCar) return <p>Car not found</p>;

  return <CarDetails car={selectedCar} />;
};

export default CarDetailsPage;
