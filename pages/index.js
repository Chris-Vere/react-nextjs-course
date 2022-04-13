import { MongoClient } from 'mongodb';
import MeetupList from '../components/meetups/MeetupList';

const Homepage = (props) => {
  return <MeetupList meetups={props.meetups} />
}

export async function getStaticProps() {

  const client = await MongoClient.connect('mongodb+srv://drummer84:QoXkQLfjy7EqpeLW@cluster0.xvxjb.mongodb.net/reactCourseMeetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find().toArray();
  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default Homepage;
