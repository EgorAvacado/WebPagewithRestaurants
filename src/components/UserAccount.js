import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import axios from "axios";
import AddTable from "./Addtable";
import RestaurantAdd from "./RestaurantAdd";

const UserAccount = () => {
  const [open, setOpen] = useState(false);
  const [addTableOpen, setAddTableOpen] = useState(false); // Состояние для новой компоненты
  const [userData, setUserData] = useState({
    username: "",
    telephone: "",
    role: "",
  });

  const userId = localStorage.getItem("userId");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTableOpen = () => {
    setAddTableOpen(true);
  };

  const handleAddTableClose = () => {
    setAddTableOpen(false);
  };

  // Функция для получения данных о пользователе
  const fetchUserData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/review/com/${userId}`
      );
      setUserData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при получении данных о пользователе", error);
      console.log(userId);
    }
  };

  // Используем useEffect для выполнения запроса после монтирования компонента
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Paper
        elevation={3}
        style={{
          padding: 20,
          color: "black", // Цвет текста черный
          width: "30%",
          height: "70%",
          opacity: 0.8,
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item>
            <Avatar alt={userData.username} sx={{ width: 100, height: 100 }} />
          </Grid>
          <Grid item xs>
            <Box textAlign="right">
              <Typography variant="h4" color="textSecondary">
                Приветствую, {userData.username}!
              </Typography>
              <Typography variant="body1" color="textSecondary">
                Телефон: {userData.telephone}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Box mt={2} alignSelf="flex-end">
        <div>
          {userData.role === 1 && (
            <Button variant="outlined" onClick={handleOpen}>
              Добавить ресторан
            </Button>
          )}
          {userData.role === 1 && (
            <Button variant="outlined" onClick={handleAddTableOpen}>
              Добавить стол
            </Button>
          )}
          <RestaurantAdd open={open} handleClose={handleClose} />
          <AddTable open={addTableOpen} handleClose={handleAddTableClose} />
        </div>
      </Box>
    </Box>
  );
};

export default UserAccount;
