import { MongoClient, ObjectId } from 'mongodb';
import MeetupDetail from '../../components/meetups/MeetupDetail';

const MeetupDetails = (props) => {
  return <MeetupDetail {...props.meetupData } />;
}

export async function getStaticProps(context) {
  const { meetupId } = context.params;

  const client = await MongoClient.connect('mongodb+srv://drummer84:QoXkQLfjy7EqpeLW@cluster0.xvxjb.mongodb.net/reactCourseMeetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
    }
  }
}

export async function getStaticPaths() {
  const client = await MongoClient.connect('mongodb+srv://drummer84:QoXkQLfjy7EqpeLW@cluster0.xvxjb.mongodb.net/reactCourseMeetups?retryWrites=true&w=majority');
  const db = client.db();
  const meetupsCollection = db.collection('meetups');
  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  client.close();

  const pathsData = meetups.map((meetup) => ({
    params: { meetupId: meetup._id.toString() }
  }));

  return {
    fallback: 'blocking',
    paths: pathsData,
  }
}

export default MeetupDetails;
