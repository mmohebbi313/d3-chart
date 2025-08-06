import React, { useEffect, useState } from "react";
import Chart from "./chart/chart";
import Header from "./header/header";
import './App.css'

const App = () => {
  const [charts, setCharts] = useState([]);

  useEffect(() => {
    fetch("/data.json")
      .then(res => res.json())
      .then(setCharts)
      .catch(err => console.error("Error loading data.json", err));
  }, []);

  return (
    <div className="app-div">
      <Header/>
      <div className="div-chart">
      {charts.map((chart, index) => (
        <Chart key={index} title={chart.title} data={chart.data} />
      ))}
      </div>
    </div>
  );
};

export default App
