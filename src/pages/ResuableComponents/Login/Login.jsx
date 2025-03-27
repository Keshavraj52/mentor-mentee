import React,{ useEffect, useState } from 'react';
import { emailValidator, passwordValidator } from '../../../components/regexValidator';
import {useNavigate} from "react-router-dom"
import { useAuth } from '../../../components/Context/AuthContext';
import { useRole } from '../../../components/Context/RoleContext';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { ApiConfig } from '../../../components/ApiConfig';

const Login = () => {
	const { setRole } = useRole();
	const navigate = useNavigate();
	const { dispatch } = useAuth();
	const [input, setInput] = useState({ email: '', password: '' });
	const [errorMessage, seterrorMessage] = useState('');
	const [successMessage, setsuccessMessage] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const handleChange = e => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const handleTogglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	  };

	useEffect(() => {
		if (localStorage.getItem('authenticated')) navigate("/");
		setInput({ email: '', password: '' });
	}, [navigate]);

	const formSubmitter = async(e) => {
		e.preventDefault();
		setsuccessMessage('');
		if (!emailValidator(input.email)) return seterrorMessage('Please enter valid email id');

		if (!passwordValidator(input.password))
			return seterrorMessage(
				'Password should have minimum 8 character with the combination of uppercase, lowercase, numbers and specialcharaters'
			);
		// setsuccessMessage('Successfully Validated');
		// if(input.email !== 'admin@a.com' || input.password !== 'Password@1') return seterrorMessage('Invalid email or password');

		// dispatch({ type: 'LOGIN' });
		// navigate("/");
		// localStorage.setItem('authenticated', true);
		// };
		try {
			const response = await fetch(ApiConfig.loginApi, {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
				username: input.email,
				password: input.password,
			  }),
			});
		
			if (response.ok) {
			  // Successful login
			  const data = await response.json();
			  dispatch({ type: 'LOGIN' });
			  localStorage.setItem('authenticated', true);
			  localStorage.setItem('userRole', data.role);
			  localStorage.setItem('id', data.id);
			  console.log("id to show :", data.id);
			  setRole(data.role);
			  window.location.reload();
			  navigate('/');
			  
			} else {
			  // Invalid credentials
			  seterrorMessage('Invalid email or password');
			}
		  } catch (error) {
			console.error('Error during login:', error);
			seterrorMessage('Something went wrong. Please try again.');
		  }
		};


	return (
		<div>
			<div className="limiter">
				<div className="container-login100" style={{ backgroundImage: 'url("images/bg-01.jpg")' }}>
					<div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
						<form className="login100-form validate-form" onSubmit={formSubmitter}>
							<span className="login100-form-title p-b-49">Login</span>
							{errorMessage.length > 0 && <div style={{ marginBottom: '10px', color: 'red' }}>{errorMessage}</div>}
							{successMessage.length > 0 && (
								<div style={{ marginBottom: '10px', color: 'green' }}>{successMessage}</div>
							)}
							<div className="wrap-input100 validate-input m-b-23" data-validate="email is required">
								<span className="label-input100">Email</span>
								<input
									className="input100"
									type="text"
									name="email"
									placeholder="Type your username"
									onChange={handleChange}
								/>
								<span className="focus-input100" data-symbol="" />
							</div>
							<div className="wrap-input100 validate-input" data-validate="Password is required">
								<span className="label-input100">Password</span>
								<span className="focus-input100" data-symbol="" />
								<div style={{ display: "flex" }}>
									<input
									className="input100"
									type={showPassword ? "text" : "password"}
									name="password"
									placeholder="Type your password"
									onChange={handleChange}
									/>
									<span
									onClick={handleTogglePasswordVisibility}
									style={{
										cursor: "pointer",
										display: "flex",
										alignItems: "center",
									}}
									>
									{showPassword ? <Visibility /> : <VisibilityOff />}
									</span>
								</div>
								</div>
							<div className="text-right p-t-8 p-b-31">
								<a href="/login">Forgot password?</a>
							</div>
							<div className="container-login100-form-btn">
								<div className="wrap-login100-form-btn">
									<div className="login100-form-bgbtn" />
									<button className="login100-form-btn">Login</button>
								</div>
							</div>
							{/* <div className="txt1 text-center p-t-54 p-b-20">
								<span>Or Sign Up Using</span>
							</div>
							<div className="flex-c-m">
								<a href="#" className="login100-social-item bg1">
									<i className="fa fa-facebook" />
								</a>
								<a href="#" className="login100-social-item bg2">
									<i className="fa fa-twitter" />
								</a>
								<a href="#" className="login100-social-item bg3">
									<i className="fa fa-google" />
								</a>
							</div> */}
							{/* <div className="flex-col-c p-t-155">
                <span className="txt1 p-b-17">Or Sign Up Using</span>
                <a href="#" className="txt2">
                  Sign Up
                </a>
              </div> */}
						</form>
					</div>
				</div>
			</div>
			<div id="dropDownSelect1" />
		</div>
	);
};

export default Login;