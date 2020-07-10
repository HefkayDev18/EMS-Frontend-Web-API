import s from './css/form.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { useEffect, useState } from 'react';
import Router from 'next/router'
import { API } from '../redux/apiBase';
import { ToastContainer, toast, Flip } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';

export default () => {
  const [token, setToken] = useState(''); 
  useEffect(() => {
    const tk = Router.query.token;
    if(!tk) Router.push('/')
    else {
      fetch(API(`/password/check?token=${tk}`))
      .then(res => res.json())
      .then(data => {
        if(data.error) {
          toast.error(data.error);
          setTimeout(() => Router.push('/'), 1500);
        } else {
          document.title = 'Reset Password';
          setToken(tk);
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Snap! Looks like you\'re offline')
      })
    }
  }, []);
  const formik = useFormik({
    initialValues : {
      password : '',
      passwordConfirm : ''
    },
    validationSchema : Yup.object({
      password : Yup.string()
      .min(6, 'Password must be 6 characters or more')
      .required('Password is required'),
      passwordConfirm : Yup.string()
      .min(6, 'Password must be 6 characters or more')
      .oneOf([Yup.ref('password'), null], 'Passwords do not match')
      .required('Password Confirmation is required')
    }),
    onSubmit : values => {
      const data = { token, password : values.password };
      fetch(API('/password/reset'), {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
      })
      .then(res => res.json())
      .then(data => {
        if(data.error) {
          toast.error(data.error);
          formik.resetForm();
        } else {
          toast.success(data.message);
          setTimeout(() => Router.push('/'), 1200)
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Snap! Could not connect to server')
      })
    }
  })
  return (
    <div className={s.formContainer}>
      <h1 className={s.formHead + ' bold'}>RESET PASSWORD</h1>
      <form onSubmit={formik.handleSubmit}>
        { !token && <div className='flex-center flex-column'>
          <Skeleton width={350} height={60} style={{margin : '10px'}} />
          <Skeleton width={350} height={60} style={{margin : '10px'}} />
          <Skeleton width={350} height={60} style={{margin : '10px'}} />
        </div>}
        { token &&
        <>
          <div className={s.formGroup}>
            {formik.touched.password && formik.errors.password ? (<p>{formik.errors.password}</p>) : null}
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder='TYPE NEW PASSWORD' id='password' name='password' type="password"/>
          </div>
          <div className={s.formGroup}>
            {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (<p>{formik.errors.passwordConfirm}</p>) : null}
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordConfirm} placeholder='CONFIRM NEW PASSWORD' id='passwordConfirm' name='passwordConfirm' type="password"/>
          </div>
          <div className={s.formGroup}>
            <button type='submit' disabled={false} className={s.submitBtn}>{false ? '...' : 'RESET PASSWORD'}</button>
          </div>
        </>
        }
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
