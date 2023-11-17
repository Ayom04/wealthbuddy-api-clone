const { startPayment, completePayment } = require("../services/payment");

const startWalletFunding = async (req, res) => {
  const { amount, email } = req.body;
  if (!amount || !email) {
    res.status(400).json({
      status: false,
      message: "Amount and email are required",
    });
    return;
  }

  const initialiseTransaction = await startPayment(amount, email);
  delete initialiseTransaction.data.data.access_code;
  res.status(200).json({
    status: true,
    message: "Transaction initialized successfully",
    data: initialiseTransaction.data.data,
  });
};

const completeWalletFunding = async (req, res) => {
  const { reference, user_id } = req.body;
  if (!reference || !user_id) {
    res.status(400).json({
      status: false,
      message: "All fields are required",
    });
    return;
  }
  const completeTransaction = await completePayment(reference);
  if (completeTransaction.data.data.status != "success") {
    res.status(400).json({
      status: false,
      message: "Invalid transaction reference",
    });
  }
  const amountInNaira = completeTransaction.data.data.amount / 100;
  const comments = `Wallet funding of ${amountInNaira} was successful`;
  credit(amountInNaira, user_id, comments);
  res.status(200).json({
    status: true,
    message: "Your Wallet has been funded successfully",
  });
};
module.exports = { startWalletFunding, completeWalletFunding };
