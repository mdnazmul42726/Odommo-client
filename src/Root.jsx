import { Link, NavLink, Outlet } from "react-router-dom";
import { CiLogin } from "react-icons/ci";
import { HiOutlineCurrencyBangladeshi } from "react-icons/hi";
import { IoMdNotifications } from "react-icons/io";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import Swal from "sweetalert2";
import { sendPasswordResetEmail, signOut } from "firebase/auth";
import { auth } from "./firebase.config";
import axios from "axios";

const Root = () => {
    const { user } = useContext(AuthContext);
    const [balance, setBalance] = useState(0)
    const [isAdmin, setIsAdmin] = useState(null)

    useEffect(() => {
        axios.get(`https://odommo-server.vercel.app/user?email=${user?.email}`).then(res => {

            setIsAdmin(res.data?.role);
            setBalance(res.data?.balance);
        }).catch(err => console.log(err))
    }, [user]);

    console.log(balance);

    function handleLogout() {
        Swal.fire({
            title: "Do you want to log out?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout!"
        }).then((result) => {
            if (result.isConfirmed) {

                signOut(auth).then(() => {
                    Swal.fire({
                        title: "Logout successful",
                        text: "Hope you come back again",
                        icon: "success"
                    });
                })
            }
        });
    }

    function handleSendPassResetEmail() {
        sendPasswordResetEmail(auth, user.email).then(() => {
            Swal.fire({
                icon: 'success',
                title: ' Reset Link Send to Your Inbox'
            })
        })
    }

    return (
        <div className="">
            <div className="lg:mx-10">
                {/* navbar */}
                <div className="navbar bg-base-100">
                    <div className="navbar-start">
                        {user && <div className="">
                            {!isAdmin && <div className="dropdown">
                                <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                                </div>
                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                    <div className="flex items-center gap-1 text-green-600 text-xl">
                                        <p className="font-mono">{balance}</p>
                                        <HiOutlineCurrencyBangladeshi />
                                    </div>
                                    <NavLink to={'/account-refill'} className={({ isActive }) => isActive ? 'my-2 text-red-600' : 'my-2'}>Account Refill</NavLink>
                                    <NavLink to={'/topup'} className={({ isActive }) => isActive ? 'text-red-600' : ''}>TopUp</NavLink>
                                </ul>
                            </div>}
                        </div>}
                        <Link className="w-full hidden md:flex" to={'/'}><h1 className=" text-2xl font-mono">Odommo <span className="text-red-500 ">TopUp</span></h1></Link>
                        <Link className="w-full md:hidden" to={'/'}><h1 className=" text-2xl font-mono">Odommo </h1></Link>
                    </div>
                    <div className="navbar-end">
                        {!user ? <NavLink to={'/login'} className='flex items-center'>Login <CiLogin className="text-2xl" /></NavLink> :
                            <div className="flex items-center gap-2">
                                {!isAdmin && <div className="hidden md:flex gap-4">
                                    <NavLink to={'/account-refill'} className={({ isActive }) => isActive ? 'font-semibold hover:underline text-red-600' : 'font-semibold hover:underline'}>Account Refill</NavLink>
                                    <NavLink to={'/topup'} className={({ isActive }) => isActive ? 'font-semibold hover:underline text-red-600' : 'font-semibold hover:underline'}> TopUp</NavLink>
                                </div>}
                                {!isAdmin && <div className="hidden md:flex items-center border gap-1 px-4 text-green-600">
                                    <p className="font-mono">{balance}</p>
                                    <HiOutlineCurrencyBangladeshi />
                                </div>}
                                {isAdmin && <NavLink to={'/notification'} className={({ isActive }) => isActive ? 'text-red-600' : ''}><IoMdNotifications className="text-2xl" /></NavLink>}
                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt="Profile Image" src={user.photoURL} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-72">
                                        <li className=" font-semibold">{user.displayName}</li>
                                        <li onClick={handleSendPassResetEmail}><a>Update Password</a></li>
                                        {isAdmin ? <li><Link to={'/payment-history'}>Payment History</Link></li> :
                                            <li><Link to={'/transaction-history'}>Transaction History</Link></li>}
                                        <li onClick={handleLogout}><a>Logout</a></li>
                                    </ul>
                                </div>
                            </div>}
                    </div>
                </div>
                <div className="">
                    <Outlet />
                </div>

            </div>
            <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-10">
                <aside>
                    <p className="font-semibold">Copyright © 2023 - All right reserved by odommo.com.bd</p>
                    <p className="font-mono">Developed by <a href="https://github.com/mdnazmul42726" target="_blank" rel='noreferrer' className="hover:underline">Sheikh Mohammad Nazmul H.</a></p>
                </aside>
            </footer>
        </div>

    );
};

export default Root;