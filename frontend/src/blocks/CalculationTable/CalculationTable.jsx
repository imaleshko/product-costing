import styles from "./CalculationTable.module.css";
import { useGetProducts } from "../../hooks/useGetProducts";
import { Fragment } from "react";

const CalculationTable = () => {
  const { products } = useGetProducts();

  const rows = [
    { id: 1, name: "Сировина та основні матеріали", key: "materialPrice" },
    { id: 2, name: "Допоміжні матеріали", key: "additionalMaterialPrice" },
    { id: 3, name: "Зворотні відходи", key: "returnWaste" },
    { id: 4, name: "Основна з/п виробничих робітників", key: "basicSalary" },
    {
      id: 5,
      name: "Додаткова з/п виробничих робітників",
      key: "additionalSalary",
    },
    { id: 6, name: "Нараховано ЄСВ", key: "socialContribution" },
    {
      id: 7,
      name: "Витрати на підготовку та освоєння",
      key: "productionPreparationCosts",
    },
    { id: 8, name: "Загальновиробничі витрати", key: "generalProductionCosts" },
    { id: 9, name: "Адміністративні витрати", key: "administrativeExpenses" },
  ];

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th rowSpan={2}>№</th>
            <th rowSpan={2}>Перелік статей витрат</th>
            {products.map((product) => (
              <th key={product._id} colSpan={2}>
                {product.productName}
              </th>
            ))}
          </tr>
          <tr>
            {products.map((product) => (
              <Fragment key={`sub${product._id}`}>
                <th>На одиницю</th>
                <th>На випуск</th>
              </Fragment>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.name}</td>
              {products.map((product) => (
                <Fragment key={`${row.id}-${product._id}`}>
                  <td>
                    {product[row.key]?.perUnit?.toFixed(2) || (0).toFixed(2)}
                  </td>
                  <td>
                    {product[row.key]?.perBatch?.toFixed(2) || (0).toFixed(2)}
                  </td>
                </Fragment>
              ))}
            </tr>
          ))}
          <tr>
            <td colSpan={2}>Виробнича собівартість</td>
            {products.map((product) => (
              <Fragment key={`total-${product._id}`}>
                <td>{product.total?.perUnit?.toFixed(2) || (0).toFixed(2)}</td>
                <td>{product.total?.perBatch?.toFixed(2) || (0).toFixed(2)}</td>
              </Fragment>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default CalculationTable;
