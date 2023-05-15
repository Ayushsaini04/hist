import React, { useState, useEffect } from 'react';
import './Histogram.css';
import * as d3 from 'd3'; // import d3 library

function HistogramComponent() {
  const [text, setText] = useState('');
  const [histogramData, setHistogramData] = useState([]);
  const fetchData = async () => {
    const response = await fetch('https://www.terriblytinytales.com/test.txt');
    const data = await response.text();
    const words = data.split(/\s+/);
    const counts = {};
    words.forEach((word) => {
      if (counts[word]) {
        counts[word]++;
      } else {
        counts[word] = 1;
      }
    });
    const top20Words = Object.keys(counts)
      .sort((a, b) => counts[b] - counts[a])
      .slice(0, 20);
      const histogramData = top20Words.map((word) => ({ word, count: counts[word] }));
      setHistogramData(histogramData);
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;
    const x = d3.scaleBand().range([0, width]).padding(0.1);
    const y = d3.scaleLinear().range([height, 0]);
    const svg = d3
      .select('#chart')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);
    x.domain(histogramData.map((d) => d.word));
    y.domain([0, d3.max(histogramData, (d) => d.count)]);
    svg.append("text")
    .attr("class", "axis-title")
    .attr("text-anchor", "middle")
    .attr("x", width / 2)
    .attr("y", height + margin.top + 10)
    .text("Words");
  svg.append("text")
    .attr("class", "axis-title")
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .attr("x", -height / 2)
    .attr("y", -margin.left + 10)
    .text("Frequency"); 
    svg
      .selectAll('.bar')
      .data(histogramData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.word))
      .attr('width', x.bandwidth())
      .attr('y', (d) => y(d.count))
      .attr('height', (d) => height - y(d.count));
    svg
      .append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g').call(d3.axisLeft(y));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const downloadCsv = () => {
    const csvContent = 'data:text/csv;charset=utf-8,' + d3.csvFormat(histogramData);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'histogram-data.csv');
    document.body.appendChild(link);
    link.click();
  };
  return (
    <div className="Histogram">
      <p>{text}</p>
      <div id="chart"></div>
      <button onClick={downloadCsv}>Export</button>
    </div>
  );
}
export default HistogramComponent;
