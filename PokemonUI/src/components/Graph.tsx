import React, { useEffect, useState } from "react";
import { IGraphData } from "../models/graph/IGraphData";
import { Card, CardBody } from "reactstrap";
import Chart from "chart.js";
import AlertMessage from "../common/components/AlertMessage";

const Graph = (props: { type: string; chartData: IGraphData; id: string }) => {
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    loadGraph();
  }, [props.chartData]);

  const loadGraph = () => {
    var canvas = document.getElementById(props.id) as HTMLCanvasElement;
    var ctx = canvas.getContext("2d");
    ctx.canvas.height = 350;
    Chart.defaults.global.elements.line.fill = false;
    try {
      new Chart(ctx, {
        type: props.type.toLowerCase(),
        data: {
          labels: props.chartData.labels,
          datasets: props.chartData.dataSets,
        },
        options: {
          scales: {
            yAxes: [
              {
                ticks: {
                  min: 0,
                  beginAtZero: true,
                },
                scaleLabel: {
                  display: true,
                  labelString: props.chartData.yAxisLabel !== undefined ? props.chartData.yAxisLabel : "",
                },
              },
            ],
            xAxes: [
              {
                gridLines: {
                  display: false,
                },
                scaleLabel: {
                  display: true,
                  labelString: props.chartData.xAxisLabel !== undefined ? props.chartData.xAxisLabel : "",
                },
              },
            ],
          },
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    } catch (error) {
      assignError(error.message);
    }
  };

  const assignError = (error) => {
    let errMsg = "Error loading graph, please refresh the page";
    if (error.includes("Maximum call stack")) {
      errMsg = "Error loading graph, please review the filter conditions";
    }
    setErrorMessage(errMsg);
  };

  return (
    <div>
      {errorMessage !== "" ? (
        <div>
          <p></p>
          <AlertMessage color="danger" message={errorMessage}></AlertMessage>
        </div>
      ) : (
        <Card>
          <CardBody>
            <canvas id={props.id}></canvas>
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Graph;
