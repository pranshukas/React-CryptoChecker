import React, { useEffect, useState } from "react";
import Axios from "axios";
import styles from "./Home.module.css";

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [coins, setCoins] = useState([]);
    // const [searchTerm, setSearchTerm] = useState("");

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
                        icon: responseData[key].image,
                        coinName: responseData[key].name,
                        coinSymbol: responseData[key].symbol,
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

    return (
        <div className={styles.container}>
            <div className={styles["header-container"]}>
                <h1>Welcome To Crypto Checker</h1>
                <div className={styles.search}>
                    <input placeholder="Search for a Coin" type="text" />
                    <img src="/images/refresh.png" alt="refresh button" onClick={refreshPage} />
                </div>
            </div>
            <div className={styles["coin-container"]}>
                {isLoading && <p>Loading...</p>}
                {!isLoading && isError && <p>Sorry, Unable Fetch Data</p>}
                {/* {!isLoading} */}
                
            </div>
        </div>
    );
};

export default HomePage;
