import { useContext } from "react";
import { FaGoogle } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const Login = () => {
    document.title = 'Odommo TopUp | Login'
    const { loginInWithEmailAndPassword, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate()

    function handleLogin(event) {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        const toastID = toast.loading('working...')

        loginInWithEmailAndPassword(email, password).then(() => {
            toast.success('Login Successful', { id: toastID });
            navigate('/')
        }).catch(err => toast.error(err.code, { id: toastID }));

    }

    function handleGoogleLogin() {
        signInWithGoogle().then(user => {
            const userInfo = { name: user.user.displayName, email: user.user.email, balance: 0 };
            axios.post('https://odommo-server.vercel.app/user', userInfo).then(() => {
                navigate('/');
            }).catch(err => console.log(err));
        }).catch(err => console.log(err))
    }

    return (
        <div className="w-full md:w-[70%] lg:w-[35%] mx-auto mb-20 mt-10 md:mt-2 lg:mt-0 shadow-md p-5 rounded-md" data-aos="zoom-out" >
            <form className="card-body" onSubmit={handleLogin}>
                <h1 className="text-3xl font-bold">Login</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="password" className="input input-bordered" required />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                    </label>
                </div>
                <div className="form-control mt-2">
                    <button className="btn bg-[#F34949] px-7 hover:bg-red-600 text-white rounded-md">Login</button>
                </div>
            </form>
            <h3 className='text-center'>Or Sign in with</h3>
            <div className="flex justify-center gap-3 text-xl mt-3 mb-4">
                {/* <FaFacebook className='text-sky-700 cursor-pointer' /> */}
                {/* <FaGithub className='text-sky-800 cursor-pointer' /> */}
                <button className="btn w-1/2" onClick={handleGoogleLogin}>
                    <FaGoogle className='text-red-600 cursor-pointer ' />
                    Google
                </button>
            </div>
            <p className='mb-5 text-center'>Don`t have an account? <Link className='text-red-500 font-bold' to={"/register"}>Register</Link></p>
            <Toaster />
        </div >
    );
};

export default Login;