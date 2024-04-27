import axios from "axios";
import https from "https";
import { IBKR_BASE_URL } from "../config.js";

export {
   getPortfolioAccounts,
   getAccountProfitLoss,
   createOrder,
   searchStocks,
};

// get portfolio account
const getPortfolioAccounts = async () => {
   const accountsURL = `${IBKR_BASE_URL}/portfolio/accounts`;

   try {
      const response = await axios.get(accountsURL, {
         httpsAgent: new https.Agent({ rejectUnauthorized: false }), //  makes api calls to localhost, todo: remove this line
      });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
};

// account profit loss
const getAccountProfitLoss = async () => {
   const profitLossURL = `${IBKR_BASE_URL}/iserver/account/pnl/partitioned`;

   try {
      const response = await axios.get(profitLossURL, {
         httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
};

// create order
const createOrder = async (accountID, orders) => {
   const createOrderURL = `${IBKR_BASE_URL}/iserver/account/${accountID}/orders`;

   console.log("orders", orders);

   try {
      const response = await axios.post(
         createOrderURL,
         { orders },
         {
            headers: { "Content-Type": "application/json" },
            httpsAgent: new https.Agent({ rejectUnauthorized: false }),
         }
      );

      console.log(response.data);

      return response.data;
   } catch (error) {
      console.error(error);
   }
};

const searchStocks = async (symbols) => {
   const searchStocksURL = `${IBKR_BASE_URL}/trsrv/stocks?symbols=${symbols}`;

   try {
      const response = await axios.get(searchStocksURL, {
         httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      console.log(response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
};
