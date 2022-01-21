import  { useEffect } from 'react'
import { withStyles, Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, ButtonGroup } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { useSelector,useDispatch, connect } from 'react-redux';
import { loadUsers,deleteUser} from '../redux/action/useractions';
import * as useractions from '../redux/action/useractions'

const useButtonStyles= makeStyles((theme)=>({
  root:{
      display:"flex",
      flexDirection:"column",
      alignItems:"center",
      paddingTop:"20px"
  }
}))
const StyledTableCell = withStyles((theme) => ({
   
    head:{
        backgroundColor:theme.palette.common.black,
        color:theme.palette.common.white
    },
    body:{
        fontSize:14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
  root:{
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
},
  }))(TableRow);
  
  const useStyles= makeStyles({
      table:{
          marginTop:100,
          minWidth:900,
      }
  })


const Home=(props:any)=> {
  const classes=useStyles();
  const buttonStyles=useButtonStyles();

  let history = useHistory();
    let dispatch = useDispatch();

    const handleDelete =(id: number)=>{
      if(window.confirm("Do you really want to delete")){
      // dispatch(deleteUser(id))
      props.deleteUser(id)
      }
    }
  
    useEffect(() => {
      // dispatch(loadUsers())
      props.loadUsers();
    }, [])

    //  const { users } = useSelector((state:{users:any})=>state.users);
    let users=props.users.users
    return ( <div>
      <div className={buttonStyles.root}>
      <Button color="primary" variant="contained" onClick={()=> history.push("/adduser")}>Add User</Button>
      </div>
      <TableContainer component={Paper}>
    <Table aria-label="customized table" className={classes.table}>
      <TableHead>
        <TableRow>
          <StyledTableCell>Name</StyledTableCell>
          <StyledTableCell align="center">Email</StyledTableCell>
          <StyledTableCell align="center">Contact</StyledTableCell>
          <StyledTableCell align="center">Address</StyledTableCell>
          <StyledTableCell align="center">Action</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { users.length > 0 &&
         <>
        { users.map((user:any) => {
          return (
          <StyledTableRow key={user.id}>
            <StyledTableCell component="th" scope="row">{user.name}</StyledTableCell>
            <StyledTableCell align="center">{user.email}</StyledTableCell>
            <StyledTableCell align="center">{user.contact}</StyledTableCell>
            <StyledTableCell align="center">{user.address}</StyledTableCell>
            <StyledTableCell align="center">
            <ButtonGroup disableElevation variant="contained">
                <Button color="secondary" style={{marginRight:"5px"}} 
                onClick={()=> handleDelete(user.id)}>Delete</Button>
                 <Button color="primary" onClick={()=> history.push(`/edituser/${user.id}`)} >Edit</Button>
           </ButtonGroup>
            </StyledTableCell>
          </StyledTableRow>
        )} )}
        </>
        }
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  )
    }

const mapStateToProps = (state:{users:any}) => {
  // debugger
  return {
     users: state.users,
 }
}

const mapActionToProps={
  loadUsers:useractions.loadUsers,
  deleteUser:useractions.deleteUser
  }

export default connect(
 mapStateToProps,
 mapActionToProps
)(Home)
