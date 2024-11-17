import React, { useEffect, useRef } from "react";
import { Chart, registerables } from "chart.js";

// Register Chart.js components
Chart.register(...registerables);

export default function PieModal() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Destroy any existing chart instance in case the modal reopens
    if (Chart.getChart("pieChart")) {
      Chart.getChart("pieChart").destroy();
    }

    // Create a pie chart
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Focus", "Mild Focus", "Not Focus"],
        datasets: [
          {
            label: "Sample Data",
            data: [30, 50, 20],
            backgroundColor: ["#E0194F", "#0A014F", "#E7E6F7"],
            hoverBackgroundColor: ["#E0194F", "#0A014F", "#E7E6F7"],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: true,
            position: "top",
          },
        },
      },
    });
  }, []);

  return (
    <>
      <div
        className="modal  fade"
        id="modalId"
        tabIndex="-1"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        role="dialog"
        aria-labelledby="modalTitleId"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
          role="document"
        >
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="modalTitleId">
                Pie Chart
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Canvas for the Chart */}
              <canvas ref={chartRef} id="pieChart"></canvas>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
