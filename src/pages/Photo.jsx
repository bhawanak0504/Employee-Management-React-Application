import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Paper,
  Box,
  Button
} from "@mui/material";

export default function Photo() {
  const { state } = useLocation();
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ mt: 6 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          textAlign: "center"
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          fontWeight="bold"
        >
          📸 Captured Photo
        </Typography>

        {state ? (
          <Box
            sx={{
              mt: 3,
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img
              src={state}
              alt="Captured"
              style={{
                maxWidth: "100%",
                maxHeight: "450px",
                borderRadius: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
              }}
            />
          </Box>
        ) : (
          <Typography color="error" sx={{ mt: 2 }}>
            No image captured.
          </Typography>
        )}

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
            onClick={() => navigate(-1)}
            sx={{
              borderRadius: 3,
              px: 4
            }}
          >
            Retake
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/list")}
            sx={{
              borderRadius: 3,
              px: 4
            }}
          >
            Back to List
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}