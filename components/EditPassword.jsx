import s from './css/form.module.css';
import { ToastContainer, toast } from 'react-toastify';
import Router from 'next/router';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import { API } from '../redux/apiBase';
import { useSelector } from 'react-redux';

export default () => {
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const user = useSelector(state => state.user.user);
  const formik = useFormik({
    initialValues : {
      oldPassword : '',
      newPassword : '',
      newPasswordConfirm : ''
    },
    validationSchema : Yup.object({
      oldPassword : Yup.string()
      .trim()
      .min(6, 'Password cannot be less that 6 characters')
      .required('Old password is required'),
      newPassword : Yup.string()
      .trim()
      .min(6, 'Password must be 6 characters or more')
      .required('New password is required'),
      newPasswordConfirm : Yup.string()
      .trim()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords do not match')
      .required('Password confirmation is required'),
    }),
    onSubmit : values => {
      setSubmitting(true);
      values.user = user._id;
      fetch(API('/changePassword'), {
        method : 'PUT',
        credentials : 'include',
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
          toast.success(data.message);
          setTimeout(() => Router.push('/customer/profile'), 1500)
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Snap! Looks like you\'re offline');
      })
      .finally(() => setSubmitting(false))
    }
  })
  return (
    <div className={s.formContainer}>
      <p className={s.formHead + ' bold'}>CHANGE PASSWORD</p>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.formGroup}>
          {formik.touched.oldPassword && formik.errors.oldPassword ? (<p>{formik.errors.oldPassword}</p>) : null}
          <div className='flex-align'>
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.oldPassword} placeholder='OLD PASSWORD' type={showPassword ? 'text' : 'password'}  name="oldPassword" id="oldPassword"/><div onClick={() => setShowPassword(!showPassword)} style={{backgroundImage : showPassword ? 'url(/icons/show-password.svg)' : 'url(/icons/hide-password.svg)', backgroundSize :'100% 100%', width:'30px', height : '30px', marginLeft :'-35px'}}>{' '}</div>
          </div>
        </div>
        <div className={s.formGroup}>
          {formik.touched.newPassword && formik.errors.newPassword ? (<p>{formik.errors.newPassword}</p>) : null}
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPassword} placeholder='NEW PASSWORD' type={showPassword ? 'text' : 'password'} name="newPassword" id="newPassword"/>
        </div>
        <div className={s.formGroup}>
          {formik.touched.newPasswordConfirm && formik.errors.newPasswordConfirm ? (<p>{formik.errors.newPasswordConfirm}</p>) : null}
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.newPasswordConfirm} placeholder='CONFIRM NEW PASSWORD' type={showPassword ? 'text' : 'password'} name="newPasswordConfirm" id="newPasswordConfirm"/>
        </div>
        <div className={s.formGroup}>
          <button type='submit' disabled={submitting} className={s.submitBtn}>{submitting ? '...' : 'CHANGE PASSWORD'}</button>
        </div>
        <div className={s.formGroup}>
          <Link href='/customer/profile'>
            <button type='button' className={s.cancelBtn}>CANCEL</button>
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
      />
    </div>
  )
}