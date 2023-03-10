import { useForm } from 'react-hook-form'
import '../SignUp/SignUp.scss'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import Button from 'react-bootstrap/Button';
    import Form from 'react-bootstrap/Form';
    import Col from 'react-bootstrap/Col';
    import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux'
import { logIn } from '../../features/auth/authAction';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { reservationAsync } from '../../features/reservation/reservationSlice';

const Login = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  );
    console.log(userInfo)
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

//   useEffect(()=>{
//     if(userInfo.role==='admin'){
// navigate('/admin')
//     }
//     else if(userInfo.role==='user'){
//       navigate('/')
//     }
//   },[navigate,userInfo]);
    

  const submitForm = (data) => {
    // transform email string to lowercase to avoid case sensitivity issues during login
    data.email = data.email.toLowerCase()
    console.log(data)
dispatch(logIn(data));

  }

  return (
    
    <div className='form-container'>


    <Form onSubmit={handleSubmit(submitForm)}>
    {error && <Error>{error}</Error>}
    <h1>LogIn Form</h1>
   
    <Form.Group as={Row} className="mb-3" controlId="formPlainemail">
        <Form.Label column sm="3">
          Email
        </Form.Label>
        <Col sm="9">
          <Form.Control type="email" placeholder="email.." 
          className='form-input'
          {...register('email')}
          required/>
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="3">
          Password
        </Form.Label>
        <Col sm="9">
          <Form.Control type="password" placeholder="Password"
          className='form-input'
          {...register('password')}
          required />
        </Col>
      </Form.Group>
      <button type='submit' className='button' disabled={loading}>
        {loading ? <Spinner /> : 'Submit'}
      </button>
    </Form>
<div className="onsuccess">{success ? (<h5>User Loggedin successfully</h5>) :null }</div>
    </div>
  );
}

    
   

export default Login;