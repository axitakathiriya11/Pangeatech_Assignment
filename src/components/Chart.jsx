import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Box } from "@chakra-ui/react";
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

const color = [
  "#00626f",
  "#391285",
  "#6f7755",
  "#11574a",
  "#3e6257",
  "#f1c40f",
  "#e67e22",
  "#e74c3c",
  "#8e44ad",
  "#2c3e50",
  "#d1001c",
  "#f39c12",
  "#d35400",
  "#c0392b",
  "#bdc3c7",
  "#7f8c8d",
  "#d5b60a",
  "#980036",
  "#95a5a6",
];

export default function Chart() {
  const totalSum = useSelector(
    (state) => state.chart.totalSum
  );
  const [data, setData] = useState([]);

  const setChartData = (totalSum, setData) => {
    const products = [];
    console.log(totalSum);
    Object.keys(totalSum).forEach((key) => {
      const data = { month: key, ...totalSum[key] };
      products.push(data);
    });
    sortByMonth(products);
    setData([...products]);
  };

  const sortByMonth = (arr) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    arr.sort((a, b) => months.indexOf(a.month) - months.indexOf(b.month));
  };

  useEffect(() => {
    setChartData(totalSum, setData);
  }, [totalSum]);

  return (
    <Box
      w="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDir="row"
      padding={{ base: 4, md: 8, lg: 8, xl: 8 }}
      paddingX={{ base: 4, md: 8, lg: 8, xl: 8 }}
    >
      <ResponsiveContainer width="80%" height={350}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="8" stroke="#DFE2E6" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          {data.length > 0 &&
            Object.keys(data[0]).map(
              (key, index) =>
                key !== "month" && (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={key}
                    stroke={color[index]}
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                  />
                )
            )}
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
