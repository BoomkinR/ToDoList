import React, {useState , useEffect} from 'react'
import './comp.css'
import axios from 'axios'
import Cookies from 'js-cookie'


const Modal =({active, setActive , user = null, tasks = null, padavans = null }) => {

const [title, setTitle] = useState("")
const [responser, setResponser] = useState("")
const [descr, setDescr] = useState("")
const [Date, setDate] = useState("")
const [priority, setPriority] = useState("")
const [status, setStatus] = useState("")
const csrftoken = Cookies.get('csrftoken')
const authOptions = {
     method: 'POST',
     url: 'http://127.0.0.1:8000/api/redact/',
     headers: { 'X-CSRFToken': csrftoken },
     data: {"Create" : "1" , "Title" : title, "Respons" : responser, "Description" : descr, "Date_end": Date, "Priority": priority, "Status": status }
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

function send(){
    axios(authOptions).then((response) => {console.log(response)});
    setActive(false);
    }

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
                              onChange ={(e) => setTitle(e.target.value)}>
                              </input>
                     </div>
                    <div >
                        <label className="words"> Date_end: </label>
                        <br/>
                        <input  type="date"
                          name="Date_end"
                          className = 'text_box'
                          onChange ={(e) => setDate(e.target.value)}>
                          </input>
                    </div>
                    <div >
                        <label className="words"> Ответственный: </label>
                        <br/>
                        <select className = 'text_box'  name="Responser" onChange ={(e) => setResponser(e.target.value)}
                        >
                            <option value="0" >-- select currency --</option>
                            <option value= {user.ID}>{user.username}</option>
                            {padavans.map(c => (
                            <option key ={c.ID} value= {c.ID}>{c.username}</option>
                            ))}
                        </select>
                    </div>
                    <div >
                        <label className="words"> Приоритет: </label>
                        <br/>
                        <select className = 'text_box'  name="Priority"  onChange ={(e) => setPriority(e.target.value)}>
                            <option value="0" >-- select currency --</option>
                            <option value= "H">Высокий</option>
                            <option value= "M">Средний</option>
                            <option value= "L">Низкий</option>

                        </select>
                    </div>
                    <div >
                        <label className="words"> Статус: </label>
                        <br/>
                        <select className = 'text_box'  name="Status" onChange ={(e) => setStatus(e.target.value)}>
                            <option value="0" >-- select currency --</option>
                            <option value= "NS">Не начато</option>
                            <option value= "P">В работе</option>
                            <option value= "D">Выполнено</option>
                            <option value= "C">Отменено</option>
                        </select>
                    </div>
                     <div >
                        <textarea className="text_box area" placeholder= {user.ID} onChange ={(e) => setDescr(e.target.value)}/>
                    </div>

                        <button className="login-btn" onClick={send}> Добавить </button>

                </div>
            </div>

)
};

export default Modal



