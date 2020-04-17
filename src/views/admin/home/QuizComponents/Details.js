import React from "react";
import GridContainer from "../../../../components/Grid/GridContainer";
import GridItem from "../../../../components/Grid/GridItem";
import CustomInput from "../../../../components/CustomInput/CustomInput";
import DateTimePicker from "../../../../components/DateTimePicker";
import {MainSwitch} from "../../../../components/Switch";
import Button from '../../../../components/CustomButtons/Button';
import {AddAlarm, Save, Share} from "@material-ui/icons";
import Danger from "../../../../components/Typography/Danger";
import {Tooltip} from "@material-ui/core";
import Snackbar from "../../../../components/Snackbar/Snackbar";

class Details extends React.Component{

    state={
        title:'',
        date:'',
        active:false,
        completed:false,
        error:null,
        notif:false
    };

    componentDidMount() {
        const {title, active,date,completed}=this.props.details;
        this.setState({title, active,date:new Date(date),completed})
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

        if(prevProps.details!==this.props.details){
            const {title, active,date,completed}=this.props.details;
            this.setState({title, active,date:new Date(date),completed})
        }

    }

    handleDateChange=(date)=>{
        this.setState({date});
    };

    handleChange=(name)=>event=>{
        if(name==='title'){
            this.setState({[name]:event.target.value})
        }else{
            this.setState({[name]:event.target.checked})
        }
    };

    handleOnSave=()=>{
        const {title,date,active,completed}=this.state;
        const data ={title,date,active,completed};
        if(title!==''){
            this.setState({error:null});
            this.props.handleSave(data);
        }else{
            this.setState({error:'Title cannot be left blank!'})
        }
    };


    handleShare=()=>{
      const link = this.props.link;
        navigator.clipboard.writeText(link);
        this.setState({notif:true});
    };

    render() {
        const {title, date, active, completed, error, notif}=this.state;
        return (
            <div>
                <Snackbar
                    icon={AddAlarm}
                    place={'tc'}
                    open={notif}
                    color={'success'}
                    message={"Link copied"}
                    close={()=>this.setState({notif:false})}
                />
                <Danger>{error}</Danger>
                <GridContainer justify={'center'} alignItems={'center'}>
                    <GridItem xs={12} sm={12} md={8}>
                        <CustomInput
                            labelText={'Title'}
                            inputProps={{
                                value:title,
                                placeHolder:'Quiz Title',
                                type:'text',
                                onChange:this.handleChange('title')
                            }}
                            formControlProps={{
                                fullWidth:true
                            }}
                        />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={4}>
                        <DateTimePicker
                            value={date}
                            onChange={this.handleDateChange}
                        />
                    </GridItem>
                    <GridItem xs={6} justify={'center'}>
                        <MainSwitch
                            checked={active}
                            onChange={this.handleChange('active')}
                            value={'active'}
                            label={'Active'}
                        />
                    </GridItem>
                    <GridItem xs={6} justify={'center'}>
                        <MainSwitch
                            checked={completed}
                            onChange={this.handleChange('completed')}
                            value={'completed'}
                            label={'Completed'}
                        />
                    </GridItem>

                    <GridItem xs={12} container justify={'space-between'} >
                        <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                            <Tooltip title={'Share Link to participants'}>
                                <Button onClick={()=>this.handleShare()} round justIcon>
                                    <Share/>
                                </Button>
                            </Tooltip>
                            <p>Copy this link and share it with all your participants</p>
                        </div>
                        <Button onClick={()=>this.handleOnSave()}  color={'success'} size={'sm'} round>
                            <Save/>
                            Save
                        </Button>
                    </GridItem>

                </GridContainer>
            </div>
        )
    }
}

export default Details;