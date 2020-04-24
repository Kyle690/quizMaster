import React from "react";
import {connect}from 'react-redux';
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import Button from "../../../components/CustomButtons/Button";
import history from "../../../history";
import {Close, PlayArrow, ChevronLeft,ChevronRight, Refresh} from "@material-ui/icons";
import CardBody from "../../../components/Card/CardBody";
import GridContainer from "../../../components/Grid/GridContainer";
import ViewSection from "./QuizComponents/ViewSection";

class ViewQuiz extends React.Component{

    state={
      sectionNo:0,
      start:false,
      finish:false,
      sections:null
    };

    componentDidMount() {
        this.setState({sections:this.props.sections})
    }

    renderSections=()=>{
        const sections = this.state.sections;
        if(sections){
            const {sectionNo,start, finish}=this.state;
            const sectionsKeys= Object.keys(sections)
            if(!start){
                return (
                    <GridContainer justify={'center'}>
                        <Button onClick={()=>this.setState({start:true})} round color={'info'}>
                            <PlayArrow/>
                            Start
                        </Button>
                    </GridContainer>
                )
            }
        else if(finish){
                return (
                    <GridContainer justify={'center'}>
                        <Button onClick={()=>this.setState({start:false, finish: false,sectionNo: 0})} round color={'info'}>
                            <Refresh/>
                            Start Over
                        </Button>
                    </GridContainer>
                )
            }
            else {

                const section = sections[sectionsKeys[sectionNo]]
               // console.log(section.questions);
                if(section){
                    return (
                        <div>
                            <h6>Section: {section.title}</h6>
                            <ViewSection
                                questions={section.questions}
                                handleMove={this.handleMoveSection}
                            />
                        </div>

                    )
                }



            }
        }else{
            return (
                <div>
                    <h3>No Sections yet!</h3>
                </div>
            )
        }
    };

    handleMoveSection=(mode)=>{
        const {sectionNo}=this.state;
        const sections = this.state.sections;
        const sectionKeys=Object.keys(sections);

        if(mode==='next'){
            if(sectionNo+1>=sectionKeys.length){
                // end of quiz
                this.setState({finish:true})
            }else{
                this.setState({sectionNo:sectionNo+1})
            }
        }else{
            if(sectionNo-1<0){
                this.setState({sectionNo:0})
            }else{
                this.setState({sectionNo: sectionNo-1})
            }
        }
    }


    render(){
        const {title}=this.props;
        return (
            <GridContainer  justify={'center'} className={'mainDiv'} >
                <GridItem xs={12} sm={12} md={8} style={{marginTop:'10%'}}>
                    <Card>
                        <CardHeader color={'warning'}>
                            <GridItem container justify={'space-between'} alignItems={'center'}>
                                <h3>{title}</h3>
                                <Button simple color={'white'} onClick={()=>history.push('/admin/home/user')}>
                                    <Close/>
                                    Close Quiz
                                </Button>
                            </GridItem>
                        </CardHeader>
                        <CardBody>
                            {this.renderSections()}
                        </CardBody>
                    </Card>
                </GridItem>
            </GridContainer>
        )
    }
}
const mapStateToProps =state=>{

    const uid = state.auth.uid;
    const quiz =state.quiz.viewQuiz;
    const details= quiz?quiz.details:null;
    const title=quiz?quiz.details.title:'';
    const id = quiz?quiz.id:null;
    const sections = quiz?quiz.sections?quiz.sections:null:null;

    return{
        title,
        details,
        uid,
        id,
        sections
    }
};

export default connect(mapStateToProps)(ViewQuiz);