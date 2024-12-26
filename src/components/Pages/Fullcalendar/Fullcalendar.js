import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import azLocale from "@fullcalendar/core/locales/az";

const events = [
  { title: "Meeting", start: new Date() },
  {
    title: "Conference",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
  },
];

export function FullCalendarPage() {
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        locale="az"
        eventContent={renderEventContent}
      />
    </div>
  );
}

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  );
}
