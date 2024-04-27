import axios from "axios";
import https from "https";
import { IBKR_BASE_URL } from "../config.js";

export { getPortfolioAccounts, getAccountProfitLoss };

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

// getPortfolioAccounts().then((data) => console.log(data));

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
