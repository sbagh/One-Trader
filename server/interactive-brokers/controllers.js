import axios from "axios";
import https from "https";
import { IBKR_BASE_URL } from "../config.js";
import { json } from "express";

export {
   getPortfolioAccounts,
   getAccountProfitLoss,
   createOrder,
   searchStock,
   confirmStatus,
   searchContract,
};

const confirmStatus = async () => {
   const confirmStatusURL = `${IBKR_BASE_URL}/iserver/auth/status`;

   try {
      const response = await axios.get(confirmStatusURL, {
         httpsAgent: new https.Agent({ rejectUnauthorized: false }), //  makes api calls to localhost, todo: remove this line
      });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
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

const searchStock = async (symbol) => {
   const searchStocksURL = `${IBKR_BASE_URL}/trsrv/stocks?symbols=${symbol}`;

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

const searchContract = async (queryParameters) => {
   const endpoint = "/iserver/secdef/search";

   try {
      const response = await axios.get(`${IBKR_BASE_URL}${endpoint}`, {
         params: queryParameters,
         httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      console.log(response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
};
