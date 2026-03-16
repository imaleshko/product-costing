import * as XLSX from "xlsx";

export const exportToExcel = (products) => {
  const data = products.map((product) => ({
    "Назва продукту": product.productName,
    "Сировина та основні матеріали": product.materialPrice.perUnit,
    "Допоміжні матеріали": product.additionalMaterialPrice.perUnit,
    "Зворотні відходи": product.returnWaste.perUnit,
    "Основна з/п": product.basicSalary.perUnit,
    "Додаткова з/п": product.additionalSalary.perUnit,
    "Нараховано ЄСВ": product.socialContribution.perUnit,
    "Витрати на підготовку та освоєння виробництва":
      product.productionPreparationCosts.perUnit,
    "Загальновиробничі витрати": product.generalProductionCosts.perUnit,
    "Адміністративні витрати": product.administrativeExpenses.perUnit,
    "Виробнича собівартість": product.total.perUnit,
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(workbook, worksheet, "Планова калькуляція");
  XLSX.writeFile(workbook, "Планова калькуляція.xlsx");
};
