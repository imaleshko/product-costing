import styles from "./InputForm.module.css";
import { useState } from "react";
import { usePostProduct } from "../../hooks/usePostProduct.js";

const InputForm = () => {
  const { save, isPending } = usePostProduct();

  const initializeFormState = {
    productName: "",
    number: "",
    materialPrice: "",
    additionalMaterialPrice: "",
    returnWaste: "",
    basicSalary: "",
    additionalSalary: "",
    generalProductionCosts: "",
  };

  const [data, setData] = useState(initializeFormState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    save(data, {
      onSuccess: () => {
        setData(initializeFormState);
      },
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1 className={styles.title}>Додати продукт</h1>
      <div className={styles.inputGroup}>
        <label htmlFor="productName" className={styles.label}>
          Назва продукту
        </label>
        <input
          type="text"
          id="productName"
          name="productName"
          value={data.productName}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="number" className={styles.label}>
          Кількість продукції
        </label>
        <input
          type="text"
          id="number"
          name="number"
          value={data.number}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="materialPrice" className={styles.label}>
          Сировина та основні витрати
        </label>
        <input
          type="text"
          id="materialPrice"
          name="materialPrice"
          value={data.materialPrice}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="additionalMaterialPrice" className={styles.label}>
          Допоміжні матеріали
        </label>
        <input
          type="text"
          id="additionalMaterialPrice"
          name="additionalMaterialPrice"
          value={data.additionalMaterialPrice}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="returnWaste" className={styles.label}>
          Зворотні відходи
        </label>
        <input
          type="text"
          id="returnWaste"
          name="returnWaste"
          value={data.returnWaste}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="basicSalary" className={styles.label}>
          Основна з/п виробничих робітників
        </label>
        <input
          type="text"
          id="basicSalary"
          name="basicSalary"
          value={data.basicSalary}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="additionalSalary" className={styles.label}>
          Додаткова з/п виробничих робітників
        </label>
        <input
          type="text"
          id="additionalSalary"
          name="additionalSalary"
          value={data.additionalSalary}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <div className={styles.inputGroup}>
        <label htmlFor="generalProductionCosts" className={styles.label}>
          Загальновиробничі витрати
        </label>
        <input
          type="text"
          id="generalProductionCosts"
          name="generalProductionCosts"
          value={data.generalProductionCosts}
          onChange={handleChange}
          className={styles.input}
          required
        />
      </div>
      <button className={styles.button} type={"submit"} disabled={isPending}>
        Додати
      </button>
    </form>
  );
};

export default InputForm;
