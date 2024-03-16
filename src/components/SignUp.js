import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { useState } from "react";

const defaultTheme = createTheme();

export default function SignUp() {
  const [alertMessage, setAlertMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const telephone = document.getElementById("telephone").value;
    const password = document.getElementById("password").value;

    if (!username || !telephone || !password) {
      setAlertMessage({
        type: "error",
        message: "Все поля должны быть заполнены.",
      });
      return;
    }

    if (telephone.length !== 9) {
      setAlertMessage({
        type: "error",
        message: "Телефонный номер должен содержать 9 цифр.",
      });
      return;
    }

    if (password.length < 6) {
      setAlertMessage({
        type: "error",
        message: "Пароль должен содержать не менее 6 символов.",
      });
      return;
    }

    const userData = {
      username,
      telephone,
      password,
    };

    axios
      .post("http://localhost:5001/api/user/registration", userData)
      .then((response) => {
        console.log(response.data);
        setAlertMessage({
          type: "success",
          message: "Регистрация успешна!",
        });
      })
      .catch((error) => {
        console.error(error);
        setAlertMessage({
          type: "error",
          message: "Ошибка при регистрации.",
        });
      });
  };

  return (
    <Container
      style={{
        backgroundColor: "rgba(244, 237, 225, 0.9)",
        width: "30%",
      }}
    >
      <ThemeProvider theme={defaultTheme}>
        <Container component="main" maxWidth="xs">
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
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="UserName"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="telephone"
                    label="Telephone number"
                    name="telephone"
                    autoComplete="telephone"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox value="allowExtraEmails" color="primary" />
                    }
                    label="Я согласен оценить данный проект оценкой 7 или выше"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign Up
              </Button>
              {alertMessage && (
                <Alert severity={alertMessage.type}>
                  <AlertTitle>
                    {alertMessage.type === "success" ? "Success" : "Error"}
                  </AlertTitle>
                  {alertMessage.message}
                </Alert>
              )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/SignIn" variant="body2">
                    Уже есть аккаунт? Sign in!
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </Container>
  );
}
