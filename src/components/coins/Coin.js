import styles from "./Coin.module.css";

const Coin = (props) => {
    const { icon, coinName, coinSymbol, price, marketCap, priceChange, id } = props;
    const priceChangeClass = `${styles["price-change"]} ${priceChange < 0 ? styles.red : styles.green}`;
    return (
        <div className={styles.container}>
            <div className={styles.coin}>
                <img src={icon} alt="name" />
                <h1 className="coinName">{coinName}</h1>
                <p className="coinSymbol">{coinSymbol}</p>
                <p className="coinPrice">$ {price.toFixed(2)}</p>
                <p className={priceChangeClass}>{priceChange.toFixed(2)} %</p>
                <p className="coinVolume">$ {marketCap.toLocaleString()}</p>
                <button>More Info</button>
            </div>
        </div>
    );
};

export default Coin;
