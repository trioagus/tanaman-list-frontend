import { Dashboard } from "../components/Dashboard";
import { Jenis } from "../components/Jenis";

export const JenisPage: React.FC = () => {
    return <Dashboard children={<Jenis/>}/>;
}