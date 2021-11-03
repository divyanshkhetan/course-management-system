import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, dividerClasses } from '@mui/material';
import { useHistory } from 'react-router';

const ActionAreaCardAssignment = ({assignmentID, question, courseID}) => {

  const history = useHistory();

  const redirection = () => {
    history.push(`/assignment/${assignmentID}`);
  }

  return (
    <Card sx={{minWidth: "15rem", maxWidth: "20rem", margin: "1rem" }}>
      <CardActionArea onClick={redirection}>
        <CardMedia
          component="img"
          height="140"
          image="/course.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {courseID} - {assignmentID}
          </Typography>
          <Typography variant="body1" color="text.secondary" style={{maxHeight: '2rem'}}>
            {question}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ActionAreaCardAssignment;