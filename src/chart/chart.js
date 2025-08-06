import React, { useRef, useEffect } from "react";
import './chart.css'
import * as d3 from "d3";
import {
  isMultiSeries,
  extractSingleSeries,
  extractMultiSeries
} from "../utils";

function Chart({ title, data }) {
  const svgRef = useRef();

  let sizing = window.innerWidth

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width =   sizing <= 676 ? 380 : 600;
    const height =  sizing <= 676 ? 245 : 300;
    const margin = sizing <= 676 ? { top: 20, right: 25, bottom: 30, left: 15 }  : { top: 20, right: 30, bottom: 30, left: 40 };

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

    svg.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

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
    <div className="div-box">
      <h3>{title}</h3>
      <svg ref={svgRef} width={ sizing <= 676 ? 400 : 600 } height={300} />
    </div>
  );
}

export default Chart;