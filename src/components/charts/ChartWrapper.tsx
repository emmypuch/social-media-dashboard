import { useRef, useEffect } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart } from "chart.js";

interface ChartWrapperProps {
  type: "bar" | "line" | "pie";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: any;
}

const Charts = ({ type, data, options }: ChartWrapperProps) => {
  const barRef = useRef<Chart<"bar"> | null>(null);
  const lineRef = useRef<Chart<"line"> | null>(null);
  const pieRef = useRef<Chart<"pie"> | null>(null);

  useEffect(() => {
    let chartInstance: Chart | null = null;

    switch (type) {
      case "bar":
        chartInstance = barRef.current;
        break;
      case "line":
        chartInstance = lineRef.current;
        break;
      case "pie":
        chartInstance = pieRef.current;
        break;
      default:
        break;
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [type]);

  switch (type) {
    case "bar":
      return <Bar ref={barRef} data={data} options={options} />;
    case "line":
      return <Line ref={lineRef} data={data} options={options} />;
    case "pie":
      return <Pie ref={pieRef} data={data} options={options} />;
    default:
      return null;
  }
};

export default Charts;
