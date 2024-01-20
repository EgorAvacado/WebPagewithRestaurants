import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Box,
} from "@mui/material";

function RestaurantDetailsPage() {
  const { restaurantId } = useParams();
  const [restaurantDetails, setRestaurantDetails] = useState(null);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/api/restaurant/${restaurantId}`
        );
        const data = response.data;
        setRestaurantDetails(data);
      } catch (error) {
        console.error(
          `Ошибка при получении данных о ресторане ${restaurantId}:`,
          error
        );
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  if (!restaurantDetails) {
    return <div>Loading...</div>;
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6} order={{ xs: 1, md: 1 }}>
        <img
          src={restaurantDetails.image || "/default-image.jpg"}
          alt={restaurantDetails.name}
          style={{ width: "90%", height: "auto", maxHeight: "600px" }}
        />
      </Grid>
      <Grid item xs={12} md={6} order={{ xs: 2, md: 2 }}>
        <Card sx={{ backgroundColor: "rgba(255, 253, 208, 0.8)" }}>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              {restaurantDetails.name}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              style={{ lineHeight: "2" }}
            >
              {restaurantDetails.description}
            </Typography>
          </CardContent>
        </Card>
        <Box mt={2}>
          <Button variant="contained" color="primary" sx={{ marginRight: 1 }}>
            Кнопка 1
          </Button>
          <Button variant="contained" color="secondary">
            Кнопка 2
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default RestaurantDetailsPage;
