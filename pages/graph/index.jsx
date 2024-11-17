import Head from "next/head";
import { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";
import PieModal from "../../components/pieModal";

// Register Chart.js components
Chart.register(...registerables);

export default function RealTimeSinusoidalWave() {
  const chartRef = useRef(null);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Configuration for the sinusoidal wave
    const amplitude = 1; // Amplitude of the wave
    const frequency = 2; // Frequency in Hz (cycles per second)
    const timeSpan = 10; // Time span in seconds
    const updateInterval = 50; // Interval in ms for updates
    const dataPoints = 100; // Number of points in the wave

    // Initialize the time array and values
    let time = Array.from({ length: dataPoints }, (_, i) => i / (dataPoints / timeSpan));
    let data = time.map(t => amplitude * Math.sin(2 * Math.PI * frequency * t));

    // Create the Chart.js line chart
    const chart = new Chart(ctx, {
      type: "line",
      data: {
        labels: time,
        datasets: [
          {
            label: "Real-Time Brainwave Simulation",
            data: data,
            borderColor: "#36A2EB",
            fill: false,
            tension: 0, // No smoothing for the wave
          },
        ],
      },
      options: {
        responsive: true,
        animation: false, // Disable animation for real-time updates
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
        scales: {
          x: {
            title: {
              display: true,
              text: "Time (s)",
            },
          },
          y: {
            title: {
              display: true,
              text: "Amplitude (mV)",
            },
            min: -amplitude - 0.5, // Extend y-axis range slightly
            max: amplitude + 0.5,
          },
        },
      },
    });

    // Function to update the chart data in real time
    const updateChart = () => {
      const currentTime = time[time.length - 1] + timeSpan / dataPoints; // Increment the time
      time = [...time.slice(1), currentTime]; // Shift time array to simulate scrolling
      data = time.map(t => amplitude * Math.sin(2 * Math.PI * frequency * t)); // Recalculate data

      chart.data.labels = time; // Update time labels
      chart.data.datasets[0].data = data; // Update wave data
      chart.update(); // Update the chart

      // Schedule the next update
      animationFrameRef.current = setTimeout(updateChart, updateInterval);
    };

    // Start updating the chart
    updateChart();
    // const myModal = new bootstrap.Modal(
    //     document.getElementById("modalId"),
    //     options,
    // );
    // Cleanup function to stop updates when the component unmounts
    return () => {
      clearTimeout(animationFrameRef.current);
      chart.destroy();
    };
  }, []);

  return (
    <div>
      <Head>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossOrigin="anonymous"

        />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>


      </Head>
      <div className="d-flex flex-column justify-content-center align-items-center vh-100">
        {/* Chart Section */}
        <div className="w-75 text-center border mb-3 p-5">
          <canvas ref={chartRef} id="lineChart"></canvas>
        </div>

        {/* Timer Section */}
        <h2>00:00</h2>

        {/* Buttons Section */}
        <div className="d-flex justify-content-center mt-3">
          <button className="btn btn-secondary mx-2 " data-bs-toggle="modal" data-bs-target="#modalId">End session</button> 
          {/* Trigger Modal */}
          <button className="btn btn-primary mx-2">START/STOP</button>
        </div>

        {/* PieModal Component */}
        <PieModal />
      </div>
    </div>
  );
}
