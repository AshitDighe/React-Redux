import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, ButtonGroup, Grid, makeStyles, TextField, Typography } from '@material-ui/core'
import React from 'react'
import * as yup from 'yup';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { BrowserRouter as Router, RouteComponentProps, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
// import * as signupAction from '../state/actions/signupAction'
import { addUser } from '../redux/action/useractions';
import * as useractions from '../redux/action/useractions'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '350px',
    },
  },
}))

interface IFormInput{
  name: string;
  email: string;
  contact: string;
  address: string;
}
const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-])|(\\([0-9]{2,3}\\)[ \\-])|([0-9]{2,4})[ \\-])?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/


  const schema=yup.object().shape({
    name: yup.string().min(2).max(20).required(),
    email: yup.string().email().required(),
    contact: yup.string().matches(phoneRegExp, 'Phone number is not valid').required(),
    address: yup.string().min(5).max(30).required(),
  })  

 const Adduser:React.FC=(props:any)  =>{
  const classes = useStyles();
  const history = useHistory();
  const methods= useForm<IFormInput> ({resolver:yupResolver(schema)});

  const {register, watch,control,reset,handleSubmit,formState:{errors} }=methods;

  const formSubmitHandler:SubmitHandler<IFormInput>=(data:IFormInput)=>{
    props.addUser(data,()=>{
      
      methods.reset({ name: '', email: '', contact: '', address: '' })
    //  props.history.push("/Home");
    })

       
    };
    
  return (
    <form onSubmit={handleSubmit(formSubmitHandler)} className={classes.root}>
    <Typography align='center' variant="h4" color="secondary">Add User</Typography>

    <Controller name='name' control={control} render={({ field }) => (
      <TextField {...field} label="Name" name='name'  error={!!errors.name}
        helperText={errors.name ? errors.name?.message : ""} placeholder='Enter name' variant="outlined" />
    )}></Controller>

    <Controller name='email' control={control} render={({ field }) => (
      <TextField {...field} label="Email" name='email' error={!!errors.email}
        helperText={errors.email ? errors.email?.message : ""} placeholder='Enter email address' variant="outlined" />
    )}></Controller>

    <Controller name='contact' control={control} render={({ field }) => (
      <TextField {...field} label="Contact No" name='contact' error={!!errors.contact}
        helperText={errors.contact ? errors.contact?.message : ""} placeholder='Enter contact no' variant="outlined" />
    )}></Controller>

    <Controller name='address' control={control} render={({ field }) => (
      <TextField {...field} label="Address" name='address' error={!!errors.address}
        helperText={errors.address ? errors.address?.message : ""} placeholder='Enter address' variant="outlined" />
    )}></Controller>
    <ButtonGroup >
      <Button type='submit' color='primary' variant="contained" style={{ marginRight: "10px" }}>Submit</Button>
      <Button color='primary' variant="contained" onClick={() => history.push("/")}  >view</Button>
    </ButtonGroup>
  </form>
     
  );
}

const mapStateToProps = (state: { users: any; }) => {
  return {
      users: state.users,
 }
}

const mapActionToProps={
  addUser:useractions.addUser,
  }
export default connect(
  mapStateToProps,
  mapActionToProps
)(Adduser);
