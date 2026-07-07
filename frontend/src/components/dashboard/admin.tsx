import UserDetailsCard from "../user/details-card";
import PotholeUpdateCard from "../pothole/update-card";
import DeleteByIdCard from "../delete-card";
import { deletePothole } from "@/services/potholes";
import { adminUserDelete } from "@/services/user";


export default function AdminDashboard() {
    return (
        <>
            <div className="space-y-6">
                <UserDetailsCard />

                <div className="grid gap-4 md:grid-cols-2">
                    <PotholeUpdateCard showPotholeIdInput={true} />

                    <div className="space-y-4">
                        <DeleteByIdCard
                            title={"Delete Pothole"}
                            inputPlaceHolder={"Search pothole ID"}
                            onDeleteByNumericId={deletePothole}
                        />

                        <DeleteByIdCard
                            title={"Delete User"}
                            inputPlaceHolder={"Search user ID"}
                            onDeleteByStringId={adminUserDelete}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}