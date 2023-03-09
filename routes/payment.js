var express = require("express");
var router = express.Router();
// var stripe = require("stripe")(
//   "sk_test_51Mg2eNSHhrTiTVl3euahjWj2IaXB6I9vBtpyPAJIdtay3C7s0vlU0l838QE58ic3puP7Wa43SYff4m4wm5jWOMP700xZ3YzC0O"
// );
var stripe = require("stripe")(
  "sk_test_51MWmBlSE06wirWhJ5O88a1NL0NECcl6GF8quhtjtrL2WoLfUi3VOIJ9sNGVpv1SFSwNKYpvnZJKgTrc9thSSLlDn004cgSqlm2"
);
var { v4: uuidv4 } = require("uuid");

/* GET home page. */
router.post("/payment", function (req, res, next) {
  const { product, token } = req.body;
  // console.log(token);

  const transactionKey = uuidv4();
  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges
        .create(
          {
            amount: product.price,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: product.name,
          }
          // { transactionKey }
        )
        .then((result) => res.status(200).json(result))
        .catch((err) => {
          console.log(err);
        });
    });
});

module.exports = router;
