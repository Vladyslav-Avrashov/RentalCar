// src/pages/CatalogPage/CatalogPage.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarsThunk } from "../../redux/cars/operations";
import {
  selectCars,
  selectLoading,
  selectError,
  selectPage,
  selectHasMore,
} from "../../redux/cars/selectors";
import { incrementPage } from "../../redux/cars/slice";
import CarList from "../../components/CarList/CarList";
import FilterComponent from "../../components/FilterComponent/FilterComponent";
import Loader from "../../components/Loader/Loader"; // імпортуємо Loader
import s from "./CatalogPage.module.css";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const cars = useSelector(selectCars);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const currentPage = useSelector(selectPage);
  const hasMore = useSelector(selectHasMore);
  const [fetchAttempted, setFetchAttempted] = useState(false);

  useEffect(() => {
    dispatch(fetchCarsThunk())
      .unwrap()
      .catch(() => {})
      .finally(() => {
        setFetchAttempted(true);
      });
  }, [dispatch, currentPage]);

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      dispatch(incrementPage());
    }
  };

  const showNoResultsMessage =
    fetchAttempted && !loading && !error && cars.length === 0;

  return (
    <div className={s.catalogContainer}>
      <FilterComponent />

      {loading && <Loader />}
      {error && <p className={s.messageCenter}>Error: {error}</p>}

      {showNoResultsMessage && <p className={s.messageCenter}>No cars found</p>}

      {!error && cars.length > 0 && <CarList cars={cars} />}

      {!loading && hasMore && cars.length > 0 && !error && (
        <button onClick={handleLoadMore} className={s.loadMoreButton}>
          Load more
        </button>
      )}
    </div>
  );
};

export default CatalogPage;
