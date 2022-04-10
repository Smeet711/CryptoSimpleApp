import { useEffect, useState } from "react";
import "./App.css";
import Axios from "axios";
import Coins from "./components/Coins";

function App() {
  const [listofCoins, setlistofCoins] = useState([]);
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    Axios.get(
      "https://api.coinstats.app/public/v1/coins?skip=0&limit=40000"
    ).then((response) => {
      setlistofCoins(response.data.coins);
    });
  }, []);

  const filteredCoins = listofCoins.filter((coin) => {
    return coin.name.toLowerCase().includes(searchWord.toLowerCase());
  });

  return (
    <div className="App">
      <div className="cryptoHeader">
        <input
          type="text"
          placeholder="Bitcoin..."
          onChange={(event) => {
            setSearchWord(event.target.value);
          }}
        />
      </div>
      <div className="cryptoDisplay">
        {filteredCoins.map((coin) => {
          return (
            <Coins
              name={coin.name}
              icon={coin.icon}
              price={coin.price}
              symbol={coin.symbol}
            />
          );
        })}
      </div>
    </div>
  );
}

export default App;
