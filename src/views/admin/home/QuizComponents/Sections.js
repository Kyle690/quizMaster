import React from 'react';
import {connect}from 'react-redux';
import Card from "../../../../components/Card/Card";
import CardHeader from "../../../../components/Card/CardHeader";
import CardBody from "../../../../components/Card/CardBody";
import Button from '../../../../components/CustomButtons/Button';
import GridItem from "../../../../components/Grid/GridItem";
import {Add, Edit, Close}from '@material-ui/icons'
import SectionModal from "../../../../components/Modals/SectionModal";
import {Tooltip} from "@material-ui/core";
import Questions from "./Questions";
import ConfirmModal from "../../../../components/Modals/ConfrimModal";
class Sections extends React.Component{

    state={
        sectionModal:false,
        sectionId:null,
        sectionTitle:null,
        sections:null,
        confirmModal:false
    }
    componentDidMount() {
        this.setState({sections:this.props.sections})
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevState.sections !== this.props.sections){
            this.setState({sections:this.props.sections});
        }
    }

    renderSections=()=>{
       const sections = this.state.sections;
       if(sections){
            const sectionKeys=Object.keys(sections);
            return sectionKeys.map(key=>(
                <Card key={key} style={{paddingTop:20, paddingBottom:20}}>
                   <CardHeader color={'info'}>
                       <GridItem container justify={'space-between'} alignItems={'center'}>
                         <h5>{sections[key].title}</h5>
                         <div>
                             <Tooltip title={'Delete Entire Section'}>
                                 <Button onClick={()=>this.setState({confirmModal:true,sectionId:key})} color={'danger'} size={'sm'} round justIcon><Close/></Button>
                             </Tooltip>
                             <Tooltip title={'Edit Section Title'}>
                                 <Button onClick={()=>this.setState({sectionModal:true,sectionId:key, sectionTitle:sections[key].title})} color={'warning'} size={'sm'} round justIcon><Edit/></Button>
                             </Tooltip>
                         </div>
                       </GridItem>
                   </CardHeader>
                    <CardBody>
                        <Questions
                            questions={sections[key].questions}
                            onSave={(data,id)=>this.handleQuestionSave(data,id,key)}
                            onDelete={(id)=>this.handelQuestionDelete(id,key)}
                        />
                    </CardBody>
                </Card>
            ))
       }
    }

    handleSectionUpdate=(title)=>{
        const sectionId=this.state.sectionId;
        // add section
        if(!sectionId){
            this.props.addSection(title);
            this.setState({sectionId:null, sectionModal:false, sectionTitle:null});
        }
        // update section
        else{
            this.setState({sectionId:null, sectionModal:false, sectionTitle:null});
            this.props.editSection(title, sectionId)
        }
    };

    handleQuestionSave=(data,questionId,sectionId)=>{
            if(questionId){
                this.props.editQuestion(data,questionId,sectionId)
            }else{
                this.props.addQuestion(data,sectionId)
            }
    }

    handelQuestionDelete=(questionId,sectionId)=>{
        this.props.deleteQuestion(sectionId,questionId);
    }

    handleConfirmSectionDelete=()=>{
        const {sectionId}=this.state;
        this.props.deleteSection(sectionId);
        this.setState({confirmModal:false, sectionId:null});
    }

    render() {
        const {sectionModal, sectionTitle, confirmModal}=this.state;
        return (
            <div>
                <SectionModal
                    open={sectionModal}
                    close={()=>this.setState({sectionModal:false,sectionTitle:null, sectionId:null})}
                    onSave={this.handleSectionUpdate}
                    title={sectionTitle}
                />
                <ConfirmModal
                    open={confirmModal}
                    close={()=>this.setState({confirmModal: false,sectionId:null})}
                    Title={'Confirm Delete'}
                    content={'Are you sure you want to delete this section and all its content?'}
                    saveText={'Delete'}
                    saveColor={'danger'}
                    saveAction={this.handleConfirmSectionDelete}
                />
                <GridItem container justify={'flex-end'}>
                    <Button  onClick={()=>this.setState({sectionModal:true})} color={'success'} size={'sm'} simple><Add/>Add Section</Button>
                </GridItem>
                {this.renderSections()}
            </div>
        )
    }
}

export default connect(null)(Sections);

/*
sections:{
   id:{
    title:"",
    questions:{
        id:{
            title:"",
            answer:"",
            type:"text"
        }
    }
   }
}
 */