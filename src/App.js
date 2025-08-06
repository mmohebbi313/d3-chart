import React, { useEffect, useState } from "react";
import Chart from "./components/chart/chart";
import Header from "./components/header/header";
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
    <div class="flex justify-center" >
      <Header/>
      <div class="flex flex-col ali items-center justify-between w-[70vw] h-screen mt-[80px]    [@media(min-width:1400px)]:flex-row
           [@media(min-width:1400px)]:flex
           [@media(min-width:1400px)]:justify-between
            [@media(min-width:1400px)]:w-screen
            [@media(min-width:1400px)]:h-screen
            [@media(min-width:1400px)]:mt-[60px]
            [@media(min-width:1400px)]:pl-[60px]
            [@media(min-width:1400px)]:pr-[60px]
            [@media(min-width:1400px)]:items-center">
      {charts.map((chart, index) => (
        <Chart key={index} title={chart.title} data={chart.data} />
      ))}
      </div>
    </div>
  );
};

export default App
