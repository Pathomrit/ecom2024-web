import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { payment } from "../../api/stripe";
import useEcomStore from "../../store/ecom-store";
import CheckoutForm from "../../components/CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51QXHtILLO6TZl2QkRvysuKzMKoXz2NCsEtuiiT09dcsP32ebNyRX1Jsb83HHknuRGFd2L6yeZ58CdgiBYJQArctL00IaOOQSEB"
);
const Payment = () => {
  const [clientSecret, setClientSecret] = useState("");
  const token = useEcomStore((state) => state.token);
  useEffect(() => {
    payment(token)
      .then((res) => {
        console.log(res);
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const appearance = {
    theme: "stripe",
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = "auto";
  return (
    <div>
      {clientSecret && (
        <Elements
          options={{ clientSecret, appearance, loader }}
          stripe={stripePromise}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Payment;
