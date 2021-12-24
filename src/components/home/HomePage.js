import React, { useEffect, useRef, useState } from "react";
import Loader from "react-js-loader";
import Axios from "axios";
import styles from "./Home.module.css";
import Coin from "../coins/Coin";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [coins, setCoins] = useState([]);
    const searchRef = useRef();
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        refreshPage();
    }, []);

    const refreshPage = async () => {
        setIsLoading(true);
        setIsError(false);
        const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false";
        const response = await Axios.get(url).catch((error) => {
            setIsError(true);
            setIsLoading(false);
        });
        if (response.status === 200) {
            const responseData = await response.data;
            if (responseData) {
                let loadedCoins = [];
                for (const key in responseData) {
                    loadedCoins.push({
                        id: responseData[key].id,
                        image: responseData[key].image,
                        name: responseData[key].name,
                        symbol: responseData[key].symbol,
                        price: responseData[key].current_price,
                        marketCap: responseData[key].market_cap,
                        priceChange: responseData[key].price_change_percentage_24h,
                    });
                }
                setCoins(loadedCoins);
            } else {
                setIsError(true);
            }
        } else {
            setIsError(true);
        }
        setIsLoading(false);
    };

    const filteredCoins = coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const searchBarHandler = () => {
        setSearchTerm(searchRef.current.value);
    };

    return (
        <div className={styles.container}>
            <div className={styles["header-container"]}>
                <h1>Welcome To Crypto Checker</h1>
                <div className={styles.search}>
                    <input placeholder="Search for a Coin" type="text" ref={searchRef} onChange={searchBarHandler} />
                    <img src="/images/refresh.png" alt="refresh button" onClick={refreshPage} />
                </div>
            </div>
            <div className={styles["coin-container"]}>
                {isLoading && !isError && <Loader type="spinner-cub" bgColor={"#FFFFFF"} title={"Loading"} color={"#FFFFFF"} size={100} />}
                {!isLoading && isError && <div className={styles.error}>Sorry, Unable Fetch Data : (</div>}
                {!isLoading &&
                    !isError &&
                    filteredCoins.map((coin) => {
                        return (
                            <Coin
                                key={coin.id}
                                id={coin.id}
                                icon={coin.image}
                                coinName={coin.name}
                                coinSymbol={coin.symbol}
                                price={coin.price}
                                marketCap={coin.marketCap}
                                priceChange={coin.priceChange}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default HomePage;
