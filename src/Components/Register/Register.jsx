import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';


export default function Register() {

  //user object
  let [user, setUser] = useState({
    first_name : "",
    last_name :"",
    age : "",
    email : "",
    password : ""
  })

  // err message from back-end
  let [err, setErr] = useState('')

  // err message from front-end joi
  let [joiErr, setJoyErr] = useState([])

  // loading when register click
  let [loading, setLoading] = useState(false);


  // get user information from form ========> function number 1
  function getDataForm (e) {
    let myUser = {...user}
    myUser[e.target.name] = e.target.value;
    setUser(myUser)
  }

  // make a copy from useNavigate
  const navigate = useNavigate()

  // go to login function
  function goToLogin () {
    let path = '/login';
    navigate(path)
  }

  //submit (send) data  ========> function number 2
  async function submitFormData (e) {
    e.preventDefault();
    setLoading(true)
    let validationResult = validateForm();
    if(validationResult.error){
      setJoyErr(validationResult.error.details); // set err message from joy
      setLoading(false)
    }
    else{
      setJoyErr([])
      let {data} = await axios.post(`https://routeegypt.herokuapp.com/signup`, user);
      if(data.message === 'success'){
        alert("your register succesd you can login now")
        setErr('') // empty err from back-end
        setLoading(false)
        goToLogin(); // =====> go to login page
      }
      else{
        setErr(data.message) // set err from back-end
        setLoading(false)
      }
    }
  }

  //validate form  ========> function number 3
  function validateForm () {
    const schema = Joi.object({
      first_name : Joi.string().alphanum().required().min(3).max(10),
      last_name : Joi.string().alphanum().required().min(3).max(10),
      age : Joi.number().required().min(20).max(75),
      email : Joi.string().required().email({tlds : {allow : ['com', 'net', 'org']}}),
      password : Joi.string().required().pattern(new RegExp("^[a-z][0-9]{3}$"))
    })
    return schema.validate(user,{abortEarly : false}); // =====> show or hide all err from validation
  }


  return (
    <div className='my-5'>
      <form onSubmit={submitFormData}>
        <h2 className='text-capitalize w-75 mx-auto mt-5 mb-4 fw-bold'>registration form</h2>
        {/* show or hide err from back-end at dom */}
        {err ? <div className="alert alert-danger w-75 mx-auto p-1">{err}</div> : ""}
        {/* show or hide joy err message */}
        {joiErr.length ?  joiErr.map((err,index) => <div key={index} className="alert alert-danger w-75 mx-auto p-1">{err.message}</div>) : ""}
        <div className='inputGroup w-75 mx-auto mb-3'>
          <label className='d-block mb-2' htmlFor='first_name'>First Name :</label>
          <input onChange={getDataForm} type="text" name="first_name" className='form-control' id='first_name'/>
        </div>
        <div className='inputGroup w-75 mx-auto mb-3'>
          <label className='d-block mb-2' htmlFor='last_name'>Last Name :</label>
          <input onChange={getDataForm} type="text" name="last_name" className='form-control' id='last_name'/>
        </div>
        <div className='inputGroup w-75 mx-auto mb-3'>
          <label className='d-block mb-2' htmlFor='age'>Age :</label>
          <input onChange={getDataForm} type="number" name="age" className='form-control' id='age'/>
        </div>
        <div className='inputGroup w-75 mx-auto mb-3'>
          <label className='d-block mb-2' htmlFor='email'>Email :</label>
          <input onChange={getDataForm} type="email" name="email" className='form-control' id='email'/>
        </div>
        <div className='inputGroup w-75 mx-auto mb-3'>
          <label className='d-block mb-2' htmlFor='Password'>Password :</label>
          <input onChange={getDataForm} type="password" name="password" className='form-control' id='Password'/>
        </div>
        <div className='inputGroup w-75 mx-auto mb-3'>
        {/* show or hide loading spinner */}
          <button className='btn btn-info float-end text-dark' type='submit'>{loading ? <i className="fa-solid fa-spinner fa-spin"></i> : "Register"}</button>
          <div className="clearfix"></div>
        </div>
      </form>
    </div>
  )
}
