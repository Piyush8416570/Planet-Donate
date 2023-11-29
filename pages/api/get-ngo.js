import nc from 'next-connect';
import Ngo from '../../models/Ngo';
import db from '../../utils/db';

const handler = nc();


handler.get(async (req, res) => {
  await db.connect();
  const ngo = await Ngo.find({});
  await db.disconnect();

  res.send(ngo);

});

export default handler;
