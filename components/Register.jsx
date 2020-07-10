import s from './css/form.module.css';
import Link from 'next/link';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import { registerUser } from '../redux/user/user.actions';

export default () => {
  const dispatch = useDispatch();
  const registerError = useSelector(state => state.user.registerError);
  const isLoggedIn = useSelector(state => state.user.isLoggedIn);
  const isRegistering = useSelector(state => state.user.isRegistering);
  useEffect(() => {
    if(isLoggedIn) {
      toast.success('Successful');
      setTimeout(() =>Router.push('/customer/profile'), 1500);
    }
  }, [isLoggedIn])
  useEffect(() => {
    if(registerError) {
      toast.error(registerError)
      dispatch({type : 'REGISTER_ERROR', payload : ''})
    }
  }, [registerError])
  const formik = useFormik({
    initialValues : {
      firstName : '',
      lastName : '',
      email : '',
      phone : '',
      password : '',
      passwordConfirm : '',
      accept : false
    },
    validationSchema : Yup.object({
      email : Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
      password : Yup.string()
      .trim()
      .min(6, 'Password must be 6 characters or more')
      .required('Password is required'),
      firstName : Yup.string()
      .trim()
      .required(),
      phone : Yup.string()
      .trim()
      .min(10, 'Invalid phone')
      .max(11, 'Invalid phone')
      .notRequired(),
      lastName : Yup.string()
      .trim()
      .required(),
      password : Yup.string()
      .trim()
      .min(7, 'Password should be more than 6 characters')
      .required(),
      passwordConfirm : Yup.string()
      .trim()
      .oneOf([Yup.ref('password'), null], 'Password do not match')
      .required(),
      accept : Yup.boolean()
      .oneOf([true], 'You must accept terms and conditions')
      .required()
    }),
    onSubmit : values => {
      dispatch(registerUser(values));
    }
  })
  return (
    <div className={s.formContainer}>
      <p className={s.formHead + ' bold'}>CREATE ACCOUNT</p>
      <form onSubmit={formik.handleSubmit}>
        <div className={s.formGroup}>
          {formik.touched.firstName && formik.errors.firstName ? (<p>{formik.errors.firstName}</p>) : null}
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} placeholder='FIRST NAME' id='firstName' name='firstName' type="text"/>
        </div>
        <div className={s.formGroup}>
          {formik.touched.lastName && formik.errors.lastName ? (<p>{formik.errors.lastName}</p>) : null}
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} placeholder='LAST NAME' id='lastName' name='lastName' type="text"/>
        </div>
        <div className={s.formGroup}>
          {formik.touched.email && formik.errors.email ? (<p>{formik.errors.email}</p>) : null}
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder='EMAIL' id='email' name='email' type="email"/>
        </div>
        <div className={s.formGroup}>
          {formik.touched.password && formik.errors.password ? (<p>{formik.errors.password}</p>) : null}
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} placeholder='PASSWORD' type='password' name="password" id="password"/>
        </div>
        <div className={s.formGroup}>
          {formik.touched.passwordConfirm && formik.errors.passwordConfirm ? (<p>{formik.errors.passwordConfirm}</p>) : null}
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.passwordConfirm} placeholder='CONFIRM PASSWORD' type='password' name="passwordConfirm" id="passwordConfirm"/>
        </div>
        <div className={s.formGroup}>
          {formik.touched.phone && formik.errors.phone ? (<p>{formik.errors.phone}</p>) : null}
          <div className='flex flex-between'>
            <input type="text" disabled value='+234' className={s.n234}/>
            <input style={{width : '80%'}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} placeholder='PHONE NUMBER (optional)' id='phone' name='phone' type="tel"/>
          </div>
        </div>
        <div className={s.formGroup}>
        {formik.touched.accept && formik.errors.accept ? (<p>{formik.errors.accept}</p>) : null}
          <div>
            <input value={formik.values.accept} onChange={formik.handleChange} onBlur={formik.handleBlur}  type="checkbox" name="accept" id="accept"/><label htmlFor="accept">I agree to the <Link href=""><a >Terms and Conditions</a></Link></label>
          </div>
        </div>
        <div className={s.formGroup}>
          <button type='submit' disabled={isRegistering} className={s.switchBtn}>{isRegistering ? '...' : 'CREATE ACCOUNT'}</button>
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
        transition={Bounce}
      />
    </div>
  )
}