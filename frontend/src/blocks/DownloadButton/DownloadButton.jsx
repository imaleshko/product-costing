import { exportToExcel } from "../../utils/exportToExcel.js";
import { useGetProducts } from "../../hooks/useGetProducts";
import styles from "./DownloadButton.module.css";

const DownloadButton = () => {
  const { refetch } = useGetProducts();
  const onClick = async () => {
    const { data } = await refetch();
    exportToExcel(data);
  };
  return (
    <button className={styles.button} onClick={onClick}>
      Завантажити
    </button>
  );
};

export default DownloadButton;
