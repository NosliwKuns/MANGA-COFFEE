import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import App from "./App";
import "./index.scss";
import store from "./app/store";
import { Provider } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51LLrJiAaJyGKFRYY6WmARQSI9WRDaPHlY69Q4twlZjsE8LDddxwBLkn0bWnCDxnwkzjllAbb81j03ilisus47QVp00HsHu4iM4"
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    </Elements>
  </React.StrictMode>
);
