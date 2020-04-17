import React from "react";
import {reduxForm,Field} from "redux-form";
import Card from "../../../../components/Card/Card";
import CardHeader from "../../../../components/Card/CardHeader";
import CardBody from "../../../../components/Card/CardBody";
import CardFooter from "../../../../components/Card/CardFooter";
import Button from '../../../../components/CustomButtons/Button';
import {RenderInput} from "../../../../Functions/RenderInput";
import Danger from "../../../../components/Typography/Danger";

const ForgotPassword=({onSubmit,error,formChange, handleSubmit})=>{
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader color={'warning'}>
                    <h3>Forgot Password</h3>
                </CardHeader>
                <CardBody>
                    <p>Forgot your password?<br/> No problem enter your email address below and we'll send you a link to reset it</p>
                    <Danger>{error}</Danger>
                    <Field
                        id={'email'}
                        width
                        type={'email'}
                        name={'email'}
                        placeholder={'name@email.com'}
                        label={'Email'}
                        component={RenderInput}
                    />
                </CardBody>
                <CardFooter>
                    <Button type={'button'} onClick={()=>formChange('login')} color={'github'} simple>
                        Login Rather
                    </Button>
                    <Button  type={'submit'} color={'success'} round>
                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
};

const validate=(formValues)=>{
  const errors={};
  if(!formValues.email){
      errors.email='Please enter an email';
  }else if(!/^[A-z0-9. %+-]+@[A-Z0-9.-]+\.[A-Z{2,4}]/i.test(formValues.email)){
      errors.email='please enter a valid email';
  }
  return errors
};
const Form = reduxForm({
    form:'forgotPassword',
    validate
})(ForgotPassword);
export default Form;

