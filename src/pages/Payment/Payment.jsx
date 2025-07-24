import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_payment_key);

const Payment = ({
  amount,
  donationId,
  onSuccess,
  petName,
  petImage,
  PetCategory,
}) => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm
        amount={amount}
        donationId={donationId}
        onSuccess={onSuccess}
        petName={petName}
        petImage={petImage}
        PetCategory={PetCategory}
      />
    </Elements>
  );
};

export default Payment;
