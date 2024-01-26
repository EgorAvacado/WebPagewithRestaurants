import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import axios from "axios";

const AddComment = ({ restaurantId, open, onClose, onSubmit }) => {
  const [comment, setComment] = useState("");
  const [errorSnackbar, setErrorSnackbar] = useState({
    open: false,
    message: "",
  });

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    const user_id = localStorage.getItem("userId");
    const com_date = new Date().toISOString(); // текущая дата и время

    try {
      // Отправляем запрос на добавление комментария
      const response = await axios.post(
        "http://localhost:5001/api/review/add",
        {
          restaurant_id: restaurantId,
          user_id,
          com_date,
          comment,
        }
      );
      // Вызываем функцию onSubmit и передаем в нее комментарий
      onSubmit(comment);
      onClose();

      // Ваш код для обработки успешного ответа, если нужно
      console.log("Комментарий успешно добавлен:", response.data);
    } catch (error) {
      // Проверяем статус ошибки
      if (error.response?.status === 400) {
        const errorMessage =
          error.response?.data?.message ||
          "Комментарий должен содержать от 5 до 220 символов";
        setErrorSnackbar({ open: true, message: errorMessage });
      } else {
        // Другие ошибки могут быть обработаны здесь, если нужно
        console.error("Ошибка при добавлении комментария:", error);
      }
    }
  };

  const handleCancel = () => {
    // Просто закрываем диалог
    onClose();
  };

  const handleCloseSnackbar = () => {
    setErrorSnackbar({ open: false, message: "" });
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Добавить комментарий</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="comment"
            label="Комментарий"
            type="text"
            fullWidth
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Отмена
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Отправить
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={errorSnackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseSnackbar}
          severity="error"
        >
          {errorSnackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export default AddComment;
