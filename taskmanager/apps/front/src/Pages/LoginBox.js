import React, {useState} from 'react'
import './comp.css'
import axios from 'axios'
import Cookies from 'js-cookie'


export default function LoginBox(props){



    const csrftoken = Cookies.get('csrftoken')
    const [login, setLogin] = useState()
    const [password , setPassword] = useState()
    const [flag , setFlag] = useState()
    const authOptions = {
     method: 'POST',
     headers: { 'X-CSRFToken': csrftoken },
     url: 'http://127.0.0.1:8000/api/autorization/',
     data: { "login" : login , "password" : password }
     }
    const mouseClickHandler = () => {
    axios(authOptions).then((response) => {
        if (response.data ==="welldone"){
         window.location = "mainapp/"
        }

        setFlag(response.data)
        })
    }


    return(
            <body>
            <div className = 'center_box'>
        <div>
            <h1 className = 'words'> LOGIN </h1>
        </div>
        <div className = 'elem'>
            <label className="words">Login</label>
            <input
              type="text"
              name="username"
              className = 'text_box'
              placeholder="Username"
              onChange = {(e) => setLogin(e.target.value)}
             />
          </div>
          <div className = 'elem'>
            <label className="words">Password</label>
            <input
              type="text"
              name="password"
              className = 'text_box , passwd'
              placeholder="Password"
              onChange = {(e) => setPassword(e.target.value)}
             />
          </div>
          <button
            type="button"
            className="login-btn"
            onClick = {mouseClickHandler}>Login
           </button>
           <label className = 'error_label' >       {flag}</label>
             </div>

        </body>



    )

}