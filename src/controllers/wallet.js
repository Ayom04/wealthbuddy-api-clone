const models = require("../../models");
const { serverError } = require("../constant/messages");

const getWalletBallence = async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const wallet = await models.Wallets.findOne({
      where: { user_id: user_id },
      attributes: [
        "investments",
        "wallet_balance",
        "returns",
        "savings",
        "net_asset",
      ],
    });

    res.status(200).json({
      status: false,
      message: "Wallet balance fetched succesfully",
      data: wallet,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: false,
      message: error.message || serverError,
    });
  }
};

module.exports = {
  getWalletBallence,
};
