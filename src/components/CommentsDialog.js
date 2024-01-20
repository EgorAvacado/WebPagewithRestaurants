import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import axios from "axios";

export default function CommentsDialog({ restaurantId, onClose, open }) {
  const [commentsWithUsernames, setCommentsWithUsernames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (open) {
        await fetchComments();
      }
    };

    fetchData();
  }, [open, fetchComments]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/review/${restaurantId}`
      );
      const data = response.data;

      const commentsWithUsernames = await Promise.all(
        data.map(async (comment) => {
          const userResponse = await axios.get(
            `http://localhost:5001/api/review/com/${comment.user_id}`
          );
          const userData = userResponse.data;
          return {
            ...comment,
            username: userData.username,
          };
        })
      );

      setCommentsWithUsernames(commentsWithUsernames);
    } catch (error) {
      console.log(error);
      console.error("Ошибка при получении комментариев:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = new Date(dateString).toLocaleString(
      undefined,
      options
    );
    return formattedDate;
  };

  return (
    <Dialog onClose={onClose} open={open} fullWidth maxWidth="md">
      <DialogTitle>Комментарии</DialogTitle>
      <DialogContent>
        <List>
          {commentsWithUsernames.map((comment, index) => (
            <React.Fragment key={index}>
              <ListItem>
                <ListItemText
                  primary={comment.username}
                  secondary={`${formatDate(comment.com_date)} - ${
                    comment.comment
                  }`}
                />
              </ListItem>
              <Divider />
            </React.Fragment>
          ))}
        </List>
      </DialogContent>
    </Dialog>
  );
}
