import { useEffect, useState } from "react";
import Copyright from "../componet/Copyright";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { MuiOtpInput } from "mui-one-time-password-input";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import LinearProgress from "@mui/material/LinearProgress";
import { OnRun } from "../config/OnRun";
import { useUser } from "../context/UserContext";
import * as hook from "../hook/index";
import LogoMotion from "../componet/LogoMotion";
import { useNavigate } from "react-router-dom";
import { getCookie, setCookie } from "../componet/Cookie";

const Login = () => {
  const [step, setMode] = useState("captcha");
  const [remember, setRemember] = useState(false);
  const [mobile, setMobile] = useState("");
  const { userId, setUserData } = useUser();
  const navigate = useNavigate();
  const idu = getCookie("idu");
  
  var {
    data: captcha_data,
    isLoading: captcha_isloading,
    refetch: captchaRefetch,
  } = hook.useGetCaptcha();
  const [captcha, setCaptcha] = useState("");
  const [otp, setOtp] = useState("");
  var sendOtp = hook.useSendOtp(
    mobile,
    captcha,
    captcha_isloading ? null : captcha_data.encrypted_response,
    setMode
  );
  var login = hook.useLogin(otp, mobile, remember);
  var checkIdu = hook.useCheckIdu(idu);
  var checkUserId = hook.useCheckIdu(userId);
  
  const submit = async () => {
    if (step == "captcha") {
      sendOtp.mutate();
    } else {
      login
        .mutateAsync()
        .then((response) => {
          if (remember) {
            setCookie("idu", response, 5);
          }
          setUserData(response);
          navigate("/dashboard");
        })
        .catch();
    }
  };

  const checkLogin = () => {

    if (userId) {
      checkUserId.mutateAsync().then((response) => {
        if (response) {
          setUserData(idu);
          navigate("/dashboard");
        } else {
          setCookie("idu", "", 0);
        }
      });
    } else if (idu) {
      checkIdu.mutateAsync().then((response) => {
        if (response) {
          setUserData(idu);
          navigate("/dashboard");
        } else {
          setCookie("idu", "", 0);
        }
      });
    }
  };

  useEffect(checkLogin, [userId]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />

      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(" + OnRun + "/wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <LogoMotion />

          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ورود
          </Typography>
          <Box component="form" noValidate onSubmit={submit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="شماره همراه"
              name="شماره همراه"
              autoFocus
              onChange={(e) => setMobile(e.target.value)}
              value={mobile}
              disabled={step == "otp"}
            />
            {step == "captcha" ? (
              <>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="کپچا"
                  label="کپچا"
                  type="کپچا"
                  id="کپچا"
                  onChange={(e) => setCaptcha(e.target.value)}
                  value={captcha}
                />
                {captcha_isloading ? (
                  <LinearProgress variant="query" />
                ) : (
                  <div className="captchaImg">
                    <img
                      onClick={captchaRefetch}
                      src={`data:image/png;base64,${captcha_data.image}`}
                    ></img>
                  </div>
                )}
              </>
            ) : (
              <>
                <MuiOtpInput
                  sx={{ direction: "rtl" }}
                  value={otp}
                  onChange={setOtp}
                  length={5}
                />
              </>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={submit}
            >
              {step == "captcha" ? "ورود" : "تایید"}
            </Button>
            {step == "otp" ? (
              <Button
                onClick={() => {
                  setMode("captcha");
                  setOtp("");
                }}
                variant="outlined"
                fullWidth
                sx={{ mt: 1, mb: 1 }}
              >
                ویرایش شماره
              </Button>
            ) : (
              <FormControlLabel
                control={
                  <Checkbox
                    value={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    color="primary"
                  />
                }
                label="مرا به خاط بسپار"
              />
            )}
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;
