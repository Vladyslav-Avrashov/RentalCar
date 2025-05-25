import { Route, Routes } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage";
import CatalogPage from "../../pages/CatalogPage/CatalogPage";
import CarDetailsPage from "../../pages/CarDetailsPage/CarDetailsPage";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";
import Header from "../Header/Header";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CarDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
