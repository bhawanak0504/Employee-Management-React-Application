import { useLocation } from "react-router-dom";
import { Container, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function ChartPage() {
  const { state } = useLocation();
  const data = state || [];
  const firstTen = data.slice(0, 10);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5">Salary Chart (Top 10)</Typography>
      <BarChart width={600} height={400} data={firstTen}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="salary" />
      </BarChart>
    </Container>
  );
}