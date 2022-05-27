import { Box, Tabs, Tab } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import TabPanel from "../../components/tab/tab-panel";
import FinancialKpi from "./financial-kpi";
import FoundersStory from "./founders-story";
import store from "../../store/company/CompaniesStore";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RootKPI() {
  const { query } = useRouter();

  const [value, setValue] = useState(0);
  const [company, setCompany] = useState(null);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    store.load();

    const companyId = (query.companId || "") as string;
    const companyValue = store.list.find((el:any) => el.id == companyId);

    setCompany(companyValue || null);

  }, []);

  
  // debugger;
  
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Financial KPI’s" {...a11yProps(0)} />
            <Tab label="Founders Story" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <FinancialKpi
            data={{
              company,
            }}
          ></FinancialKpi>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FoundersStory
            data={{
              company,
            }}
          ></FoundersStory>
        </TabPanel>
      </Box>
    </>
  );
}
