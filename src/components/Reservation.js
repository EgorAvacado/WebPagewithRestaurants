import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDateTimePicker } from "@mui/x-date-pickers/StaticDateTimePicker";
import axios from "axios";
import dayjs from "dayjs";

const EmptyActionBar = () => null;

const StaticDateTimePickerLandscape = ({ restaurantId, onClose }) => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handleDateTimeChange = (date) => {
    setSelectedDateTime(date);
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = async () => {
    const user_id = localStorage.getItem("userId");

    // Проверяем наличие userId
    if (!user_id) {
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
          reserv_datetime: formattedDateTime,
          user_id,
          restaurant_id: restaurantId,
        }
      );

      console.log("Бронь успешно создана:", response.data);
      window.alert("Успех!");
      onClose();
    } catch (error) {
      setNotification({
        open: true,
        message: "Ошибка при создании брони",
        severity: "error",
      });

      console.log("User id:", user_id);
      console.log("rest id:", restaurantId);
      console.log("formattedDateTime:", formattedDateTime);
      console.error("Ошибка при создании брони:", error);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, open: false });
  };

  return (
    <>
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

      <Snackbar
        open={notification.open}
        autoHideDuration={6000}
        onClose={handleCloseNotification}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseNotification}
          severity={notification.severity}
        >
          {notification.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default StaticDateTimePickerLandscape;
