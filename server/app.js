import express from "express";
import {
   getPortfolioAccounts,
   getAccountProfitLoss,
   createOrder,
   searchStock,
} from "./ibkr/controllers.js";

const app = express();
app.use(express.json());

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
      const data = await searchStock(req.query.symbols);
      res.json(data);
   } catch (error) {
      console.error(error);
   }
});

const PORT = process.env.PORT || 5100;
app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`);
});
