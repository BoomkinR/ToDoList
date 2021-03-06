import React, {useState , useEffect} from 'react'
import './comp.css'
import axios from 'axios'
import Cookies from 'js-cookie'


const UpdateModal =({active, setActive , task ,user, padavans}) => {


const [title, setTitle] = useState("")
const [responser, setResponser] = useState("")
const [descr, setDescr] = useState("")
const [date, setDate] = useState("")
const [priority, setPriority] = useState("")
const [status, setStatus] = useState("")
const csrftoken = Cookies.get('csrftoken')

function Load(){
if(title == ""){setTitle(task.Title); console.log("title")};
if(responser == ""){setResponser(task.Respons) ; console.log(responser)};
if(descr == ""){setDescr(task.Description)};
if(date == ""){setDate(task.Date_end)};
if(priority == ""){setPriority(task.Priority)};
if(status == ""){setStatus(task.Status)};

console.log(title)
}
function Close(){
setTitle("");
setResponser("");
setDescr("");
setDate("");
setPriority("");
setStatus("");
setActive(false);
}

const authOptions = {
     method: 'POST',
     url: 'http://127.0.0.1:8000/api/redact/',
     headers: { 'X-CSRFToken': csrftoken },
     data: {"ID" : task.ID ,"Create" : "0" , "Title" : title, "Respons" : responser, "Description" : descr, "Date_end": date, "Priority": priority, "Status": status }
     }
function send(){
    Load()
    axios(authOptions).then((response) => {console.log(response)});
    setActive(false);
    }

if (active){
    return (
            <div className = {active ? "modal active" : "modal"}>
                <div className = {active ? "modal_content active" : "modal_content "}>
                    <p className = "modal_close" onClick= {() =>{Close()} }> X </p>

                        <div >
                <label className="words"> Title: </label>
                <br/>
                <input  type="text"
                  name="Title"
                  className = 'text_box'
                  placeholder="Title"
                  defaultValue = {task.Title}
                  onChange ={(e) => setTitle(e.target.value)}>
                  </input>
            </div>
            <div >
                <label className="words"> Date_end: </label>
                <br/>
                <input  type="date"
                  name="Date_end"
                  className = 'text_box'
                  defaultValue = {task.Date_end}
                  onChange ={(e) => setDate(e.target.value)}>
                  </input>
            </div>
            <div >
                <label className="words"> ??????????????????????????: </label>
                <br/>
                <select className = 'text_box'  name="Responser" defaultValue = {task.Respons}
                  onChange ={(e) => setResponser(e.target.value)}>
                    <option value= {user.ID}>{user.username}</option>
                    {padavans.map(c => (
                    <option value= {c.ID}>{c.username}</option>
                    ))}
                </select>
            </div>
            <div >
                <label className="words"> ??????????????????: </label>
                <br/>
                <select className = 'text_box'  name="Priority" defaultValue = {task.Priority}
                  onChange ={(e) => setPriority(e.target.value)}>
                    <option value= "H">??????????????</option>
                    <option value= "M">??????????????</option>
                    <option value= "L">????????????</option>

                </select>
            </div>
            <div >
                <label className="words"> ????????????: </label>
                <br/>
                <select className = 'text_box'  name="Status" defaultValue = {task.Status}
                  onChange ={(e) => setStatus(e.target.value)}>
                    <option value= "NS">???? ????????????</option>
                    <option value= "P">?? ????????????</option>
                    <option value= "D">??????????????????</option>
                    <option value= "C">????????????????</option>
                </select>
            </div>
             <div >
                <textarea className="text_box area" defaultValue ={task.Description}
                  onChange ={(e) => setDescr(e.target.value)}/>
            </div>


            <button className="login-btn" onClick={send} > ???????????????? </button>

                </div>
            </div>

);
}
return 0;
};
export default UpdateModal