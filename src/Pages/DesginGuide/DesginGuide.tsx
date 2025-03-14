import React from "react";
import Table from "../../Components/Table/Table";
import RatioList from "../../Components/RatioList/RatioList";
import { TestDataCompany } from "../../Components/Table/testData";
type Props = {};
const DesignGuide = (props: Props) => {
  const data = TestDataCompany;
const tableConfig = [
  {
    label: "symbol",
    render: (company: any) => company.symbol,
  },
];
  return (
    <>
      <h1>
        Design guide- This is the design guide for Fin Shark. These are reuable
        components of the app with brief instructions on how to use them.
      </h1>
      <Table config={tableConfig} data={data} />
      <RatioList config={tableConfig} data={data} />
      <h3>
        Table - Table takes in a configuration object and company data as
        params. Use the config to style your table.
      </h3>
    </>
  );
};
export default DesignGuide;