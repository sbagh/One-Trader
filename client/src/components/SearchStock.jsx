import React, { useState } from "react";

const searchStocksURL = "http://localhost:5100/searchStock";

const SearchStock = () => {
   const [symbol, setSymbol] = useState("");
   const [stockData, setStockData] = useState({});
   const [showDropdown, setShowDropdown] = useState(false);

   const searchStockSymbol = async () => {
      if (!symbol) {
         console.log("Missing symbol");
         return;
      }

      try {
         const params = new URLSearchParams({ symbol: symbol.toUpperCase() });
         const response = await fetch(
            `${searchStocksURL}?${params.toString()}`
         );

         if (!response.ok) {
            console.error("Failed to search stock: ", response.statusText);
            return;
         }

         const data = await response.json();
         setStockData(data);
         setShowDropdown(true);
         console.log("Search Stock Data: ", data);
      } catch (error) {
         console.error(error);
         setStockData({});
         setShowDropdown(false);
      }
   };

   const handleChanges = (e) => {
      setSymbol(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      searchStockSymbol();
   };

   const handleSelectStock = (name) => {
      setSymbol(name);
      setShowDropdown(false);
   };

   return (
      <div>
         <form onSubmit={handleSubmit}>
            <input
               type="text"
               placeholder="Enter Stock Symbol"
               value={symbol}
               onChange={handleChanges}
               onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
               onFocus={() => stockData[symbol] && setShowDropdown(true)}
            />
            {showDropdown && stockData[symbol] && (
               <ul
                  style={{
                     position: "absolute",
                     listStyleType: "none",
                     padding: 0,
                  }}
               >
                  {stockData[symbol].map((stock, index) => (
                     <li
                        key={index}
                        onClick={() => handleSelectStock(stock.name)}
                        style={{ cursor: "pointer", padding: "5px" }}
                     >
                        {stock.name}
                     </li>
                  ))}
               </ul>
            )}
            <button type="submit">Search</button>
         </form>
         {stockData[symbol] && stockData[symbol].length > 0 && (
            <div>
               <h3>Selected Stock:</h3>
               <p>{symbol}</p>
            </div>
         )}
      </div>
   );
};

export default SearchStock;
