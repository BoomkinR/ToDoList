import React, {useState , useEffect} from 'react'
import './comp.css'
import axios from 'axios'
import Modal from './Modal'
import UpdateModal from './UpdateModal'
import Cookies from 'js-cookie'


export default function MainApp(props){



const csrftoken = Cookies.get('csrftoken')
const [user , setUser] = useState("user")
const [leader , setLeader] = useState("Leader")
const [tasks , setTasks] = useState([])
const [activetask, setActivetask] = useState([])
const [padavans, setPadavans] = useState([])
const [activemodal , setActivemodal] = useState(false)
const [activemodal_update , setActivemodal_update] = useState(false)



     useEffect( () => {axios({
     method: 'GET',
     url: 'http://127.0.0.1:8000/api/task/'
     }).then((response) => {setTasks(response.data)})});
     axios({
     method: 'GET',
     url: 'http://127.0.0.1:8000/api/getname/',
     headers: { 'X-CSRFToken': csrftoken },
     }).then((response) => {
        setUser(response.data);
        console.log(response.data);
        }).catch(function (error) {
        if (error.response) { window.location ="/"}})
     useEffect( () => {axios({
     method: 'GET',
     url: 'http://127.0.0.1:8000/api/padavan/'
     }).then((response) => {setPadavans(response.data)})} , [])


    function update(pk){
    axios({
     method: 'GET',
     url: 'http://127.0.0.1:8000/api/getdev/'+pk+'/tasks'
     }).then((response) => {setTasks(response.data)})
    }


    return (
    <body>

      <header>
          <div className = "hello_btn" > Hello {user.username} </div>
          <div className = "nav_btn"> Your leader is: {leader} </div>
          <div className = " nav_btn , nav_btn_color"> Register </div>
          <div className = " nav_btn , nav_btn_color"> Logout </div>
      </header>
      <main>
            <div>
                <table className = "bone">
                    <tbody>
                        <tr className="first_tr"><th>Заголовок</th><th>Дата создания</th><th>Срок</th><th>Приоритет</th><th>Статус</th></tr>
                            {tasks.map(c => (
                                <tr key = {c.ID} onClick = {() =>{setActivetask(c); setActivemodal_update(true)}}>
                                <td>{c.Title}</td><td>{c.Date_update.substr(0,10)} {c.Date_update.substr(11,5)}</td>
                                <td>{c.Date_end.substr(0,10)} {c.Date_end.substr(11,5)}</td><td>{c.Priority}</td><td>{c.Status}</td></tr>
                            ))}
                    </tbody>
                </table>
                <div className="right_box">
                    <button className = "add_button" onClick ={() => {setActivemodal(true)}} >ADD</button>
                </div>
            </div>
        <table className = "padavans">
                <tbody>
                    <tr><th>Список Падаванов </th></tr>
                    <tr onClick ={() =>{update(user.ID)}} ><td >My tasks</td></tr>
                    {padavans.map (c => (
                    <tr key = {c.ID} onClick ={() =>{update(c.ID)}} ><td >{c.username} - {c.first_name} - {c.last_name}</td></tr>
                    )) }
                </tbody>
        </table>

        </main>



        <UpdateModal active = {activemodal_update} setActive = {setActivemodal_update} user = {user} task = {activetask} padavans = {padavans}/>
        <Modal active ={activemodal} setActive = {setActivemodal} user = {user} tasks={tasks} padavans ={padavans}/>
      </body>

    )
  }

