import { useContext } from 'react';
import bkash from '../../assets/payment-logo.6db2fe6f.png';
import { AuthContext } from '../../AuthProvider';
import axios from 'axios';
import Swal from 'sweetalert2';

const Refill = () => {
    document.title = 'Odommo | Refill Account'
    const { user } = useContext(AuthContext);

    function handleRefill(event) {
        event.preventDefault();
        const form = event.target;
        const transactionID = form.transactionID.value;
        const amount = parseFloat(form.amount.value);

        const refillReqData = { name: user.displayName, email: user.email, amount: amount, transactionID: transactionID, type: 'Refill', status: 'Processing' };

        axios.post('https://odommo-server.vercel.app/topupreq', refillReqData).then(res => {

            if (res.data.insertedId) {
                Swal.fire({
                    icon: 'success',
                    title: 'We have successfully received your request',
                    text: 'After verifying your payment, the balance will be added to your account as soon as possible'
                });
                form.reset()
            }

        }).catch(err => console.log(err));
    }

    return (
        <div className='my-10' data-aos="fade-left">
            <h1 className="text-center text-3xl my-7 md:my-10 lg:mt-20 font-mono">Refill Your Account </h1>
            <div className="">
                <a href="https://shop.bkash.com/digital-service-bd01929777729/paymentlink/default-payment" target='_blank' rel='noreferrer'>
                    <div className="flex items-center justify-center mb-10 cursor-pointer">
                        <img src={bkash} alt="" className='w-40' />
                    </div>
                </a>
                <p className='text-center my-10'>Have you already paid?</p>
                <form className="max-w-sm mx-auto px-5 md:px-0" onSubmit={handleRefill}>
                    <div className="mb-5">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Transaction ID</label>
                        <input type="text" id="email" name="transactionID" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter bKash Transaction ID" required />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Amount</label>
                        <input type="number" id="password" name="amount" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Enter Payment Amount" required />
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Refill;