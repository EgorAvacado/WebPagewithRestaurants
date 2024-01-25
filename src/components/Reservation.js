import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import axios from "axios";
import dayjs from "dayjs";

const EmptyActionBar = () => null;

const StaticDateTimePickerLandscape = ({ restaurantId, onClose }) => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = async () => {
    const userId = localStorage.getItem("userId");

    // Проверяем наличие userId
    if (!userId) {
      console.error("UserId not found.");
      return;
    }

    // Форматируем дату в виде "YYYY-MM-DDTHH:mm"
    const formattedDateTime =
      dayjs(selectedDateTime).format("YYYY-MM-DDTHH:mm");

    // Отправляем запрос на создание брони
    try {
      const response = await axios.post(
        "http://localhost:5001/api/reservation/add",
        {
          userId,
          restaurantId,
          selectedDateTime: formattedDateTime,
        }
      );

      // Ваш код для обработки успешного ответа
      console.log("Бронь успешно создана:", response.data);
      onClose();
    } catch (error) {
      console.log("User id:", userId);
      console.log("rest id:", restaurantId);
      console.log("formattedDateTime:", formattedDateTime);
      console.error("Ошибка при создании брони:", error);
    }
  };

  return (
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Закажите столик</DialogTitle>
      <DialogContent>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <StaticDateTimePicker
            orientation="landscape"
            onChange={handleDateTimeChange}
            components={{ ActionBar: EmptyActionBar }}
          />
        </LocalizationProvider>
      </DialogContent>
      <Button onClick={handleCancel}>Cancel</Button>
      <Button onClick={handleOk}>Ok</Button>
    </Dialog>
  );
};

export default StaticDateTimePickerLandscape;
