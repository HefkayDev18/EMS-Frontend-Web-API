import { useState, useMemo } from "react"
import Layout from "../components/Layout";

export default () => {
  const [cred, setCred] = useState({ user : 'olamideaboyeji@gmail.com', password : 'olamide' });
  const [user, setUser] = useState({});
  const onSubmit = (e) => {
    e.preventDefault();
    fetch('http://127.0.0.1:3001/login', {
      method : 'POST',
      credentials :'include',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify(cred)
    })
    .then(res => res.json())
    .then(data => setUser(data))
  }
  return(
    <Layout>
      <div style={{height : '60vh'}} className='flex-center flex-column'>
        <h1>No Login Page yet</h1>
        <form onSubmit={onSubmit}>
          <input placeholder='Password' onChange={(e) => setCred({...cred, password : e.target.value})} type="password"/><input placeholder='Username' onChange={(e) => setCred({...cred, user : e.target.value})} type="text"/>
          <button>SUBMIT</button>
        </form>
        <p>{JSON.stringify(user)}</p>
      </div>
    </Layout>
  )
}