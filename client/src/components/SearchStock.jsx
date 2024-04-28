import React, { useState } from "react";
const searchStocksURL = "http://localhost:5100/searchStock";

const SearchStock = () => {
   const [symbol, setSymbol] = useState("");

   const searchStockSymbol = async () => {
      if (!symbol) {
         console.log("missing symbol");
         return;
      }

      try {
         const params = new URLSearchParams({ symbol: symbol });
         const response = await fetch(
            `${searchStocksURL}?&${params.toString()}`
         );

         if (!response.ok) {
            console.error("Failed to search stock: ", response.statusText);
            return;
         }

         const data = await response.json();
         console.log("Search Stock Data: ", data);
      } catch (error) {
         console.error(error);
      }
   };

   const handleChanges = (e) => {
      setSymbol(e.target.value);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      searchStockSymbol();
   };

   return (
      <form>
         <input
            type="text"
            placeholder="Enter Stock Symbol"
            value={symbol}
            onChange={handleChanges}
         />
         <button onClick={handleSubmit}>Search</button>
      </form>
   );
};

export default SearchStock;
