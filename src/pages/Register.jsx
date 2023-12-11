import { useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaGoogle } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthProvider';
import axios from 'axios';
import { updateProfile } from 'firebase/auth';
import { auth } from '../firebase.config';

const Register = () => {
    document.title = 'Odommo | Register'
    const { signUpUserWithEmailAndPassword, signInWithGoogle } = useContext(AuthContext);
    const navigate = useNavigate()

    async function handleRegister(event) {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const conPassword = form.conPassword.value;
        const image = form.image.files[0];

        const toastID = toast.loading('working...')

        const formData = new FormData();
        formData.append('image', image);

        const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

        if (!regex.test(password)) {
            toast.error('Password must have minimum eight characters, at least one letter, one number and one special character', { id: toastID });
            return

        } else if (password !== conPassword) {
            toast.error('Password did not match!', { id: toastID });
            return
        }

        const response = await axios.post('https://api.imgbb.com/1/upload?key=774dde97e245310358495ba299851640', formData);

        if (response.status == 200) {
            signUpUserWithEmailAndPassword(email, password).then(() => {
                updateProfile(auth.currentUser, { displayName: name, photoURL: response.data.data.display_url });

                const userInfo = { name, email, balance: 0 }
                axios.post('https://odommo-server.vercel.app/user', userInfo).then(res => {

                    if (res.data.insertedId) {
                        toast.success('Account Created.', { id: toastID });
                        navigate('/')
                    }

                }).catch(err => console.log(err))

            }).catch(err => toast.error(err.code, { id: toastID }));
        }

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
        <div className='w-full md:w-[70%] lg:w-[35%] mx-auto mb-20 mt-10 md:mt-2 lg:mt-0 shadow-md rounded-md p-3' data-aos="zoom-out">
            <form className="card-body" onSubmit={handleRegister}>
                <h1 className="text-3xl font-bold">Register</h1>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="name" name='name' placeholder="Name" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" name='email' placeholder="Email" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" name='password' placeholder="Password" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Confirm Password</span>
                    </label>
                    <input type="password" name='conPassword' placeholder="Re-type Password" className="input input-bordered" required />
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Profile Picture</span>
                    </label>
                    <input type="file" name='image' required className="file-input file-input-bordered file-input-sm w-full " />
                </div>

                <div className="form-control mt-5">
                    <button className="btn bg-[#F34949] px-7 hover:bg-red-600 text-white rounded-md">Register</button>
                </div>
            </form>
            <h3 className='text-center'>Or Sign Up with</h3>
            <div className="flex justify-center gap-3 text-xl mt-3 mb-4">
                {/* <FaFacebook className='text-sky-700 cursor-pointer' /> */}
                {/* <FaGithub className='text-sky-800 cursor-pointer' /> */}
                {/* <FaGoogle className='text-red-600 cursor-pointer' /> */}
                <button className="btn w-1/2" onClick={handleGoogleLogin}>
                    <FaGoogle className='text-red-600 cursor-pointer ' />
                    Google
                </button>
            </div>
            <p className='mb-5 text-center'>Already have an account? <Link className='text-red-500 font-bold' to={"/login"}>Login</Link></p>
            <div><Toaster /></div>
        </div>
    );
};

export default Register;