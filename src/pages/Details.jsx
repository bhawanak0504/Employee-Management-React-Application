import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Paper,
  Box,
  Divider
} from "@mui/material";
import Webcam from "react-webcam";
import { useRef } from "react";

export default function Details() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  if (!state)
    return (
      <Container sx={{ mt: 6 }}>
        <Typography variant="h6" color="error">
          No Data Found
        </Typography>
      </Container>
    );

  const capture = () => {
    const image = webcamRef.current.getScreenshot();
    if (image) {
      navigate("/photo", { state: image });
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4
        }}
      >
        {/* Header */}
        <Typography
          variant="h4"
          fontWeight="bold"
          gutterBottom
        >
          Employee Details
        </Typography>

        <Divider sx={{ mb: 3 }} />

        {/* Employee Info */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6">
            👤 Name: <strong>{state.name}</strong>
          </Typography>

          <Typography variant="h6">
            💰 Salary: ₹{" "}
            {state.salary?.toLocaleString()}
          </Typography>

          <Typography variant="h6">
            📍 City: {state.city}
          </Typography>
        </Box>

        {/* Camera Section */}
        <Typography
          variant="h6"
          gutterBottom
          fontWeight="bold"
        >
          Capture Photo
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 2
          }}
        >
          <Box
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
            }}
          >
            <Webcam
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              style={{
                width: 400,
                height: 300,
                objectFit: "cover"
              }}
            />
          </Box>
        </Box>

        {/* Buttons */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            gap: 2
          }}
        >
          <Button
            variant="contained"
            onClick={capture}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3,
              fontWeight: "bold",
              background:
                "linear-gradient(45deg, #1976d2, #42a5f5)"
            }}
          >
            📸 Capture Photo
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/list")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: 3
            }}
          >
            Back
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}