import { useFormik } from 'formik';
import * as Yup from 'yup';
import { LGA, removeFormat, formatPhone } from './Edit'
import { useSelector, useDispatch } from 'react-redux';
import { setGuest } from '../redux/user/user.actions';
import { CITIES } from '../deliveryAddress';

export default () => {
  const guest = useSelector(state => state.user.guest);
  const dispatch = useDispatch();
  const { firstName, lastName, email, address : { line1, line2, city_lga, state = 'Lagos', phone } } = guest;
  const formik = useFormik({
  initialValues : {
    firstName,
    lastName,
    email,
    phone : removeFormat(phone),
    line1,
    line2,
    city_lga,
    state
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
    .oneOf(CITIES,'Invalid City/LGA')
    .required('City/LGA is required'),
    state : Yup.string()
    .required('State is required')
  }),
  onSubmit : values => {
    let data = {...values};
    data.address = {
      line1 : values.line1,
      line2 : values.line2,
      city_lga : values.city_lga,
      state : values.state,
      phone : values.phone
    }
    data.address.phone = formatPhone(data.address.phone);
    delete data.line1;
    delete data.line2;
    delete data.city_lga;
    delete data.state;
    dispatch(setGuest(data));
  }
  })
  return (
    <div>
      <div>
        <div className='head bold'>
          <header>DELIVERY DETAILS</header>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className='formContainer flex'>
            <div>
              <div className="formGroup">
                <label htmlFor="firstName">First Name</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} id='firstName' name='firstName' type="text"/>
                {formik.touched.firstName && formik.errors.firstName ? (<p>{formik.errors.firstName}</p>) : null}
              </div>
              <div className='formGroup'>
                <label htmlFor="lastName">Last Name</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} id='lastName' name='lastName' type="text"/>
                {formik.touched.lastName && formik.errors.lastName ? (<p>{formik.errors.lastName}</p>) : null}
              </div>
              <div className='formGroup'>
                <label htmlFor="email">Email address</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} id='email' name='email' type="email"/>
                {formik.touched.email && formik.errors.email ? (<p>{formik.errors.email}</p>) : null}
              </div>
              <div className='formGroup'>
                <label htmlFor="phone">Phone</label>
                <span className='n234'>+234</span>
                <input className='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} id='phone' name='phone' type="tel"/>
                {formik.touched.phone && formik.errors.phone ? (<p>{formik.errors.phone}</p>) : null}
              </div>
            </div>
            <div>
              <div className='formGroup'>
                <label htmlFor="line1">Address Line 1</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.line1} id='line1' name='line1' type="text"/>
                {formik.touched.line1 && formik.errors.line1 ? (<p>{formik.errors.line1}</p>) : null}
              </div>
              <div className='formGroup'>
                <label htmlFor="line2">Address Line 2</label>
                <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.line2} id='line2' name='line2' type="text"/>
                {formik.touched.line2 && formik.errors.line2 ? (<p>{formik.errors.line2}</p>) : null}
              </div>
              <div className='formGroup'>
                <div className='flex flex-between'>
                  <div style={{width : '48%'}}>
                    <label htmlFor="city_lga">City/LGA</label>
                    <select onChange={formik.handleChange} onBlur={formik.handleBlur} name="city_lga" id="city_lga" value={formik.values.city_lga}>
                      <option value='' disabled>City/LGA</option>
                      {CITIES.map(lga => <option key={lga} value={lga}>{lga}</option>)}
                    </select>
                    {formik.touched.city_lga && formik.errors.city_lga ? (<p>{formik.errors.city_lga}</p>) : <p>{` `}</p>}
                  </div>
                  <div style={{width : '48%'}}>
                    <label htmlFor="state">State</label>
                    <select required onChange={formik.handleChange} onBlur={formik.handleBlur} name="state" id="state" defaultValue={formik.values.state}>
                      <option value="Lagos">Lagos</option>
                    </select>
                    {formik.touched.state && formik.errors.state ? (<p>{formik.errors.state}</p>) : <p>{` `}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button>USE THESE DETAILS</button>
          </div>
        </form>
      </div>
      <style jsx>{`
        form {
          color : #585858;
          padding : 15px;
        }
        .formContainer > div {
          padding : 12px;
          width : 50%
        }
        label {
          display : block;
          font-weight : bold;
          font-size : 13px;
          margin-bottom : 4px;
        }
        p {
          margin : 0;
          font-size : 11px;
          color : red
        }
        .head {
          border-bottom : 1px solid #d5d5d5;
          padding : 8px
        }
        .formGroup {
          margin-bottom : 8px;
        }
        input, select {
          padding : 6px;
          border : 1px solid #A7A7A7;
        }
        input{
          width : 100%;
          max-width : 300px;
        }
        input.phone {
          padding-left : 45px;
        }
        .n234 {
          margin-right: -38px;
          position: absolute;
          padding: 3px;
        }
        button {
          padding : 12px;
          background : var(--orange);
          color : white;
          margin-left : 12px
        }
        @media screen and (max-width : 500px) {
          .formContainer {
            flex-direction : column;
            
          }
          .formContainer > div {
            width : 100%
          }
          input {
            max-width : 100%;
            padding : 10px
          }
          .n234 {
            padding : 5px
          }
          button {
            margin : auto;
            display : block;
            padding : 15px
          }
        }
      `}</style>
    </div>
  )
}