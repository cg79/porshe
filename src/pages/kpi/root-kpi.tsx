import { Box, Tabs, Tab } from "@mui/material";
import React, { useState } from "react";
import TabPanel from "../../components/tab/tab-panel";
import FinancialKpi from "./financial-kpi";
import FoundersStory from "./founders-story";



function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function RootKPI() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
          <FinancialKpi></FinancialKpi>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FoundersStory></FoundersStory>
        </TabPanel>
      </Box>
    </>
  );
}
