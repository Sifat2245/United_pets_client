import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { use, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { Button } from "@/components/ui/button";
import { AuthContext } from "../../context/AuthContext";

const CheckoutForm = ({ amount, donationId, petName, petImage, petCategory, onSuccess }) => {
  const stripe = useStripe();
  const { user } = use(AuthContext);
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (amount > 0 && !clientSecret) {
      axiosSecure.post("/create-payment-intent", { amount }).then((res) => {
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [amount, clientSecret]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: paymentMethod.id,
      });

    if (confirmError) {
      setError(confirmError.message);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setSuccess("Payment Successful!");

      if (paymentIntent.status === "succeeded") {
        await axiosSecure.patch(`/donate/${donationId}`, {
          amount,
          email: user?.email,
        });
      }

      await axiosSecure.post("/user-donation", {
        userEmail: user?.email,
        amount,
        donationId,
        petName,
        petImage,
        petCategory,
        date: new Date(),
      });

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
          window.location.reload();
        }
      }, 1000);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border border-gray-300 rounded-md p-3 bg-gray-50">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#333",
                "::placeholder": {
                  color: "#a0aec0",
                },
              },
              invalid: {
                color: "#e53e3e",
              },
            },
          }}
        />
      </div>
      <Button
        type="submit"
        className="bg-pink-600 hover:bg-pink-700 text-white"
      >
        Donate {amount} ৳
      </Button>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
    </form>
  );
};

export default CheckoutForm;
