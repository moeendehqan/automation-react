import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './style/style.css'
import 'react-toastify/dist/ReactToastify.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";

import Login from './layout/Login';
import RTL from './componet/RTL';

function App() {
  const queryClient = new QueryClient();
  const theme = createTheme({
    direction: 'rtl', // تغییر جهت به راست به چپ
  
  });
  
  return (
    <RTL>
      <ToastContainer autoClose={3000}/>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<Login />}></Route>
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </QueryClientProvider>
    </RTL>
  );
}


export default App