import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const defaultTheme = createTheme();

export default function SignIn() {
  const [alertMessage, setAlertMessage] = React.useState(null);

  const handleSignIn = async () => {
    const telephone = document.getElementById("telephone").value;
    const password = document.getElementById("password").value;

    try {
      // Запрос на получение ID пользователя по телефону
      const idResponse = await axios.get(
        `http://localhost:5001/api/reservation/take/${telephone}`
      );

      console.log("ID Response:", idResponse.data); // Выводим ответ от сервера

      const userId = idResponse.data; // Обращаемся к свойству userId

      // Запрос на вход пользователя
      const response = await axios.get("http://localhost:5001/api/user/login", {
        params: {
          telephone,
          password,
        },
      });

      // При успешном входе сохраняем токен и ID пользователя в localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", userId);

      console.log("Token:", response.data.token);
      console.log("User ID:", userId);

      // Отображаем сообщение об успешном входе
      setAlertMessage({
        type: "success",
        message: "Успешный вход. Добро пожаловать!",
      });
    } catch (error) {
      console.error("Error during login:", error.message);
      setAlertMessage({
        type: "error",
        message:
          "Ошибка входа. Проверьте правильность номера телефона и пароля.",
      });
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container
        style={{
          backgroundColor: "rgba(244, 237, 225, 0.9)",
          width: "30%",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="telephone"
              label="Telephone number"
              name="telephone"
              autoComplete="telephone"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
            />
            <Button
              onClick={handleSignIn}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {alertMessage && (
              <Alert severity={alertMessage.type}>
                <AlertTitle>
                  {alertMessage.type === "success" ? "Success" : "Error"}
                </AlertTitle>
                {alertMessage.message}
              </Alert>
            )}
            <Grid container>
              <Grid item>
                <Link href="#" variant="body2"></Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
