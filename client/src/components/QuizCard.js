import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useHistory } from 'react-router';

const QuizCard = ({quizid, quizname}) => {

    const history = useHistory();

    const redirection = () => {
      history.push(`/quiz/${quizid}`);
    }

    return (
        <div>
            <Card sx={{minWidth: "15rem", maxWidth: "20rem", margin: "0.5rem" }}>
                <CardActionArea onClick={redirection}>
                    <CardMedia
                        component="img"
                        height="140"
                        image="/course.jpg"
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {quizid}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {quizname}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </div>
    )
}

export default QuizCard;