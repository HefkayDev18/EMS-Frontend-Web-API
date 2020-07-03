import { useState, useEffect } from "react"
import Router from "next/router"

const isAuth = 'ola';

export default Component => {
  return (props) => {
    useEffect(() => {
      if(!isAuth) Router.push('/login')
    })
    return (
      <div>
        {isAuth && <Component {...props} name={me} />}
      </div>
    )
  }
}