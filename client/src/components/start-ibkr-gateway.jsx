import React from "react";
const backEndUrl = "http://localhost:5100";

const startIBGatewayButton = () => {
   const startIBGateway = async () => {
      try {
         console.log("Starting IB Gateway");

         const response = await fetch(`${backEndUrl}/start-ib-gateway`);

         if (response.ok) {
            console.log("failed to start IB Gateway");
            throw new Error("Failed to start IB Gateway", response.status);
         }

         const data = await response.text(); // response from script execution is plain text
         console.log(data);

         // redirect user to localhost:5000 for login (as per IBKR Gateway instructions)
         window.open("https://localhost:5000", "_blank");
      } catch (error) {
         console.error("Errro starting IB Gateway: ", error);
      }
   };

   return <button onClick={startIBGateway}>Login to IB Gateway</button>;
};

export default startIBGatewayButton;
