import { EventsContent } from "@/components/events/EventsContent";
import { connectDB } from "@/lib/mongodb";
import { UpcomingEvent } from "@/models/UpcomingEvent";

export const revalidate = 3600;

async function getUpcomingEvents() {
  await connectDB();
  const events = await UpcomingEvent.find({}).sort({ date: 1 }).lean();

  return events.map((event: any) => ({
    _id: event._id.toString(),
    name: event.name,
    description: event.description,
    date: event.date,
    location: event.location,
    poster: event.poster,
  }));
}

const EventsPage = async () => {
  const upcomingEvents = await getUpcomingEvents();
  return <EventsContent upcomingEvents={upcomingEvents} />;
};

export default EventsPage;
