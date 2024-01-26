import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const AddComment = ({ open, onClose, onSubmit }) => {
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = () => {
    // Вызываем функцию onSubmit и передаем в нее комментарий
    onSubmit(comment);
    // Закрываем диалог
    onClose();
  };

  const handleCancel = () => {
    // Просто закрываем диалог
    onClose();
  };

  return (
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
  );
};

export default AddComment;
