import React from "react";
import GridContainer from "../../components/Grid/GridContainer";
import GridItem from "../../components/Grid/GridItem";
import Success from "../../components/Typography/Success";
import Danger from "../../components/Typography/Danger";
import CustomTable from "../../components/Table/Table";
import Button from '../../components/CustomButtons/Button';
import {Refresh} from "@material-ui/icons";
import Card from "../../components/Card/Card";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";

const CompleteQuiz=({answers,sections, startOver})=>{

    const renderSections=()=>{

        const sectionKeys = Object.keys(sections);
        const tableHead = ['No','Your Answer', "Correct"];
        let correctTotal=0;
        let questionCount=0;
        return (
            <div>
                {
                    sectionKeys.map(key=>{

                        const questions = sections[key].questions;
                        const title = sections[key].title;
                        let counter =0;
                        if(questions){
                            const sectionAnswers = answers.sections[key];
                            const tableData = Object.keys(questions).reduce((a,v,i)=>{
                                questionCount++;
                                const userAnswer = sectionAnswers[i].answer;
                                const correct = sectionAnswers[i].correct;
                                if(correct){
                                    counter ++;
                                }
                                a.push([
                                    i+1,
                                    userAnswer,
                                    correct?<Success>Correct</Success>:<Danger>Incorrect</Danger>
                                ])

                                return a;
                            },[]);
                            correctTotal+=counter;

                            return (
                                <Card style={{paddingTop:15,paddingBottom:15}}>
                                    <CardHeader color={'warning'}>
                                        <GridItem container justify={'space-between'} alignItems={'center'}>
                                            <h6>Section: {title}</h6>
                                            <p>Well done, you achieved {counter}/{Object.keys(questions).length} for this section.</p>
                                        </GridItem>
                                    </CardHeader>
                                    <CardBody>
                                        <CustomTable
                                            tableHeaderColor={'warning'}
                                            tableHead={tableHead}
                                            tableData={tableData}
                                        />
                                    </CardBody>
                                </Card>
                            )
                        }


                    })
                }
                <h4>Congratulations you achieved a grand total of {correctTotal}/{questionCount}</h4>
            </div>
        )


    };

    return (
        <GridContainer>
            <GridItem>
                <h4><strong>Congratulations on completing the quiz {answers.name}</strong></h4>
            </GridItem>
            <GridItem>
                {renderSections()}
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