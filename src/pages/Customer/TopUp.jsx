import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const TopUp = () => {
    document.title = 'Odommo | TopUp'
    const { user } = useContext(AuthContext);
    const [balance, setBalance] = useState(0)
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://odommo-server.vercel.app/user?email=${user?.email}`).then(res => setBalance(res.data.balance)).catch(err => console.log(err))
    }, [user?.email]);

    function handleTopUp(event) {
        event.preventDefault();
        const number = event.target.number.value;
        const amount = parseFloat(event.target.amount.value);

        if (amount < 20) {
            Swal.fire({
                icon: 'info',
                title: 'You cannot recharge less than TK 20'
            });
            return
        }

        if (amount > balance) {
            Swal.fire({
                title: 'Insufficient balance!',
                text: "Your account does not have enough balance.",
                icon: "info",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Refill Account"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/account-refill');
                }
            });
            return
        }

        axios.patch(`https://odommo-server.vercel.app/topup?email=${user.email}`, { balance: balance - amount }).then(res => {

            if (res.data.modifiedCount > 0) {

                const rechargeReqData = { name: user.displayName, email: user.email, number: number, amount: amount, type: 'Recharge', status: 'Processing' };

                axios.post('https://odommo-server.vercel.app/topupreq', rechargeReqData).then(res => {

                    if (res.data.insertedId) {
                        navigate('/')

                        setTimeout(() => window.location.reload(), 3000);

                        Swal.fire({
                            title: 'Your transaction has been successful',
                            icon: 'success'
                        });
                    }

                }).catch(err => console.log(err));
            }

        }).catch(err => console.log(err));

    }

    return (
        <div data-aos="fade-left" className="min-h-screen">
            <h1 className="text-3xl text-center my-7 md:my-10 lg:my-20 font-mono">Recharge Your Account</h1>
            <form className="max-w-sm mx-auto px-5 md:px-0" onSubmit={handleTopUp}>
                <div className="mb-5">
                    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Number</label>
                    <input type="number" id="email" name="number" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Ex: 09638XXXXXX" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                    <input type="number" id="password" name="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Recharge Amount" required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Proceed</button>
            </form>

        </div>
    );
};

export default TopUp;