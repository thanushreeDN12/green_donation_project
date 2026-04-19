import React, { useState} from "react";
import { useNavigate ,useParams} from "react-router-dom";
import {useDispatch} from 'react-redux'
import {addProgramIdToUser} from '../actions/programs'
const Payment = () => {

    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState(null);
    const fixedAmount = 500; // Fixed amount in rupees
    const navigate= useNavigate()
    const dispatch= useDispatch()

    const user=  JSON.parse(localStorage.getItem("profile"));
    const userId = user?.result?._id ? user.result._id : user?.newUser?._id;
    //  console.log(userId)

    const { id} = useParams();
    const programId= id
    // console.log(programId)

    // HANDLES PAYMENT
  const handlePayment = () => {
    setIsProcessing(true);
    setPaymentStatus(null);

    // Simulate payment processing delay (2 seconds)
    setTimeout(() => {
      setIsProcessing(false);

      // Randomly decide success or failure (for simulation)
      if (Math.random() > 0.2) {
        setPaymentStatus("success");
      } else {
        setPaymentStatus("failed");
      }
    }, 2000);

    dispatch(addProgramIdToUser({userId, programId}))
    navigate('/userprofile')
  };

  return (
    <div style={{ maxWidth: 350, margin: "3rem auto", textAlign: "center", padding: "2rem", border: "1px solid #ddd", borderRadius: 8 }}>
      <h2>Dummy Payment</h2>
      <p>Amount to pay: ₹{fixedAmount}</p>

      <button
        onClick={handlePayment}
        disabled={isProcessing}
        style={{
          padding: "0.8rem 2rem",
          backgroundColor: isProcessing ? "#ccc" : "#38761d",
          color: "#fff",
          border: "none",
          borderRadius: 25,
          fontSize: "1.1rem",
          cursor: isProcessing ? "not-allowed" : "pointer",
        }}
      >
        {isProcessing ? "Processing..." : "Pay Now"}
      </button>

      {paymentStatus === "success" && <p style={{ color: "green", marginTop: "1rem" }}>Payment Successful! Thank you.</p>}
      {paymentStatus === "failed" && <p style={{ color: "red", marginTop: "1rem" }}>Payment Failed. Please try again.</p>}
    </div>
  );
};

export default Payment;
