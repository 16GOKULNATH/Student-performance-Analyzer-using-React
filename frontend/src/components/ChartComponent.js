import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = ({ students }) => {
  const data = {
    labels: students.map((s) => s.name),
    datasets: [
      {
        label: "Maths",
        data: students.map((s) => s.marks.Maths),
        backgroundColor: "#0984e3", // blue
      },
      {
        label: "Science",
        data: students.map((s) => s.marks.Science),
        backgroundColor: "#00cec9", // teal
      },
      {
        label: "English",
        data: students.map((s) => s.marks.English),
        backgroundColor: "#fd79a8", // pink
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      tooltip: {
        backgroundColor: "#2d3436",
        titleColor: "#ffffff",
        bodyColor: "#ffffff",
      },
      title: {
        display: true,
        text: "Student Performance Chart",
        font: { size: 18 },
        color: "#2d3436",
      },
    },
    scales: {
      x: { stacked: true, ticks: { color: "#2d3436" } },
      y: { stacked: true, beginAtZero: true, max: 100, ticks: { color: "#2d3436" } },
    },
  };

  return (
    <div className="chart-section">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ChartComponent;
