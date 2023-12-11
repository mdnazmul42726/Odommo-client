import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import axios from "axios";
import Loading from "./components/Loding";
import { useQuery } from "@tanstack/react-query";

const AdminRoute = ({ children }) => {
    const { user, isLoading } = useContext(AuthContext);

    const { data = [], isPending} = useQuery({
        queryKey: ['admin'],
        queryFn: async () => {
            const response = await axios.get(`https://odommo-server.vercel.app/user?email=${user?.email}`);
            return response.data
        }
    })

    if (isLoading) {
        return <Loading />
    }

    if (isPending) {
        return <Loading />
    }

    if (!isLoading && user && data.role == 'admin') {
        return children
    }

    return <p className="flex justify-center items-center min-h-screen text-xl text-red-500 font-mono">Access Denied</p>
};

export default AdminRoute;