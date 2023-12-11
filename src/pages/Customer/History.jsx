import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../AuthProvider";
import axios from "axios";
import NoData from "../../components/NoData";

const History = () => {
    document.title = 'Odommo | Transaction History'
    const { user } = useContext(AuthContext);
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get(`https://odommo-server.vercel.app/transaction-history?email=${user?.email}`).then(res => setData(res.data)).catch(err => console.log(err))
    }, [user?.email]);

    if (data.length < 1) {
        return <NoData />
    }

    return (
        <div className=" mb-10 w-full min-h-screen" data-aos="fade-left">
            <h1 className="text-3xl font-mono my-7 md:my-10 lg:my-20 text-center">Transaction History</h1>
            <div>
                <div className="overflow-x-auto">
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
                                <td className={item.status == 'Success' ? 'text-green-700' : item.status == 'Cancelled' ? 'text-red-600' : ''}>{item.status}</td>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default History;