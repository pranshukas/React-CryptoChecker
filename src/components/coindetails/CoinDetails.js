import { Fragment, useCallback } from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import styles from "./CoinDetails.module.css";

const CoinDetails = (props) => {
    const [coin, setCoin] = useState(null);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const id = props.id;
    const navigate = useNavigate();

    const fetchCoinData = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);
        const url = `https://api.coingecko.com/api/v3/coins/${id}`;
        const response = await Axios.get(url).catch((error) => {
            setIsError(true);
            setIsLoading(false);
        });
        if (response.status === 200) {
            const responseData = await response.data;
            if (responseData) {
                setCoin(responseData);
            } else {
                setIsError(true);
            }
        } else {
            setIsError(true);
        }
        setIsLoading(false);
    }, [id]);

    useEffect(() => {
        fetchCoinData();
    }, [fetchCoinData]);

    const buttonHandler = () => {
        navigate("/");
    };

    return (
        <div className={styles.container}>
            <div className={styles.coindetails}>
                {!isLoading && isError && <p>Sorry Data could not be Fetched : (</p>}
                {isLoading && <p>Loading ...</p>}
                {!isLoading && !isError && coin && (
                    <Fragment>
                        <h1>{coin.name}</h1>
                        <img src={coin.image.large} alt="Icon" className="coinPage-Icon" />
                        <div className={styles.coindata}>
                            <div className={styles.data}>
                                <div>Symbol: </div>
                                <div>{coin.symbol}</div>
                            </div>
                            <div className={styles.data}>
                                <div>Current Price</div>
                                <div>$ {coin.market_data.current_price.usd.toLocaleString()}</div>
                            </div>
                            <div className={styles.data}>
                                <div>Market Cap:</div>
                                <div>$ {coin.market_data.market_cap.usd.toLocaleString()}</div>
                            </div>
                            <div className={styles.data}>
                                <div>Total Volume:</div>
                                <div>$ {coin.market_data.total_volume.usd.toLocaleString()}</div>
                            </div>
                            <div className={styles.data}>
                                <div>24hr High: </div>
                                <div className={styles.green}>$ {coin.market_data.high_24h.usd.toLocaleString()}</div>
                            </div>
                            <div className={styles.data}>
                                <div>24hr Low: </div>
                                <div className={styles.red}>$ {coin.market_data.low_24h.usd.toLocaleString()}</div>
                            </div>
                        </div>
                        <button onClick={buttonHandler}>Go Back</button>
                    </Fragment>
                )}
            </div>
        </div>
    );
};

export default CoinDetails;
