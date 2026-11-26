import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const DashboardShell = ({

    children,

    userId,

}: {

    children: React.ReactNode;

    userId: number;
}) => {

    return (

        <div className="bg-zinc-100 dark:bg-zinc-950 min-h-screen transition-colors">

            <Sidebar />

            <div className=" p-4 md:p-6 transition-colors">

                <Topbar
                    userId={userId}
                />

                <div className="mt-6">
                    {children}
                </div>

            </div>

        </div>
    );
};

export default DashboardShell;