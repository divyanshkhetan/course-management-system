const QuizViewCardFaculty = ({ques_id, question, opt1, opt2, opt3, opt4, correctOpt}) => {
    const questionCount = ques_id.split('_');
    return (
        <div>
            <div style={{ padding: '0px 2rem 2rem 2rem', margin: '1rem', border: '2px solid #333', borderRadius: '10px' }}>
            <div style={{ margin: '1rem', fontSize: '1.5rem' }}>
                    Question {questionCount[2]}:
                </div>
                <div>
                    Question: {question}
                </div>
            <table>
                <tr>
                    A. {opt1}
                </tr>
                <tr>
                    B. {opt2}
                </tr>
                <tr>
                    C. {opt3}
                </tr>
                <tr>
                    D. {opt4}
                </tr>
                <tr style={{margin: '1rem'}}>
                    Correct Option: {correctOpt}
                </tr>
            </table>
            </div>
        </div>
    )
}

export default QuizViewCardFaculty
