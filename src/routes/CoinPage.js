import { useParams } from "react-router-dom";
import CoinDetails from "../components/coindetails/CoinDetails";

const CoinPage = () => {
    const params = useParams();
    return <CoinDetails id={params.id} />;
};

export default CoinPage;
