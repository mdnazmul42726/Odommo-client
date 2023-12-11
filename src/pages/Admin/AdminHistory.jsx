import axios from "axios";
import { useEffect, useState } from "react";
import NoData from "../../components/NoData";

const AdminHistory = () => {
    document.title = 'Odommo | Payments'
    const [data, setData] = useState([]);
    const totalPayment = data.reduce((acc, item) => acc + item.amount, 0);

    useEffect(() => {
        axios.get('https://odommo-server.vercel.app/admin-transaction-history').then(res => setData(res.data)).catch(err => console.log(err))
    }, []);

    if (data.length < 1) {
        return <NoData />
    }

    return (
        <div className="mb-20 min-h-screen" data-aos="fade-left">
            <h1 className="text-3xl text-center font-mono my-7 md:my-10 lg:my-20">Payment History</h1>
            <div className="">
                <div className="overflow-x-auto">
                    <p className="text-center md:text-left text-xl mb-10 font-semibold">Total Payment: TK {totalPayment}</p>

                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Number/Transaction ID</th>
                                <th>Amount</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => <tr key={item._id}>
                                <td>{item.type}</td>
                                <td>{item.number ? item.number : item.transactionID}</td>
                                <td>{item.amount}</td>
                                <td className="text-green-700">{item.status}</td>
                            </tr>)}

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminHistory;