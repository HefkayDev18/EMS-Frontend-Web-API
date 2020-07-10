import s from './css/form.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { API } from '../redux/apiBase';
import { ToastContainer, toast, Flip } from 'react-toastify';
import { useState } from 'react';

export default () => {
  const [submitting, setSubmitting] = useState(false);
  const formik = useFormik({
    initialValues : {
      email : ''
    },
    validationSchema : Yup.object({
      email : Yup.string()
      .email('Invalid email')
      .required('Email is required')
    }),
    onSubmit : values => {
      setSubmitting(true);
      fetch(API('/password/sendReset'), {
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(values)
      })
      .then(res => res.json())
      .then(data => {
        if(data.error) {
          toast.error(data.error);
        } else {
          toast.success('Reset link has been sent to your mail');
          formik.resetForm()
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Snap! Looks like you are offline')
      })
      .finally(() => setSubmitting(false))
    }
  })
  return (
    <div className={s.formContainer}>
      <p className={s.formHead + ' bold'}>FORGOT PASSWORD</p>
      <form onSubmit={formik.handleSubmit}>
        <p>Enter your email address and we would email you a password reset link</p>
        <div className={s.formGroup}>
          {formik.touched.email && formik.errors.email ? (<p>{formik.errors.email}</p>) : null}
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder='ENTER YOUR EMAIL ADDRESS' id='email' name='email' type="email"/>
        </div>
        <div className={s.formGroup}>
          <button type='submit' disabled={submitting} className={s.switchBtn}>{submitting ? '...' : 'SEND RESET LINK'}</button>
        </div>
      </form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
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