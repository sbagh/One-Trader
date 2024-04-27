import axios from "axios";
import https from "https";
import { IBKR_BASE_URL } from "../config.js";

export { getPortfolioAccounts, getAccountProfitLoss, createOrder, searchStock };

// get portfolio account
const portfolio_accounts_url = `${IBKR_BASE_URL}/portfolio/accounts`;

const getPortfolioAccounts = async () => {
   try {
      const response = await axios.get(portfolio_accounts_url, {
         httpsAgent: new https.Agent({ rejectUnauthorized: false }), //  makes api calls to localhost
      });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
};

// account profit loss
const account_profit_loss_url = `${IBKR_BASE_URL}/iserver/account/pnl/partitioned`;

const getAccountProfitLoss = async () => {
   try {
      const response = await axios.get(account_profit_loss_url, {
         httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });
      console.log(response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
};

// create order
const createOrder = async (accountID, order) => {
   const create_order_url = `${IBKR_BASE_URL}/iserver/account/${accountID}/orders`;

   try {
      const response = await axios.post(create_order_url, order, {
         httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      console.log(response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
};

const searchStock = async (symbols) => {
   const search_stock_url = `${IBKR_BASE_URL}/trsrv/stocks?symbols=${symbols}`;

   try {
      const response = await axios.get(search_stock_url, {
         httpsAgent: new https.Agent({ rejectUnauthorized: false }),
      });

      console.log(response.data);
      return response.data;
   } catch (error) {
      console.error(error);
   }
};
