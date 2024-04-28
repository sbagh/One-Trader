import express from "express";
import shell from "shelljs";
import cors from "cors";
import dotenv from "dotenv";
import path from "path"; // Added import for path

dotenv.config();

const result = dotenv.config();
if (result.error) {
   throw result.error;
}
console.log(result.parsed); // This will log the parsed content of your .env file

import {
   getPortfolioAccounts,
   getAccountProfitLoss,
   createOrder,
   searchStocks,
} from "./ibkr/controllers.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5200" }));

// start the ib gateway - download and install the gateway before hand
app.get("/start-ib-gateway", (req, res) => {
   console.log("request to start IB Gateway");

   // change directory to the IBKR_GATEWAY_PATH and start the gateway
   shell.cd(process.env.IBKR_GATEWAY_PATH);
   shell.exec(
      "./bin/run.sh root/conf.yaml",
      { silent: false, async: true },
      (code, stdout, stderr) => {
         if (code !== 0) {
            console.error("exec error:", stderr);
            return res.status(500).json({
               success: false,
               message: "Failed to start IB Gateway",
            });
         }
         console.log("stdout: ", stdout);
      }
   );

   console.log("IB Gateway is starting...");
   res.json({
      success: true,
      message: "IB Gateway is starting",
      url: "https://localhost:5000",
   });
});

app.get("/getAccount", async (req, res) => {
   try {
      const data = await getPortfolioAccounts();
      res.json(data);
   } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching portfolio accounts");
   }
});

app.get("/getProfitLoss", async (req, res) => {
   try {
      const data = await getAccountProfitLoss();
      res.json(data);
   } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching profit and loss");
   }
});

app.post("/createOrder", async (req, res) => {
   //    console.log(req.body);
   try {
      const data = await createOrder(req.body.accountID, req.body.orders);
      res.json(data);
   } catch (error) {
      console.error(error);
      res.status(500).send("Error creating order");
   }
});

app.get("/searchStock", async (req, res) => {
   try {
      const data = await searchStocks(req.query.symbols);
      res.json(data);
   } catch (error) {
      console.error(error);
   }
});

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
