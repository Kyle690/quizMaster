import React from "react";
import CustomTable from "../../../../components/Table/Table";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import Success from "../../../../components/Typography/Success";
import Danger from "../../../../components/Typography/Danger";
class Answers extends React.Component{

    renderUsers=()=>{
        const answers = this.props.answers;
        const questions = this.props.questions;
        if(answers){
            const answerKeys =Object.keys(answers);
            const questionKeys=Object.keys(questions);
            let totalPercentage =0;
            const tableData = answerKeys.reduce((a,v)=>{

                const name = answers[v].name;
                let counter = 0;
                Object.keys(answers[v]).map(index=>{
                    if(index!=='name'){
                        if(answers[v][index].correct){
                            counter ++
                        }
                    }
                });
                const percentage = (counter/questionKeys.length*100).toFixed(2);
                totalPercentage += parseInt(percentage);
                a.push([
                    name,
                    counter+'/'+questionKeys.length,
                    percentage+'%'
                ]);


                return a;
            },[]);
            const tableHead = ['Name','Correct Answers','Percentage'];
            console.log(totalPercentage);
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
                <div>
                    <h5>No Answers yet, to see if new answers have been submitted, close the quiz and reopen it.</h5>
                </div>
            )
        }
    };

    renderQuestions=()=>{
        const answers = this.props.answers;
        const questions = this.props.questions;
        if(answers){
            const answerKeys =Object.keys(answers);
            const questionKeys=Object.keys(questions);

            return (
                <GridContainer>
                    {questionKeys.map((qKey,i)=>{
                        const {title,answer}=questions[qKey];
                        let totalCorrect=0;
                        const tableData=answerKeys.reduce((a,v)=>{
                            const name =answers[v].name;
                            const {answer, correct} = answers[v][i];
                            if(correct){
                                totalCorrect+=1;
                            }
                            a.push([
                                name,
                                answer,
                                correct?<Success>Correct</Success>:<Danger>Incorrect</Danger>
                            ]);
                            return a;
                        },[]);

                        const percentageCorrect = (totalCorrect/answerKeys.length)*100;


                        return (
                            <GridItem xs={12} key={i} style={{paddingTop:'5%'}}>
                                <div style={{display:'flex', justifyContent:'space-between'}}>
                                    <div>
                                        <h4>Question {i+1} - {title}</h4>
                                        <Success>{answer}</Success>
                                    </div>
                                    <h5>No. Correct: {percentageCorrect.toFixed(2)}%</h5>
                                </div>
                                <CustomTable
                                    tableData={tableData}
                                />
                            </GridItem>
                        )

                    })}
                </GridContainer>
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