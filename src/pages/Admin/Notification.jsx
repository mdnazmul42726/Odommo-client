import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import NoData from "../../components/NoData";


const Notification = () => {
    document.title = 'Odommo | Notifications'
    const { data = [], refetch } = useQuery({
        queryKey: ['notification'],
        queryFn: async () => {
            const response = await axios.get('https://odommo-server.vercel.app/notification');
            return response.data
        }
    });

    function handleCheck(data) {

        if (data.type == 'Refill') {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Verified"
            }).then((result) => {
                if (result.isConfirmed) {

                    axios.patch(`https://odommo-server.vercel.app/refill/${data._id}?email=${data.email}`, { amount: data.amount }).then(res => {

                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Success!",
                                text: "Transaction is verified.",
                                icon: "success"
                            });
                            refetch()
                        }

                    }).catch(err => console.log(err));
                }
            });

        } else {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Yes, Success!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.patch(`https://odommo-server.vercel.app/top-up-success/${data._id}`).then(res => {

                        if (res.data.modifiedCount > 0) {
                            Swal.fire({
                                title: "Success!",
                                text: "Transaction Successful.",
                                icon: "success"
                            });
                            refetch()
                        }

                    }).catch(err => console.log(err));
                }
            });
        }
    }

    function handleCancelled(data) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Cancelled it!"
        }).then((result) => {
            if (result.isConfirmed) {


                axios.patch(`https://odommo-server.vercel.app/reqCancelled/${data._id}`).then(res => {

                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: "Cancelled!",
                            text: "Transaction is cancelled.",
                            icon: "success"
                        });
                        refetch()
                    }
                }).catch(err => console.log(err));
            }
        });
    }

    if (data.length < 1) {
        return <NoData />
    }

    return (
        <div data-aos="fade-left" className="min-h-screen">
            <h1 className="text-3xl text-center my-7 md:my-10 lg:my-20">Notifications</h1>
            <div className="">
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Number/Transaction ID</th>
                                <th>Amount</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map(item => <tr key={item._id}>
                                <td>{item.type}</td>
                                <td>{item.number ? item.number : item.transactionID}</td>
                                <td>{item.amount}</td>
                                <div className="flex text-xl">
                                    <td className="cursor-pointer" onClick={() => handleCheck(item)}><AiOutlineCheckCircle className="text-blue-500" /></td>
                                    <td className="cursor-pointer" onClick={() => handleCancelled(item)}><AiOutlineCloseCircle className="text-red-500 " /></td>
                                </div>
                            </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Notification;