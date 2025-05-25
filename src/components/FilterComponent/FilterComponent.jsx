import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GoChevronUp } from "react-icons/go";
import { fetchBrandsThunk, fetchCarsThunk } from "../../redux/cars/operations";
import { updateFilterValue, applyFilters } from "../../redux/cars/slice";
import { selectBrands, selectFilters } from "../../redux/cars/selectors";
import s from "./FilterComponent.module.css";

const generatePriceOptions = (maxPrice, step) => {
  const options = [];
  for (let i = step; i <= maxPrice; i += step) {
    options.push(i);
  }
  return options;
};

const FilterComponent = () => {
  const dispatch = useDispatch();
  const availableBrands = useSelector(selectBrands);
  const currentFilters = useSelector(selectFilters);
  const [brandOpen, setBrandOpen] = useState(false);
  const [priceOpen, setPriceOpen] = useState(false);
  const brandRef = useRef(null);
  const priceRef = useRef(null);
  const priceOptions = generatePriceOptions(80, 10);

  useEffect(() => {
    if (!availableBrands.length) {
      dispatch(fetchBrandsThunk());
    }
  }, [dispatch, availableBrands.length]);

  const handleInputChange = (field, value, subField = null) => {
    let processedValue = value;
    if (
      (field === "mileage" && (subField === "from" || subField === "to")) ||
      field === "rentalPrice"
    ) {
      processedValue = value.replace(/[^0-9]/g, "");
    }
    dispatch(updateFilterValue({ field, value: processedValue, subField }));
  };

  const handleSearch = () => {
    dispatch(applyFilters());
    dispatch(fetchCarsThunk());
  };

  const handleBrandFocus = () => setBrandOpen(true);
  const handleBrandBlur = () => setBrandOpen(false);
  const handlePriceFocus = () => setPriceOpen(true);
  const handlePriceBlur = () => setPriceOpen(false);

  return (
    <div className={s.filterContainer}>
      <div className={s.filterGroup}>
        <label htmlFor="brand-select" className={s.label}>
          Car brand
        </label>
        <div className={s.customSelectWrapper}>
          <select
            id="brand-select"
            value={currentFilters.brand || ""}
            onChange={(e) => handleInputChange("brand", e.target.value)}
            className={s.select}
            onFocus={handleBrandFocus}
            onBlur={handleBrandBlur}
            ref={brandRef}
          >
            <option value="">Choose a brand</option>
            {availableBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <span
            className={s.selectArrow}
            data-open={brandOpen}
            aria-hidden="true"
          >
            <GoChevronUp size={22} />
          </span>
        </div>
      </div>

      <div className={s.filterGroup}>
        <label htmlFor="price-select" className={s.label}>
          Price / 1 hour
        </label>
        <div className={s.customSelectWrapper}>
          <select
            id="price-select"
            value={currentFilters.rentalPrice || ""}
            onChange={(e) => handleInputChange("rentalPrice", e.target.value)}
            className={s.select}
            onFocus={handlePriceFocus}
            onBlur={handlePriceBlur}
            ref={priceRef}
          >
            <option value="">Choose a price</option>
            {priceOptions.map((price) => (
              <option key={price} value={String(price)}>
                ${price}
              </option>
            ))}
          </select>
          <span
            className={s.selectArrow}
            data-open={priceOpen}
            aria-hidden="true"
          >
            <GoChevronUp size={22} />
          </span>
        </div>
      </div>

      <div className={s.filterGroup}>
        <label className={s.label}>Car mileage / km</label>
        <div className={s.mileageInputs}>
          <input
            type="text"
            placeholder="From"
            value={currentFilters.mileage?.from || ""}
            onChange={(e) =>
              handleInputChange("mileage", e.target.value, "from")
            }
            className={`${s.input} ${s.mileageInputFrom}`}
          />
          <input
            type="text"
            placeholder="To"
            value={currentFilters.mileage?.to || ""}
            onChange={(e) => handleInputChange("mileage", e.target.value, "to")}
            className={`${s.input} ${s.mileageInputTo}`}
          />
        </div>
      </div>

      <button onClick={handleSearch} className={s.searchButton}>
        Search
      </button>
    </div>
  );
};

export default FilterComponent;
