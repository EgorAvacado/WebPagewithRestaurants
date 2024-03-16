import React, { useState } from "react";
import axios from "axios"; // Импорт axios
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const RestaurantAdd = ({ open, handleClose }) => {
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const sendRestaurantData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5001/api/restaurant/add",
        restaurantData
      );
      console.log(response.data);
    } catch (error) {
      console.error("Ошибка при добавлении ресторана", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData({ ...restaurantData, [name]: value });
  };

  const handleAddRestaurant = () => {
    // Вызов функции для отправки данных на сервер
    sendRestaurantData();

    // Сбросить значения полей после добавления
    setRestaurantData({
      name: "",
      description: "",
      image: "",
    });

    // Закрыть диалоговое окно
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Добавить ресторан</DialogTitle>
      <DialogContent>
        <DialogContentText>Введите данные о ресторане:</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Название"
          type="text"
          fullWidth
          name="name"
          value={restaurantData.name}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Описание"
          type="text"
          fullWidth
          name="description"
          value={restaurantData.description}
          onChange={handleInputChange}
        />
        <TextField
          margin="dense"
          label="Ссылка на картинку"
          type="text"
          fullWidth
          name="image"
          value={restaurantData.image}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleAddRestaurant} color="primary">
          Добавить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RestaurantAdd;
