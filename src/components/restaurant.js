import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import axios from "axios";

export default function MultiActionAreaCard() {
  const [restaurantData, setRestaurantData] = React.useState([]);

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

  return (
    <>
      {restaurantData.map((restaurant, index) => (
        <Card key={index} sx={{ maxWidth: 466 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="320"
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
            <Button size="small" color="primary">
              Комментарии
            </Button>
          </CardActions>
        </Card>
      ))}
    </>
  );
}
