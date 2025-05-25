import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BsGeoAlt,
  BsCheckCircle,
  BsCalendar2Week,
  BsCarFront,
  BsFuelPump,
  BsGear,
} from "react-icons/bs";
import s from "./CarDetails.module.css";

const BookingSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  date: Yup.date().required("Booking date is required"),
  comment: Yup.string(),
});

const CarDetails = ({ car }) => {
  const {
    img,
    brand,
    model,
    year,
    rentalPrice,
    address,
    mileage,
    id,
    description,
    type,
    fuelConsumption,
    engineSize,
    accessories,
    functionalities,
    rentalConditions,
  } = car;

  const [locationCity, locationCountry] = address.split(", ").slice(1, 3);
  const fullLocation = `${locationCity}, ${locationCountry}`;

  const accessoriesAndFunc = [
    ...(accessories || []),
    ...(functionalities || []),
  ];

  return (
    <div className={s.wrapper}>
      <div>
        <img src={img} alt={`${brand} ${model}`} className={s.image} />
        <div className={s.formSection}>
          <div className={s.formWrapper}>
            <Formik
              initialValues={{
                name: "",
                email: "",
                date: null,
                comment: "",
              }}
              validationSchema={BookingSchema}
              onSubmit={(values, { resetForm }) => {
                toast.success("Your booking has been submitted!");
                resetForm();
              }}
            >
              {({ setFieldValue, values }) => (
                <Form className={s.form}>
                  <h3 className={s.formTitle}>Book your car now</h3>
                  <p className={s.formSubtitle}>
                    Stay connected! We are always ready to help you.
                  </p>
                  <Field name="name" placeholder="Name*" className={s.input} />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={s.error}
                  />

                  <Field
                    name="email"
                    type="email"
                    placeholder="Email*"
                    className={s.input}
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className={s.error}
                  />

                  <DatePicker
                    selected={values.date}
                    onChange={(date) => setFieldValue("date", date)}
                    placeholderText="Booking date"
                    className={s.input}
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                    calendarStartDay={1}
                  />
                  <ErrorMessage
                    name="date"
                    component="div"
                    className={s.error}
                  />

                  <Field
                    as="textarea"
                    name="comment"
                    placeholder="Comment"
                    rows={3}
                    className={s.textarea}
                  />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className={s.error}
                  />

                  <button type="submit" className={s.button}>
                    Send
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>

      <div className={s.details}>
        <h2 className={s.title}>
          {brand} {model}, {year} <span className={s.id}>Id: {id}</span>
        </h2>
        <p className={s.location}>
          <BsGeoAlt /> {fullLocation} Mileage: {mileage.toLocaleString()} km
        </p>

        <p className={s.price}>${rentalPrice}</p>

        <p className={s.description}>{description}</p>

        <h3>Rental Conditions:</h3>
        <ul className={s.list}>
          {rentalConditions?.map((cond, i) => (
            <li key={i}>
              <BsCheckCircle /> {cond}
            </li>
          ))}
        </ul>

        <h3>Car Specifications:</h3>
        <ul className={s.list}>
          <li>
            <BsCalendar2Week /> Year: {year}
          </li>
          <li>
            <BsCarFront /> Type: {type}
          </li>
          <li>
            <BsFuelPump /> Fuel Consumption: {fuelConsumption}
          </li>
          <li>
            <BsGear /> Engine Size: {engineSize}
          </li>
        </ul>

        <h3>Accessories and functionalities:</h3>
        <ul className={s.list}>
          {accessoriesAndFunc.map((item, i) => (
            <li key={i}>
              <BsCheckCircle /> {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CarDetails;
