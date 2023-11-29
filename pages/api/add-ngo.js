import nc from 'next-connect';
import Ngo from '../../models/Ngo';
import db from '../../utils/db';

const handler = nc();

handler.post(async (req, res) => {
  await db.connect();
  const newNgo = new Ngo({
    name: req.body.name,
    city: req.body.city,
    targetDonation: req.body.targetDonation,
    collectedAmount: req.body.collectedAmount,
    livesImpacted: req.body.livesImpacted,
    noOfMembers: req.body.noOfMembers,
    sustainableDevelopmentGoals: req.body.sustainableDevelopmentGoals
  });
  const ngo = await newNgo.save();
  await db.disconnect();

  console.log("ngo",ngo)
  res.send({
    _id: ngo._id,
    name: ngo.name,
    city: ngo.city,
    targetDonation: ngo.targetDonation,
    collectedAmount: ngo.collectedAmount,
    livesImpacted: ngo.livesImpacted,
    noOfMembers: ngo.noOfMembers,
    sustainableDevelopmentGoals: ngo.sustainableDevelopmentGoals
  });
});

export default handler;
