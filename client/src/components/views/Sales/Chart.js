import React from "react";
import "./chart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "Jan",
    "Active User": 4490,
  },
  {
    name: "Feb",
    "Active User": 3430,
  },
  {
    name: "Mar",
    "Active User": 2490,
  },
  {
    name: "Apr",
    "Active User": 3390,
  },
  {
    name: "May",
    "Active User": 1230,
  },
  {
    name: "Jun",
    "Active User": 5290,
  },
  {
    name: "Jul",
    "Active User": 2390,
  },
  {
    name: "Aug",
    "Active User": 4540,
  },
  {
    name: "Sep",
    "Active User": 4265,
  },
  {
    name: "Oct",
    "Active User": 4340,
  },
  {
    name: "Nov",
    "Active User": 3807,
  },
  {
    name: "Dec",
    "Active User": 3630,
  },
];

function Chart() {
  return (
    <div className="chart">
      <h3 className="chartTitle">Sales Analytics</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data}>
          <XAxis dataKey="name" stroke="5550bd" />
          <Line type="monotone" dataKey="Active User" />
          <Tooltip />
          <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
