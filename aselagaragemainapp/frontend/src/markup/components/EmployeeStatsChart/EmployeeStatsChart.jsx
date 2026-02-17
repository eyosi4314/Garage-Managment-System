// src/components/EmployeeStatsChart.jsx
import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Card } from "react-bootstrap";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

const api_url = import.meta.env.VITE_API_URL;

// Register necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const EmployeeStatsChart = () => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeStats = async () => {
      try {
        const response = await axios.get(`${api_url}/api/employees/stats`);

        const data = response.data.data;

        if (data) {
          setChartData({
            labels: [
              "Active Employees",
              "Inactive Employees",
              "Total Employees",
            ],
            datasets: [
              {
                label: "Employee Status",
                data: [
                  data.activeEmployees,
                  data.inactiveEmployees,
                  data.totalEmployees,
                ],
                backgroundColor: [
                  "rgba(0, 255, 0, 0.6)", // same green
                  "rgba(255, 99, 132, 0.6)", // same red
                  "rgba(255, 159, 64, 0.6)", // same orange
                ],
                borderColor: [
                  "rgba(0, 255, 0, 1)",
                  "rgba(255, 99, 132, 1)",
                  "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
              },
            ],
          });
        } else {
          setError("Data is empty or not in expected format.");
        }
      } catch (error) {
        console.error("Error fetching employee stats:", error);
        setError("Error fetching employee stats.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeStats();
  }, []);

  if (loading) {
    return (
      <Card
        style={{ backgroundColor: "#fff", borderColor: "#ddd", height: "80vh" }}
      >
        <Card.Header as="h5" style={{ color: "#000" }}>
          Employee Statistics
        </Card.Header>
        <Card.Body style={{ height: "100%" }}>Loading...</Card.Body>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        style={{ backgroundColor: "#fff", borderColor: "#ddd", height: "80vh" }}
      >
        <Card.Header as="h5" style={{ color: "#000" }}>
          Employee Statistics
        </Card.Header>
        <Card.Body style={{ height: "100%" }}>{error}</Card.Body>
      </Card>
    );
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "#000",
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw || 0;
            return `${label}: ${value} Employees`;
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#000",
        },
      },
      y: {
        ticks: {
          color: "#000",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Card
      style={{ backgroundColor: "#fff", borderColor: "#ddd", height: "80vh" }}
    >
      <Card.Header as="h5" style={{ color: "#000" }}>
        Employee Statistics
      </Card.Header>
      <Card.Body style={{ height: "100%" }}>
        <div style={{ height: "100%" }}>
          <Bar data={chartData} options={options} />
        </div>
      </Card.Body>
    </Card>
  );
};

export default EmployeeStatsChart;
