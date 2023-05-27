// import { AppLayouts } from ".";
import { AdminAuthGuard } from "../../auth/AuthGuard";
import useSettings from "../../hooks/useSettings";
import { MatxSuspense } from "../Common/MatxComponents"
import Layout from "./Layout/Layout";

const AppLayout = ({ children }) => {
    return (
        <MatxSuspense>
            <AdminAuthGuard>
                <Layout>
                    {children}
                </Layout>
            </AdminAuthGuard>
        </MatxSuspense>
    );

}

export default AppLayout