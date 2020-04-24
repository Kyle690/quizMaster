import React from "react";
import CustomTable from "../../../../components/Table/Table";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import Success from "../../../../components/Typography/Success";
import Danger from "../../../../components/Typography/Danger";
import Card from "../../../../components/Card/Card";
import CardHeader from "../../../../components/Card/CardHeader";
import CardBody from "../../../../components/Card/CardBody";
class Answers extends React.Component{

    renderUsers=()=>{
        const answers = this.props.answers;
        const sections = this.props.sections;
        if(answers && sections){
            const answerKeys =Object.keys(answers);
            const sectionsKeys=Object.keys(sections);
            const tableHead = ['Name','Correct Answers','Percentage'];

            const totalQuestions = sectionsKeys.reduce((a,v)=>{

                const questions = sections[v].questions;
                if(questions){
                    a+=Object.keys(questions).length;
                }


               return a;
            },0);

            let totalPercentage=0;

            const tableData = answerKeys.reduce((a,v)=>{

                const name = answers[v].name;
                const counter = answers[v].totalCorrect;
                const percentage = (counter/totalQuestions*100).toFixed(2);
                totalPercentage+=parseFloat(percentage);
                a.push([
                    name,
                    counter+'/'+totalQuestions,
                    percentage+'%'
                ]);


                return a;
            },[]);

            return (
                <GridItem>
                    <h2>Users</h2>
                    <CustomTable
                        tableHeaderColor={'info'}
                        tableHead={tableHead}
                        tableData={tableData}
                    />
                    <p>Total overall percentage: {(totalPercentage/answerKeys.length).toFixed(2)}%</p>
                </GridItem>

            )
        }
        else{
            return (
                <GridItem>
                    <h5>No Answers yet, to see if new answers have been submitted, close the quiz and reopen it.</h5>
                </GridItem>
            )
        }
    };

    renderQuestions=()=>{
        const answers = this.props.answers;
        const sections = this.props.sections;
        if(answers && sections){
            const sectionKeys=Object.keys(sections);
            const answerKeys = Object.keys(answers);
            const tableHead=['Name','Answer','Correct']
            return (
                <div>
                    {sectionKeys.map(key=>{
                        const sectionTitle = sections[key].title;
                        const questions = sections[key].questions;
                        if(questions){
                            const questionKeys = Object.keys(questions);
                            const sectionAnswers = answerKeys.reduce((a,v)=>{
                                a[v]={
                                    name:answers[v].name,
                                    answers:answers[v].sections[key]
                                }
                                return a;
                            },{});

                            let sectionTotalCorrect=0;
                            const totalQuestionUsers = questionKeys.length*Object.keys(sectionAnswers).length;

                            return (
                                <Card style={{paddingTop:15,paddingBottom:15}}>
                                    <CardHeader color={'info'}>
                                        <GridItem>
                                            <h5>Section: {sectionTitle}</h5>
                                        </GridItem>
                                    </CardHeader>
                                    <CardBody>
                                        {
                                            questionKeys.map((qKey,i)=>{
                                                const questionTitle = questions[qKey].title;
                                                const questionAnswer = questions[qKey].answer;
                                                let totalCorrect=0;
                                                const tableData = Object.keys(sectionAnswers).reduce((a,v)=>{

                                                    const person = sectionAnswers[v].name;
                                                    const {answer,correct} = sectionAnswers[v].answers[i];
                                                    if(correct){
                                                        totalCorrect++;
                                                    }
                                                    a.push([
                                                        person,
                                                        answer,
                                                        correct?<Success>Correct</Success>:<Danger>Incorrect</Danger>
                                                    ])

                                                    return a;
                                                },[]);

                                                sectionTotalCorrect+=totalCorrect;
                                                return (
                                                    <div>
                                                        <GridItem container justify={'space-between'}>
                                                            <div>
                                                                <h6>{i+1} - {questionTitle}</h6>
                                                                <Success>{questionAnswer}</Success>
                                                            </div>
                                                            <h6>Total Correct: {totalCorrect}</h6>
                                                        </GridItem>
                                                        <CustomTable
                                                            tableHeaderColor={'info'}
                                                            tableHead={tableHead}
                                                            tableData={tableData}
                                                        />
                                                    </div>
                                                )

                                            })
                                        }
                                        <h6>Overall Sections Percentage Correct: {sectionTotalCorrect/totalQuestionUsers*100}%</h6>
                                    </CardBody>
                                </Card>
                            )
                        }


                    })}
                </div>
            )

        }
    };

    render(){
        return(
            <GridContainer>
                {this.renderUsers()}
                <GridItem>
                    <h2>Questions</h2>
                    {this.renderQuestions()}
                </GridItem>
            </GridContainer>
        )
    }
}

export default Answers