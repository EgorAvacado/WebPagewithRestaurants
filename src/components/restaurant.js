import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import AddComment from "./AddComment";
import CommentsDialog from "./CommentsDialog";
import StaticDateTimePickerLandscape from "./Reservation"; // Предположим, что это ваш компонент для заказа столика
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import axios from "axios";

export default function MultiActionAreaCard() {
  const [restaurantData, setRestaurantData] = React.useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [showReservationPicker, setShowReservationPicker] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showAddComment, setShowAddComment] = useState(false); // Новое состояние для отображения формы добавления комментария

  React.useEffect(() => {
    fetchRestaurantData();
  }, []);

  const fetchRestaurantData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/restaurant/getAll"
      );
      const data = response.data;
      setRestaurantData(data);
    } catch (error) {
      console.error("Ошибка при получении данных о ресторанах:", error);
    }
  };

  const handleCommentsOpen = (restaurantId) => {
    setSelectedRestaurant(restaurantId);
    setShowComments(true);
  };

  const handleCommentsClose = () => {
    setSelectedRestaurant(null);
    setShowComments(false);
  };

  const handleReservationClick = (restaurantId) => {
    setSelectedRestaurant(restaurantId);
    setShowReservationPicker(true);
    setShowComments(false);
  };

  const handleReservationClose = () => {
    setShowReservationPicker(false);
    setSelectedRestaurant(null);
  };

  const handleAddCommentClick = (restaurantId) => {
    setSelectedRestaurant(restaurantId);
    setShowAddComment(true);
  };

  const handleAddCommentClose = () => {
    setShowAddComment(false);
  };

  const handleAddCommentSubmit = (comment) => {
    // Здесь вы можете отправить комментарий на сервер или выполнить другие действия
    console.log(
      `Добавлен комментарий для ресторана ${selectedRestaurant}: ${comment}`
    );
    // Закрываем форму добавления комментария
    handleAddCommentClose();
  };

  return (
    <>
      {restaurantData.map((restaurant, index) => (
        <Card key={index} sx={{ maxWidth: 466 }}>
          <CardActionArea onClick={() => handleReservationClick(restaurant.id)}>
            <CardMedia
              component="img"
              height="420"
              image={restaurant.image || "/cafe.png"}
              alt={restaurant.name || "green iguana"}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {restaurant.name || "Cafe"}
              </Typography>
              <Typography variant="h5" color="black">
                {restaurant.description ||
                  "This amazing place with amazing food! So, see you soon!!"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => handleCommentsOpen(restaurant.id)}
            >
              Комментарии
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => handleAddCommentClick(restaurant.id)}
            >
              Добавить комментарий
            </Button>
          </CardActions>
        </Card>
      ))}
      <CommentsDialog
        restaurantId={selectedRestaurant}
        onClose={handleCommentsClose}
        open={Boolean(selectedRestaurant && showComments)}
      />
      {showReservationPicker && (
        <StaticDateTimePickerLandscape
          restaurantId={selectedRestaurant}
          onClose={handleReservationClose}
        />
      )}
      {showAddComment && (
        <AddComment
          restaurantId={selectedRestaurant}
          open={showAddComment}
          onClose={handleAddCommentClose}
          onSubmit={handleAddCommentSubmit}
        />
      )}
    </>
  );
}
