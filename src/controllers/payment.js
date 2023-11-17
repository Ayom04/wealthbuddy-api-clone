const { serverError } = require("../constant/messages");
const { startPayment, completePayment } = require("../services/payment");
const models = require("../../models");
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
  const { user_id } = req.params;
  const { reference } = req.body;
  try {
    if (!reference) throw new Error("Please pass the refernce");

    const completeTransaction = await completePayment(reference);
    if (completeTransaction.data.data.status != "success") {
      res.status(400).json({
        status: false,
        message: "Invalid transaction reference",
      });
    }

    const amountInNaira = completeTransaction.data.data.amount / 100;

    await credit(amountInNaira, user_id);
    res.status(200).json({
      status: true,
      message: "Your Wallet has been funded successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: error.message || serverError,
    });
  }
};
const credit = async (amount, user_id) => {
  const wallet = await models.Wallets.findOne({
    where: { user_id: user_id },
  });
  console.log(wallet);
  let walletBalance = wallet.wallet_balance + amount;
  let investments = 0.3 * walletBalance;
  let savings = 0.01 * walletBalance;
  let net_asset = 10 * walletBalance;
  let returns = 0.01 * walletBalance;
  // wallet_balance: DataTypes.DOUBLE(10, 2),
  // returns: DataTypes.DOUBLE(10, 2),
  // savings: DataTypes.DOUBLE(10, 2),
  // net_asset: DataTypes.DOUBLE(10, 2),
  await models.Wallets.update(
    {
      wallet_balance: walletBalance,
      investments,
      savings,
      net_asset,
      returns,
    },
    {
      where: { user_id, wallet_id: wallet.wallet_id },
    }
  );
};
const getUserWallet = async (user_id) => {
  const walletDetails = await models.Wallets.findOne({
    where: { user_id: user_id },
    attrinutes: [
      "savings",
      "investments",
      "wallet_balance",
      "net_asset",
      "returns",
      "wallet_id",
    ],
  });
  console.log(walletDetails);
  return walletDetails;
};
module.exports = { startWalletFunding, completeWalletFunding };
