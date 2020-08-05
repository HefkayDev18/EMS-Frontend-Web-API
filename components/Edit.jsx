import { useSelector, useDispatch } from "react-redux";
import s from './css/form.module.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { updateUser } from "../redux/user/user.actions";
import { ToastContainer, toast, Flip } from 'react-toastify';
import { UPDATE_SUCCESS, UPDATE_ERROR } from "../redux/user/user.types";
import { useEffect } from 'react';
import Router from 'next/router';
import Link from 'next/link';

export const LGA = [
  "Agege",
  "Ajeromi-Ifelodun",
  "Alimosho",
  "Amuwo-Odofin",
  "Badagry",
  "Apapa",
  "Epe",
  "Eti Osa",
  "Ibeju-Lekki",
  "Ifako-Ijaiye",
  "Ikeja",
  "Ikorodu",
  "Kosofe",
  "Lagos Island",
  "Mushin",
  "Lagos Mainland",
  "Ojo",
  "Oshodi-Isolo",
  "Shomolu",
  "Surulere"
];

export const formatPhone = (phone) => {
  if(phone.startsWith('0')) {
    phone = '+234' + phone.substring(1);
  } else {
    phone = '+234' + phone;
  }
  return phone;
};
export const removeFormat = (phone) => !phone ? '' : phone.substring(4);

export default () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const isUpdating = useSelector(state => state.user.isUpdating);
  const updateError = useSelector(state => state.user.updateError);
  const updateSuccess = useSelector(state => state.user.updateSuccess);
  const { firstName, lastName, email, phone, address : { line1, line2, city_lga = '', state = 'Lagos', phone : deliveryPhone } } = user;
  useEffect(() => {
    if(updateSuccess) {
      toast.success('Update was successful');
      dispatch({type : UPDATE_SUCCESS, payload : ''})
      Router.push(Router.query.redirectTo  || '/customer/profile');
    }
  }, [updateSuccess])
  useEffect(() => {
    if(updateError) {
      toast.error(updateError)
      dispatch({type : UPDATE_ERROR, payload : ''})
    }
  }, [updateError])
  const formik = useFormik({
    initialValues : {
      firstName,
      lastName,
      email,
      phone : removeFormat(phone),
      line1,
      line2,
      city_lga : city_lga,
      state,
      deliveryPhone : removeFormat(deliveryPhone)
    },
    validationSchema : Yup.object({
      email : Yup.string()
      .trim()
      .email('Invalid email')
      .required('Email is required'),
      firstName : Yup.string()
      .trim()
      .required('First name is required'),
      phone : Yup.string()
      .trim()
      .min(10, 'Invalid phone')
      .max(11, 'Invalid phone')
      .notRequired(),
      deliveryPhone : Yup.string()
      .trim()
      .min(10, 'Invalid phone')
      .max(11, 'Invalid phone')
      .required('Phone is required'),
      lastName : Yup.string()
      .trim()
      .required('Last name is required'),
      line1 : Yup.string()
      .trim()
      .required('Line 1 is required'),
      line2 : Yup.string()
      .trim()
      .notRequired(),
      city_lga : Yup.string()
      .oneOf(LGA,'Invalid LGA')
      .required('LGA is required'),
      state : Yup.string()
      .required()
    }),
    onSubmit : values => {
      let v ={...values};
      v.deliveryPhone = formatPhone(v.deliveryPhone);
      if(v.phone) {
        v.phone = formatPhone(v.phone);
      }
      let { line1, line2, city_lga, state, deliveryPhone  } = v;
      let address = {
        line1,
        line2,
        city_lga,
        state,
        phone : deliveryPhone
      };
      v.address = address;
      if(JSON.stringify(user.address) === JSON.stringify(v.address)) {
        delete v.address;
      };
      if(v.firstName === user.firstName) delete v.firstName;
      if(v.lastName === user.lastName) delete v.lastName;
      if(v.phone === user.phone) delete v.phone;
      delete v.email;
      delete v.line1;
      delete v.line2;
      delete v.city_lga;
      delete v.state;
      delete v.deliveryPhone;
      if(Object.keys(v).length === 0) {
        toast.error('No changes made')
      } else {
        dispatch(updateUser(v, user._id));
      }
    }
  })
  return (
    <div className={s.formContainer}>
      <p className={s.formHead + ' bold'}>EDIT DETAILS</p>
      <form onSubmit={formik.handleSubmit}>
        {Router.query.redirectTo && <p>Please fill delivery details correctly before proceeding</p>}
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
          <input disabled onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} placeholder='EMAIL' id='email' name='email' type="email"/>
        </div>
        <div className={s.formGroup}>
          {formik.touched.phone && formik.errors.phone ? (<p>{formik.errors.phone}</p>) : null}
          <div className='flex flex-between'>
            <input type="text" disabled value='+234' className={s.n234}/>
            <input style={{width : '80%'}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} placeholder='PHONE NUMBER (optional)' id='phone' name='phone' type="tel"/>
          </div>
        </div>
        <div>
          <p>DELIVERY ADDRESS</p>
        </div>
        <div className={s.formGroup}>
          {formik.touched.line1 && formik.errors.line1 ? (<p>{formik.errors.line1}</p>) : null}
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.line1} placeholder='ADDRESS LINE 1' id='line1' name='line1' type="text"/>
        </div>
        <div className={s.formGroup}>
          {formik.touched.line2 && formik.errors.line2 ? (<p>{formik.errors.line2}</p>) : null}
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.line2} placeholder='ADDRESS LINE 2' id='line2' name='line2' type="text"/>
        </div>
        <div className={s.formGroup}>
          <div className='flex flex-between'>
            <div style={{width : '48%'}}>
              {formik.touched.city_lga && formik.errors.city_lga ? (<p>{formik.errors.city_lga}</p>) : <p>{` `}</p>}
              <select onChange={formik.handleChange} onBlur={formik.handleBlur} name="city_lga" id="city_lga" value={formik.values.city_lga}>
                <option value='' disabled>LGA</option>
                {LGA.map(lga => <option key={lga} value={lga}>{lga}</option>)}
              </select>
            </div>
            <div style={{width : '48%'}}>
              {formik.touched.state && formik.errors.state ? (<p>{formik.errors.state}</p>) : <p>{` `}</p>}
              <select onChange={formik.handleChange} onBlur={formik.handleBlur} name="state" id="state" defaultValue={formik.values.state}>
                <option value="Lagos">Lagos</option>
              </select>
            </div>
          </div>
        </div>
        <div className={s.formGroup}>
          {formik.touched.deliveryPhone && formik.errors.deliveryPhone ? (<p>{formik.errors.deliveryPhone}</p>) : null}
          <div className='flex flex-between'>
            <input type="text" disabled value='+234' className={s.n234}/>
            <input style={{width : '80%'}} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.deliveryPhone} placeholder='PHONE NUMBER' id='deliveryPhone' name='deliveryPhone' type="tel"/>
          </div>
        </div>
        <div className={s.formGroup}>
          <button type='submit' disabled={isUpdating} className={s.switchBtn}>{isUpdating ? '...' : 'UPDATE DETAILS'}</button>
        </div>
        <div className={s.formGroup}>
          <Link href={Router.query.redirectTo || '/customer/profile'}>
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
        transition={Flip}
      />
    </div>
  )
}