import AdminDashboard from "@/components/dashboard/admin";
import RegularDashboard from "@/components/dashboard/regular";
import { useUser } from "@/contexts/user";


export default function MyAccountPage() {
    const { isAdmin } = useUser();

    return (
        <div className="h-full w-full bg-secondary p-4 overflow-y-scroll">
            {isAdmin ? <AdminDashboard /> : <RegularDashboard />}
        </div>
    );
}