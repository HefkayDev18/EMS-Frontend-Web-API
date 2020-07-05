import { useState, useEffect } from "react"
import Router from "next/router";
import Layout from "./Layout";
import { useSelector } from "react-redux";


export default Component => {
  return (props) => {
    const user = useSelector(state => state.user.user);
    useEffect(() => {
      if(!user) Router.push('/')
    })
    return (
      <div>
        {user && <Component {...props} />}
      </div>
    )
  }
}