import React from "react";
import {connect}from 'react-redux';
import history from "../../../history";
import {Loading} from "../../../components/Loading";
import {Close} from "@material-ui/icons";
import GridContainer from "../../../components/Grid/GridContainer";
import GridItem from "../../../components/Grid/GridItem";
import Card from "../../../components/Card/Card";
import CardHeader from "../../../components/Card/CardHeader";
import Button from '../../../components/CustomButtons/Button';
import {Add, RemoveRedEye, Edit, AddAlarm} from "@material-ui/icons";
import CardBody from "../../../components/Card/CardBody";
import AddQuizModal from "../../../components/Modals/AddQuizModal";
import {addQuiz, deleteQuiz, editQuiz, viewQuiz} from "../../../store/actions/quizActions";
import {FormatDate} from "../../../Functions";
import {Tooltip} from "@material-ui/core";
import Table from '../../../components/Table/Table';
import Success from "../../../components/Typography/Success";
import Danger from "../../../components/Typography/Danger";
import ConfirmModal from "../../../components/Modals/ConfrimModal";
import Snackbar from "../../../components/Snackbar/Snackbar";

class AdminHome extends React.Component{


    state={
        loading:false,
        createModal:false,
        date: new Date(new Date().setHours(0,0,0,0)),
        createError:null,
        confirmDelete:false,
        confirmDeleteId:null,
        deleteTitle:null,
        notif:false,
        notifType:'warning',
        notifMsg:null
    };

    renderQuizes=()=>{
        const quizes = this.props.quizes;
        if(quizes){
            const keys=Object.keys(quizes);


            const tableData=keys.reduce((a,v, index)=>{

                const {title,active,completed,date}=quizes[v].details;
                const qNo =quizes[v].sections?
                    Object.keys(quizes[v].sections).reduce((ar,va)=>{
                        if(quizes[v].sections[va].questions){
                            ar+=Object.keys(quizes[v].sections[va].questions).length
                        }
                        return ar;
                    },0)
                    :0;
                const people=this.props.quizes[v].answers?Object.keys(this.props.quizes[v].answers).length:0;
                a.push([
                    index+1,
                    title,
                    qNo,
                    people,
                    active?<Success>True</Success>:<Danger>False</Danger>,
                    completed?<Success>True</Success>:<Danger>False</Danger>,
                    FormatDate(date),
                    <div>
                        <Tooltip title={'Delete'}>
                            <Button onClick={()=>this.setState({ deleteTitle:title,confirmDelete:true,confirmDeleteId:v})} color={'danger'} justIcon round size={'sm'}>
                                <Close/>
                            </Button>
                        </Tooltip>
                        <Tooltip title={'View'}>
                            <Button onClick={()=>this.handleViewQuiz(this.props.quizes[v],v)} color={'info'} justIcon round size={'sm'}>
                                <RemoveRedEye/>
                            </Button>
                        </Tooltip>
                        <Tooltip title={'Edit'}>
                            <Button onClick={()=>this.handleEditQuiz(this.props.quizes[v],v)} color={'warning'} justIcon round size={'sm'}>
                                <Edit/>
                            </Button>
                        </Tooltip>
                    </div>
                ]);

                return a;
            },[]);
            const TableHead=['No','Title', 'No Questions','Responses','Active','Complete','Date','Actions'];

            return (
                <Table
                    tableHead={TableHead}
                    tableData={tableData}
                    tableHeaderColor={'warning'}
                />
            )


        }else{
            return (
                <div>
                    <h3>No Quiz's have been created yet!</h3>
                </div>
            )
        }
    };

    handleEditQuiz=(data,uid)=>{
        data['id']=uid;
        this.props.editQuiz(data,res=>{
            if(res.status===1){
                history.push('/admin/home/edit')
            }
        })
    };

    handleViewQuiz=(data,uid)=>{
        data['id']=uid;
        this.props.viewQuiz(data,res=>{
            if(res.status===1){
                history.push('/admin/home/view')
            }
        })
    };

    handleDeleteQuiz=()=>{
        this.setState({loading:true});
        this.props.deleteQuiz(this.props.uid,this.state.confirmDeleteId,res=>{
            if(res.status===1){
                this.setState({
                    loading:false,
                    confirmDelete:false,
                    confirmDeleteId:null,
                    deleteTitle:null,
                    notif:true,
                    notifType:'success',
                    notifMsg:'Quiz deleted successfully'
                })
            }else{
                this.setState({
                    loading:false,
                    notif:true,
                    notifType:'warning',
                    notifMsg:res.msg
                })
            }
        })
    };

    handleCreateQuiz=(formValues)=>{
        this.setState({loading:true});
        const data={title:formValues.title,date:this.state.date.toString()};
        const {uid,displayName}=this.props;
        this.props.addQuiz(data,uid,displayName,res=>{
            if(res.status===1){
                this.setState({
                    loading:false,
                });

                history.push('/admin/home/edit');
            }else{
                this.setState({
                    loading:false,
                    createError:res.msg
                })
            }
        })

    };

    handleDateChange=(date)=>{
        this.setState({date})
    };

    render(){
        const {loading, createModal, date,confirmDelete,deleteTitle, notif, notifMsg, notifType}=this.state;
        const {displayName,classes}=this.props;
        return (
            <div className={'mainDiv'}>
                <AddQuizModal
                    date={date}
                    handleDateChange={this.handleDateChange}
                    onSubmit={this.handleCreateQuiz}
                    open={createModal}
                    close={()=>this.setState({createModal: false})}
                />
                <Loading
                    show={loading}
                />
                <ConfirmModal
                    open={confirmDelete}
                    close={()=>this.setState({ confirmDelete:false, confirmDeleteId:null, deleteTitle:null})}
                    title={'Confirm Delete'}
                    classes={classes}
                    saveText={'Delete'}
                    saveColor={'danger'}
                    content={`Are you sure you want to delete ${deleteTitle}`}
                    saveAction={this.handleDeleteQuiz}
                />
                <Snackbar
                    icon={AddAlarm}
                    place={'br'}
                    open={notif}
                    color={notifType}
                    message={notifMsg}
                    close={()=>this.setState({notif:false,notifMsg:null, notifType: 'warning'})}
                />
                <GridContainer justify={'center'} >
                    <GridItem xs={12} sm={12} md={8} style={{marginTop:'10%'}} >
                        <Card>
                            <CardHeader color={'warning'}>
                                <GridItem color={'primary'} alignItems={'center'} container direction={'row'} justify={'space-between'}>
                                    <h3>Welcome back {displayName}</h3>
                                    <Button size={'sm'} simple onClick={()=>this.setState({createModal:true})} >
                                        <Add/>
                                        Create
                                    </Button>
                                </GridItem>
                            </CardHeader>
                            <CardBody>
                                {this.renderQuizes()}
                            </CardBody>
                        </Card>
                    </GridItem>
                </GridContainer>
            </div>
        )
    }
}
const mapStateToProps=(state)=>{
    const {uid, displayName}=state.auth;
    return {
        quizes:state.admin.quizes,
        uid,
        displayName:displayName?displayName.split(' ')[0]:null
    }
};

export default connect(mapStateToProps,
    {
        addQuiz,
        editQuiz,
        viewQuiz,
        deleteQuiz
    })(AdminHome);