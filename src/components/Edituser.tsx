import { useEffect, useState } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Button, ButtonGroup, Typography } from '@material-ui/core';
import { connect, useDispatch, useSelector } from 'react-redux';
import { useHistory,useParams} from 'react-router-dom';
import { getSingleUsers } from '../redux/action/useractions';
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
const Edituser=(props:any)=> {
  let history = useHistory();
  type userparams = {
    id: string;
  };
  let {id} = useParams<userparams>();
  
  const dispatch = useDispatch()
  const classes = useStyles();

  useEffect(() => {
      dispatch(getSingleUsers(id))
    //  props.getSingleUser(id);
  }, []);

  // const {user} = useSelector((state:any)=>state.users)

  let user= props.user.user

  console.log(user)
  useEffect(() => {
    if(user){
      setstate({...user})
    }
  }, [user])

  const [state, setstate] = useState({
      name:"",
      email:"",
      contact:"",
      address:"",
  })
  const {name,email,contact,address} = state
  

  const handleInputChange =(e:any)=>{
    let {name,value}=e.target;
    setstate({...state , [name]:value})
  }
  // const [error,setError] = useState();
  console.log(state)
  const handleSubmit =(e:any)=>{
    e.preventDefault();
    // dispatch(putUser(id,state))
    props.putUser(id,state)    
  }
    
  return (
    <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
       <Typography align='center' variant="h4" color="secondary">Edit User</Typography>

      <TextField id="standard-basic" label="Name" variant="outlined" name="name" value={state.name}  type="text" onChange={handleInputChange}/>
      <TextField id="standard-basic" label="Email" variant="outlined" name="email" value={email}   type="email" onChange={handleInputChange}/>
      <TextField id="standard-basic" label="Contact" variant="outlined" name="contact" value={contact}  type="number" onChange={handleInputChange}/>
      <TextField id="standard-basic" label="Address" variant="outlined" name="address" value={address}  type="text" onChange={handleInputChange}/>
      <ButtonGroup >
          <Button type='submit' color='primary' variant="contained" style={{ marginRight: "10px" }}>Update</Button>
          <Button color='primary' variant="contained" onClick={() => history.push("/")}>View</Button>
        </ButtonGroup>
    </form>
  );
}
const mapStateToProps = (state: { users: any; }) => {
  return {
      user: state.users,
 }
}

const mapActionToProps={
  getSingleUsers:useractions.getSingleUsers,
  putUser:useractions.putUser,
  }
export default connect(
  mapStateToProps,
  mapActionToProps
)(Edituser);