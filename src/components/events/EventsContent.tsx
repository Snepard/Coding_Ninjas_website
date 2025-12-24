"use client";

import { timeline } from "@/data/club";
import { EventsHero } from "./EventsHero";
import { StackedTimeline } from "./StackedTimeline";
import { EventStatistics } from "./EventStatistics";
import { EventGallery } from "./EventGallery";
import {
  UpcomingEventsTeaser,
  UpcomingEventCardData,
} from "./UpcomingEventsTeaser";

export const EventsContent = ({
  upcomingEvents,
}: {
  upcomingEvents: UpcomingEventCardData[];
}) => (
  <div className="space-y-16 sm:space-y-20 lg:space-y-24 pb-16 sm:pb-20 lg:pb-24">
    <EventsHero />
    <StackedTimeline items={timeline} />
    <EventStatistics />
    <EventGallery />
    <UpcomingEventsTeaser events={upcomingEvents} />
  </div>
);

export default EventsContent;
