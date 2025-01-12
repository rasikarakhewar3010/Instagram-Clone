import React, { useState } from "react";
import '../Login.css'
import '../Signup.css'
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";

const Signup = () => {
  const [input, setInput] = useState({
    username:'',
    email:'',
    password:''
  });

  const [loading , setLoading]= useState(false);
  const navigate= useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  

  const signupHandler = async (e) =>{
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/register', input ,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message);
        setInput({
          username:'',
          email:'',
          password:''
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally{
      setLoading(false);
    }
  }

  return (
    <>
      <div className="flex items-center w-screen h-screen justify-center">
        <div className="content-box">
          <div className="box1">
            <div className="to-center">
              <div className="login-form signup-form">
                <div className="logo">Instagram Clone</div>
                <div className="facebook-login">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                    alt="Facebook"
                  />
                  <a href="#">
                    <span> Log in with Facebook</span>
                  </a>
                </div>
                <div className="separator">OR</div>
                <form onSubmit={signupHandler} method="post">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Username"
                    value={input.username}
                    onChange={changeEventHandler}
                    className="focus:outline-none focus:ring-0 focus:border-transparent"
                  />
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    value={input.email}
                    onChange={changeEventHandler}
                    className="focus:outline-none focus:ring-0 focus:border-transparent"
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={input.password}
                    onChange={changeEventHandler}
                    className="focus:outline-none focus:ring-0 focus:border-transparent"
                  />
                  {
                    loading ? (
                      <Button>
                        <Loader2 className="mr-2 h-4 w-3 w-4 animate-spin"/>
                        Please wait
                      </Button>
                    ) : (
                      <button type="submit">Signup</button>
                    )
                  }
                </form>
              </div>
            </div>
          </div>

          <div className="box2">
            <div className="box2-content">
              <p>
                Have an account?
                <a href="/login">
                  <span style={{ color: "#0095f6" }}> <a href="/login">Login</a></span>
                </a>
              </p>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default Signup;
