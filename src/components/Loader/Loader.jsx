import s from "./Loader.module.css";
import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className={s.loader}>
      <PulseLoader color="#3470ff" />
    </div>
  );
};

export default Loader;
