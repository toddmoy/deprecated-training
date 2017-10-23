import React from "react";
import Plan from "./Plan";
import PlanData from "./api";
import "./App.css";

const App = props => {
  return (
    <div>
      <h1>Training Plan</h1>
      <Plan startDate={PlanData.startDate} data={PlanData.phases} />
    </div>
  );
};

export default App;
