import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Drawer from "../componet/Drawer";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Copyright from "../componet/Copyright";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "../componet/ListItems";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import AppBar from "../componet/AppBar";
import { useUser } from "../context/UserContext";
import * as hook from "../hook/index";
import { useNavigate, Outlet } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";

const Dashboard = () => {
  const navigate = useNavigate();
  const { userId, setUserData } = useUser();
  const [open, setOpen] = React.useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };
  const getUser = hook.useGetUser(userId);
  console.log(getUser.data, getUser.isSuccess);

  const HandleGetUser = () => {
    getUser.mutateAsync();
  };

  const handleUserIdIsNull = () => {
    if (!userId) {
      navigate("/");
    }
  };

  React.useEffect(handleUserIdIsNull, [userId]);
  React.useEffect(HandleGetUser, [userId]);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            میزکار
          </Typography>
          <Stack direction="row" spacing={2}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Avatar sx={{ bgcolor: deepOrange[500], width: 34, height: 34 }}>
              {getUser.isLoading ? (
                <Skeleton variant="circular" width={40} height={40} />
              ) : getUser.isSuccess ? (
                getUser.data.FirstName.charAt(0) +
                " " +
                getUser.data.LastName.charAt(0)
              ) : (
                <Skeleton variant="circular" width={40} height={40} />
              )}
            </Avatar>
          </Stack>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          {mainListItems}
          <Divider sx={{ my: 1 }} />
          {secondaryListItems}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}></Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
      <Outlet />
    </Box>
  );
};

export default Dashboard;
