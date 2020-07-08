import { useEffect } from "react"
import Router from "next/router";
import { useSelector } from "react-redux";


export default Component => {
  return (props) => {
    const isLoggedIn = useSelector(state => state.user.isLoggedIn);
    const isCheckingAuth = useSelector(state => state.user.isCheckingAuth);
    useEffect(() => {
      if(!isLoggedIn && !isCheckingAuth) Router.push('/login?redirected=true')
    }, [isCheckingAuth])
    return (
      <div>
        {isLoggedIn && <Component {...props} />}
      </div>
    )
  }
}