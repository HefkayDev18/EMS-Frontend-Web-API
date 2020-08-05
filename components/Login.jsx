import s from './css/form.module.css';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux';
import { loginuser } from '../redux/user/user.actions';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { useEffect, useState } from 'react';
import Router from 'next/router';

export default () => {
  const dispatch = useDispatch();
  const login_error = useSelector(state => state.user.login_error);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const logging_in = useSelector(state => state.user.logging_in);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => {
    if(isLoggedIn) {
      // toast.success('Successful');
      Router.push(Router.query.redirectedFrom || '/customer/profile');
    }
  }, [isLoggedIn])
  const formik = useFormik({
    initialValues : {
      email : '',
      password : ''
    },
    validationSchema : Yup.object({
      email : Yup.string()
      .email('Invalid email')
      .required('Email is required'),
      password : Yup.string()
      .min(6, 'Password must be 6 characters or more')
      .required('Password is required')
    }),
    onSubmit : values => {
      dispatch(loginuser({user : values.email, password : values.password}))
    }
  })
  useEffect(() => {
    if(login_error) {
      toast.error(login_error)
      dispatch({type : 'LOGIN_ERROR', payload : ''})
    }
  }, [login_error])
  return (
    <div className={s.formContainer}>
      <h1 className={s.formHead + ' bold'}>LOGIN</h1>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.formGroup}>
          {formik.touched.email && formik.errors.email ? (<p>{formik.errors.email}</p>) : null}
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder='EMAIL' id='email' name='email' type="email"/>
        </div>
        <div className={s.formGroup}>
          {formik.touched.password && formik.errors.password ? (<p>{formik.errors.password}</p>) : null}
          <div className='flex-align'>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder='PASSWORD' type={showPassword ? 'text' : 'password'}  name="password" id="password"/><div onClick={() => setShowPassword(!showPassword)} style={{backgroundImage : showPassword ? 'url(/icons/show-password.svg)' : 'url(/icons/hide-password.svg)', backgroundSize :'100% 100%', width:'30px', height : '30px', marginLeft :'-35px'}}>{' '}</div>
          </div>
        </div>
        <div className={s.formGroup + ' flex flex-between'} style={{flexDirection:'row-reverse'}}>
          {/* <div>
            <input type="checkbox" name="" id="rememberMe"/><label htmlFor="rememberMe">Remember Me</label>
          </div> */}
          <Link href="/forgot-password"><a>Forgot Password?</a></Link>
        </div>
        <div className={s.formGroup}>
          <button type='submit' disabled={logging_in} className={s.submitBtn}>{logging_in ? '...' : 'LOGIN'}</button>
        </div>
        <div className={s.formGroup}>
          <Link href="/register">
            <button type='button' className={s.switchBtn}>CREATE ACCOUNT</button>
          </Link>
        </div>
      </form>
      <ToastContainer
        position="bottom-left"
        autoClose={3500}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        transition={Flip}
      />
    </div>
  )
}