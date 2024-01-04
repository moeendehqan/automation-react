import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./style/style.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./context/UserContext";
import Dashboard from "./page/Dashboard";
import Login from "./page/Login";
import RTL from "./componet/RTL";
import UserManagment from "./componet/UserManagment";

function App() {
  const queryClient = new QueryClient();
  const theme = createTheme({
    direction: "rtl", // تغییر جهت به راست به چپ
  });

  return (
    <UserProvider>
      <RTL>
        <ToastContainer autoClose={3000} />
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />}></Route>
                <Route path="/dashboard" element={<Dashboard />}>
                  <Route path="usermanagment" element={<UserManagment/>}></Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </ThemeProvider>
        </QueryClientProvider>
      </RTL>
    </UserProvider>
  );
}

export default App;
