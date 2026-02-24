import { Outlet, useNavigate } from "react-router-dom";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  AppBar,
  Toolbar,
  Typography,
  Box
} from "@mui/material";

export default function Layout() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6">
            Employee Dashboard
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" sx={{ width: 220 }}>
        <Toolbar />
        <List>
          <ListItemButton onClick={() => navigate("/list")}>
            <ListItemText primary="Employee List" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate("/chart")}>
            <ListItemText primary="Salary Chart" />
          </ListItemButton>
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 4, mt: 8 }}>
        <Outlet />
      </Box>
    </Box>
  );
}