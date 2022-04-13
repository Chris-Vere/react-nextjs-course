import { MongoClient } from 'mongodb';

const handler = async (req, res) =>  {
  if (req.method === 'POST') {
    const newMeetupData = req.body;

    const client = await MongoClient.connect('mongodb+srv://drummer84:QoXkQLfjy7EqpeLW@cluster0.xvxjb.mongodb.net/reactCourseMeetups?retryWrites=true&w=majority');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.insertOne(newMeetupData);
    console.log(result);

    client.close();

    res.status(201).json({
      message: 'meetup inserted'
    });
  }
}

export default handler;
