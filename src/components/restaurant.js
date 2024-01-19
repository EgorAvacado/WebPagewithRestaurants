import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

export default function MultiActionAreaCard() {
  return (
    <Card sx={{ maxWidth: 466 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="320"
          image="/cafe.png"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Cafe
          </Typography>
          <Typography variant="h5" color="black">
            This amazing place with amazing food! So, see you soon!!
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Комментарии
        </Button>
      </CardActions>
    </Card>
  );
}
