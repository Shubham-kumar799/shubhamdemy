const User = require('../models/user');
const stripe = require('stripe')(process.env.STRIPE_SECRET);
const queryString = require('query-string');

const makeInstructor = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    //creating stripe account id
    if (!user.stripe_account_id) {
      const account = await stripe.accounts.create({ type: 'express' });
      console.log('account =>', account.id);
      user.stripe_account_id = account.id;
      await user.save();
    }

    //creating account link based on account id to complete onboarding
    let accountLink = await stripe.accountLinks.create({
      account: user.stripe_account_id,
      refresh_url: process.env.STRIPE_REDIRECT_URL,
      return_url: process.env.STRIPE_REDIRECT_URL,
      type: 'account-onboarding',
    });

    console.log('accountLink', accountLink);
    //prefilling an info such as email for the user
    accountLink = Object.assign(accountLink, {
      'stripe_user[email]': user.email,
    });

    //sending account link to frontend
    res.send(`${accountLink.url}?${queryString.stringify(accountLink)}`);
  } catch (err) {
    console.log('make instructor error', err);
    res.status(401).json({ message: 'Error. Try Again!' });
  }
};

const getAccountStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const account = await stripe.accounts.retrieve(usre.stripe_account_id);

    if (!account.charges_enabled) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const statusUpdated = await User.findByIdAndUpdate(
      user._id,
      {
        stripe_seller: account,
        $addToSet: { role: 'Instructor' },
      },
      { new: true }
    ).select('-password');

    res.json(statusUpdated);
  } catch (err) {
    console.log('error getting accouont status', err);
    res.status(401).json({ message: 'Error. Try Again!' });
  }
};

module.exports = {
  makeInstructor,
  getAccountStatus,
};
