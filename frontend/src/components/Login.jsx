import React, { useState } from "react";
import '../Login.css'
import axios from "axios";
import { toast } from "sonner";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    email:'',
    password:''
  });

  const [loading , setLoading]= useState(false);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  

  const signupHandler = async (e) =>{
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/login', input ,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials:true
      });
      if(res.data.success){
        navigate("/")
        toast.success(res.data.message);
        setInput({
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
                    name="email"
                    id="email"
                    placeholder="Enter email"
                    value={input.email}
                    onChange={changeEventHandler}
                  />
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={input.password}
                    onChange={changeEventHandler}
                  />
                  {
                    loading ? (
                      <Button>
                        <Loader2 className="mr-2 h-4 w-3 w-4 animate-spin"/>
                        Please wait
                      </Button>
                    ) : (
                      <button type="submit">Login</button>
                    )
                  }
                </form>
              </div>
            </div>
          </div>

          <div className="box2">
            <div className="box2-content">
              <p>
              Dont have an account? 
                <a href="/signup">
                  <span style={{ color: "#0095f6" }}>Sig up</span>
                </a>
              </p>
            </div>
          </div>

          
        </div>
      </div>
    </>
  );
};

export default Login;
