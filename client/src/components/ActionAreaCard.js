import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, dividerClasses } from '@mui/material';

const ActionAreaCard = ({courseID, courseName}) => {
  return (
    <Card sx={{minWidth: "15rem", maxWidth: "20rem", margin: "1rem" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/course.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {courseID}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {courseName}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCard;