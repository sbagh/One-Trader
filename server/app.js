import express from "express";
import { exec } from "child_process";
import cors from "cors";
import dotenv from "dotenv";
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

// start the ib gateway - ensure to download and install the gateway
app.get("/start-ib-gateway", (req, res) => {
   console.log("request to start IB Gateway");

   console.log("IBKR_GATEWAY_COMMAND", process.env.IBKR_GATEWAY_COMMAND);

   exec(
      `${process.env.IBKR_GATEWAY_PATH} root/conf.yaml`,
      (error, stdout, stderr) => {
         if (error) {
            console.error(`exec error: ${error}`);
            return res.status(500).send("Failed to start IB Gateway");
         }
         console.log(`stdout: ${stdout}`);
         console.error(`stderr: ${stderr}`);
         res.send("IB Gateway started");
      }
   );
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
