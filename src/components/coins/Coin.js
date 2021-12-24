import { useNavigate } from "react-router-dom";
import styles from "./Coin.module.css";

const Coin = (props) => {
    let navigate = useNavigate();

    const { icon, coinName, coinSymbol, price, marketCap, priceChange, id } = props;
    const priceChangeClass = `${styles["price-change"]} ${priceChange < 0 ? styles.red : styles.green}`;

    const coinDetailHandler = () => {
        navigate(`/CoinPage/${id}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.coin}>
                <img src={icon} alt="name" />
                <h1 className={styles.coinName}>{coinName}</h1>
                <p className={styles.coinSymbol}>{coinSymbol}</p>
                <p className={styles.coinPrice}>$ {price.toFixed(2)}</p>
                <p className={priceChangeClass}>{priceChange.toFixed(2)} %</p>
                <p className={styles.coinVolume}>$ {marketCap.toLocaleString()}</p>
                <button onClick={coinDetailHandler}>More Info</button>
            </div>
        </div>
    );
};

export default Coin;
