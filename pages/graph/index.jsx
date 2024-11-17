import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

import { Chart, registerables } from "chart.js";
import PieModal from "../../components/pieModal";

// Register Chart.js components
Chart.register(...registerables);

const generateEEGAmplitude = (t) => {
  const baseWave = 50 + 20 * Math.sin(t / 20); // Slower sine wave for 20 seconds
  const noise = Math.random() * 15 - 7.5; // Random noise in range [-7.5, 7.5]
  return Math.round(baseWave + noise);
};
const generateInitialData = () => {
  const data = [];
  for (let i = 0; i < 60; i++) {
    data.push({
      Frequency: i * 2, 
      Amplitude: generateEEGAmplitude(i),
    });
  }
  return data;
};

export default function RealTimeSinusoidalWave() {
  const chartRef = useRef(null);
  const router = useRouter();
  const [count, setCount] = useState(""); // Countdown state
  const [data, setData] = useState(generateInitialData());
  const [time, setTime] = useState(0); // Initialize time for sine wave progression

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        const newDataPoint = {
          Frequency: data[data.length - 1].Frequency + 2,
          Amplitude: generateEEGAmplitude(prevTime),
        };
// Keep the last 60 points for the sliding window
        const updatedData = [...data, newDataPoint].slice(-60);
        setData(updatedData);

        return prevTime + 1;
      });
    }, 333); // Update every 333ms for smooth progression

    return () => clearInterval(interval);
  }, [data]);
  useEffect(() => {
    console.log(router.query[0]);
    console.log(router.query[1]);

    
    if (!router.isReady) return; // Wait for router query to be ready
    const timeInMinutes = parseInt(router.query[0] || "1"); // Default to 1 minute if no query
    const totalSeconds = timeInMinutes * 60; // Convert minutes to seconds

    // Countdown function
    let remainingTime = totalSeconds;
    const countdownInterval = setInterval(() => {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;

      // Update countdown state
      setCount(`${minutes}:${seconds < 10 ? "0" + seconds : seconds}`);
      remainingTime--;

      if (remainingTime < 0) {
        clearInterval(countdownInterval); // Stop countdown when time is up
        setCount("Time's Up!");
      }
    }, 1000); // Update every second

    return () => clearInterval(countdownInterval); // Cleanup on component unmount
  }, [router.isReady]);

  return (
    <div>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        {/* Chart Section */}
        <div style={{ backgroundColor: "#fff ", padding: "20px" }}>
        <LineChart
  width={830}
  height={250}
  data={data}
  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
>
  <CartesianGrid stroke="#fff" strokeDasharray="0" />
  
  {/* X-Axis */}
  <XAxis 
    dataKey="Frequency" 
    tick={false} 
    label={{ value: "Time ", position: "insideBottom", offset: 0 }} 
  />

  {/* Y-Axis */}
  <YAxis 
    tick={false} 
    label={{ value: "Focus", angle: -90, position: "insideLeft", offset: -10 }} 
  />
  
  <Tooltip contentStyle={{ backgroundColor: "#fff", border: "1px solid #0A014F" }} />
  <Legend />
  <Line
    type="linear"
    dataKey="Amplitude"
    stroke="#4682b4"
    strokeWidth={3}
    dot={false}
  />
</LineChart>

    </div>
        <h1>{router.query[1]}</h1>
        {/* Timer Section */}
        <h2>{count}</h2>

        {/* Buttons Section */}
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-secondary mx-2"
            data-bs-toggle="modal"
            data-bs-target="#modalId"
          >
            End session
          </button>
          {/* Trigger Modal */}
        </div>

        {/* PieModal Component */}
        <PieModal />
      </div>
    </div>
  );
}





