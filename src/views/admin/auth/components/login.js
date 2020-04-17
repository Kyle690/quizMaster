import React from "react";
import Card from "../../../../components/Card/Card";
import CardHeader from "../../../../components/Card/CardHeader";
import CardBody from "../../../../components/Card/CardBody";
import CardFooter from "../../../../components/Card/CardFooter";
import Button from '../../../../components/CustomButtons/Button';
import {Field, reduxForm}from 'redux-form';
import Danger from "../../../../components/Typography/Danger";
import {RenderInput} from "../../../../Functions/RenderInput";

const LoginForm =({handleSubmit,onSubmit, error, formChange})=>{
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card>
                    <CardHeader color={'warning'}>
                        <h3>Quiz Master Login</h3>
                    </CardHeader>
                    <CardBody>
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
                        <Field
                            id={'password'}
                            width
                            type={'password'}
                            name={'password'}
                            placeholder={'********'}
                            label={'Password'}
                            component={RenderInput}
                        />
                        <Button size={'sm'} color="github" simple type={'button'} onClick={()=>formChange('forgotPassword')}>
                            Forgot Password?
                        </Button>
                    </CardBody>
                    <CardFooter>
                        <Button round simple onClick={()=>formChange('register')} type={'button'} color={'github'}>
                            Register
                        </Button>
                        <Button round type={'submit'} color={'success'}>
                            Submit
                        </Button>

                    </CardFooter>
                </Card>
            </form>
        )
};

const validate=(formValues)=>{
  const errors={};

  const {email,password}=formValues;
  if(!email){
      errors.email='Please enter your email';
  }else if(!/^[A-z0-9. %+-]+@[A-Z0-9.-]+\.[A-Z{2,4}]/i.test(email)){
      errors.email='please enter a valid email';
  }

  if(!password){
      errors.password='enter a password'
  }
  return errors;
};

const Form =reduxForm({
    form:'adminLogin',
    validate
})(LoginForm);


export default Form;