import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Button,
  TextField,
  Box,
  CircularProgress
} from "@mui/material";

export default function List() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .post("https://backend.jotish.in/backend_dev/gettabledata.php", {
        username: "test",
        password: "123456"
      })
      .then((res) => {
        if (res.data?.TABLE_DATA?.data) {
          const formatted = res.data.TABLE_DATA.data.map((emp) => {
            const cleanSalary = emp[5]
              ?.replace("$", "")
              ?.replace(/,/g, "");

            return {
              name: emp[0],
              position: emp[1],
              city: emp[2],
              salary: Number(cleanSalary) || 0
            };
          });

          setData(formatted);
        }
      })
      .catch((err) => {
        console.error("API Error:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredData = data.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Employee List
      </Typography>

      {/* Top Controls */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          mb: 3
        }}
      >
        <TextField
          label="Search by Name"
          size="small"
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button
          variant="contained"
          sx={{
            px: 3,
            borderRadius: 3,
            background: "linear-gradient(45deg, #1976d2, #42a5f5)"
          }}
          onClick={() => navigate("/chart", { state: data })}
        >
          View Salary Chart
        </Button>
      </Box>

      {/* Loading */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={6} sx={{ borderRadius: 4 }}>
          <Table>
            <TableHead sx={{ backgroundColor: "#1976d2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Name
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  Salary
                </TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                  City
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredData.map((emp, index) => (
                <TableRow
                  key={index}
                  hover
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "#f5f5f5" }
                  }}
                  onClick={() =>
                    navigate("/details", { state: emp })
                  }
                >
                  <TableCell>{emp.name}</TableCell>
                  <TableCell>
                    ₹ {emp.salary.toLocaleString()}
                  </TableCell>
                  <TableCell>{emp.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      <Button
        variant="outlined"
        sx={{ mt: 3 }}
        onClick={() => {
          localStorage.removeItem("auth");
          navigate("/");
        }}
      >
        Logout
      </Button>
    </Container>
  );
}