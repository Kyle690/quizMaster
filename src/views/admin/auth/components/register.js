import React from "react";
import Card from "../../../../components/Card/Card";
import CardHeader from "../../../../components/Card/CardHeader";
import CardBody from "../../../../components/Card/CardBody";
import Danger from "../../../../components/Typography/Danger";
import {Field, reduxForm} from "redux-form";
import CardFooter from "../../../../components/Card/CardFooter";
import Button from '../../../../components/CustomButtons/Button';
import {RenderInput} from "../../../../Functions/RenderInput";

const Register=({onSubmit,error,formChange, handleSubmit})=>{
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Card>
                <CardHeader color={'warning'}>
                    <h3>Quiz Master Register</h3>
                </CardHeader>
                <CardBody>
                    <p>To register as a new admin, please fill in the form below.</p>
                    <Danger>{error}</Danger>
                    <Field
                        id={'fullName'}
                        name={'fullName'}
                        type={'text'}
                        width
                        placeholder={'Full name'}
                        label={'Full Name'}
                        component={RenderInput}
                    />
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
                </CardBody>
                <CardFooter>
                    <Button type={'button'} onClick={()=>formChange('login')} color={'github'} simple>
                        Login Rather
                    </Button>
                    <Button type={'submit'} color={'success'} round>
                        Register
                    </Button>
                </CardFooter>
            </Card>
        </form>
    )
};

const validate=(formValues)=>{
    const errors={};
    const {fullName, email, password}=formValues;
    if(!fullName){
        errors.fullName='please enter your name';
    }
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

const Form = reduxForm({
    form:'adminRegister',
    validate
})(Register);

export default Form;
