import nc from 'next-connect';
import User from '../../models/User';
import db from '../../utils/db';

const handler = nc();

handler.put(async (req, res) => {
  await db.connect();
  const user = await User.findOne({ email: req.body.email });

  switch (req.body.selectedGoal)
{
   case "No Poverty":
    user.donation[0] = req.body.donationAmount;
    break;
   case "Zero Hunger":
    user.donation[1] = req.body.donationAmount;
    break;
   case "Good Health & Well Being":
    user.donation[2] = req.body.donationAmount;
    break;
   case "Quality Education":
    user.donation[3] = req.body.donationAmount;
    break;
   case "Gender Equality":
    user.donation[4] = req.body.donationAmount;
    break;
   case "Clean Water & Sanitation":
    user.donation[5] = req.body.donationAmount;
    break;
   case "Quality Education":
    user.donation[6] = req.body.donationAmount;
    break;
   case "Affordable & Clean Energy":
    user.donation[7] = req.body.donationAmount;
    break;
   case "Decent Work & Economic Growth":
    user.donation[8] = req.body.donationAmount;
    break;
   case "Reduced Inequalities":
    user.donation[9] = req.body.donationAmount;
    break;
   case "Climate Action":
    user.donation[10] = req.body.donationAmount;
    break;
   case "Life Before Water":
    user.donation[10] = req.body.donationAmount;
    break;
   case "Life on Land":
    user.donation[10] = req.body.donationAmount;
    break;

   default: 
       alert('Default case');
}
  await user.save();
  await db.disconnect();

  console.log(user)
  res.send({
    name: user.name,
    email: user.email,
    donation: user.donation,
  });
});

export default handler;
