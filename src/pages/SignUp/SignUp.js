import { useForm } from 'react-hook-form'
import './SignUp.scss'
import Error from '../../components/Error'
import Spinner from '../../components/Spinner'
import Button from 'react-bootstrap/Button';
    import Form from 'react-bootstrap/Form';
    import Col from 'react-bootstrap/Col';
    import Row from 'react-bootstrap/Row';
import { useDispatch, useSelector } from 'react-redux'
import { signUp } from '../../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const { loading, userInfo, error, success } = useSelector(
    (state) => state.auth
  )
  const dispatch = useDispatch();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  
  const submitForm = (data) => {
    // transform email string to lowercase to avoid case sensitivity issues during login
    data.email = data.email.toLowerCase()
    //console.log(data)
dispatch(signUp(data))
  }

  return (
    
    <div className='form-container'>


    <Form onSubmit={handleSubmit(submitForm)}>
    <h1>SignUp Form</h1>
    <Form.Group as={Row} className="mb-3" controlId="formPlaintext">
        <Form.Label column sm="3">
          Username
        </Form.Label>
        <Col sm="9">
          <Form.Control type="text" placeholder="username"
          className='form-input'
          {...register('username')}
          required />
        </Col>
      </Form.Group>
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

    </div>
  );
}

    
   

export default SignUp;