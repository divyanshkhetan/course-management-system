import { useParams } from "react-router"

const CoursePage = () => {
    const {courseid} = useParams();
    return (
        <div>
            {courseid}

        </div>
    )
}

export default CoursePage
