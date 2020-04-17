import React from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Success from "../../components/Typography/Success";
import Danger from "../../components/Typography/Danger";
import CustomTable from "../../components/Table/Table";
import Button from '../../components/CustomButtons/Button';
import {Refresh} from "@material-ui/icons";

const CompleteQuiz=({answers,questions, startOver})=>{

    const renderQuestions=()=>{
        let counter =0;
        let incorrect =0;
        const tableData = Object.keys(questions).reduce((a,v,i)=>{
           const {title, answer}=questions[v];
           const userAnswer = answers[i].answer;
           const correct = answers[i].correct;

           correct ? counter++:incorrect++;
            a.push([
                i+1,
                title,
                answer,
                correct?<Success>{userAnswer}</Success>:<Danger>{userAnswer}</Danger>
            ]);
            return a;
        },[]);

        const tableHead = ['No','Question','Answer','Your Answer'];

        return (
            <div>
                <p>Well done, you achieved {counter}/{Object.keys(questions).length}</p>
                <CustomTable
                    tableHeaderColor={'warning'}
                    tableHead={tableHead}
                    tableData={tableData}
                />
            </div>
        )

    };

    return (
        <GridContainer>
            <GridItem>
                <h4><strong>Congratulations on completing the quiz {answers.name}</strong></h4>
            </GridItem>
            <GridItem>
                {renderQuestions()}
            </GridItem>
            <GridItem>
                <Button onClick={()=>startOver()} color={'info'} size={'sm'} round >
                    <Refresh/>
                    Start Quiz Over
                </Button>
            </GridItem>
        </GridContainer>
    )
};

export default CompleteQuiz;