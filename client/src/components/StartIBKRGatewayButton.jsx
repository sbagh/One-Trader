import React from "react";
const ibkrGatewayURL = "http://localhost:5100/start-ib-gateway";

const StartIBGatewayButton = () => {
   const startIBGateway = async () => {
      try {
         console.log("Starting IB Gateway");

         const response = await fetch(ibkrGatewayURL);
         const data = await response.json();

         if (!response.ok) {
            console.error("Failed to start IB Gateway: ", data.message);
            return;
         }

         console.log(data.message);

         if (data.success && data.url) {
            window.open(data.url, "_blank");
         }
      } catch (error) {
         console.error("Error starting IB Gateway: ", error);
      }
   };

   return <button onClick={startIBGateway}>Login to IB Gateway</button>;
};

export default StartIBGatewayButton;
