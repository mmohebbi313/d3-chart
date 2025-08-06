
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import {
  isMultiSeries,
  extractSingleSeries,
  extractMultiSeries
} from "../../utils";

function Chart({ title, data }) {
  const svgRef = useRef();

  let sizing = window.innerWidth;

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = sizing <= 767 ? 330 : 600;
    const height = sizing <= 767 ? 245 : 300;
    const margin = sizing <= 767
      ? { top: 20, right: 25, bottom: 30, left: 15 }
      : { top: 20, right: 30, bottom: 30, left: 40 };

    const series = isMultiSeries(data)
      ? extractMultiSeries(data)
      : [{ data: extractSingleSeries(data), color: "steelblue" }];

    const allPoints = series.flatMap(s => s.data);

    const xScale = d3.scaleLinear()
      .domain(d3.extent(allPoints, d => d.x))
      .range([margin.left, width - margin.right]);

    const yScale = d3.scaleLinear()
      .domain(d3.extent(allPoints, d => d.y))
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3.line()
      .x(d => xScale(d.x))
      .y(d => yScale(d.y));


    const xTickStep = sizing <= 767 ? 10000 : 5000;
    const xTickCount = (xScale.domain()[1] - xScale.domain()[0]) / xTickStep;

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(xTickCount));

    svg.append("g")
      .attr("transform", `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale));

    series.forEach(({ data, color }) => {
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", color)
        .attr("stroke-width", 2)
        .attr("d", line);
    });

  }, [data]);

  return (
    <div class="bg-[#bfbfbf] p-[10px] rounded-[10px] shadow-[0_0_15px_-5px_black]
    transition-all duration-500 ease-in-out 
     max-[767px]:w-[328px] max-[767px]:h-[290px] max-[767px]:p-[5px] max-[767px]:mt-[30px] max-[767px]:items-center:
    hover:-translate-y-[5px] hover:bg-[#e0dede] hover:shadow-[0_0_20px_-3px_rgb(72,72,72)]
     " >
      <h3>{title}</h3>
      <svg
        ref={svgRef}
        width={sizing <= 767 ? 350 : 600}
        height={300}
      />
    </div>
  );
}

export default Chart;