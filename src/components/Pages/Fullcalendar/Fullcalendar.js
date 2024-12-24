import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import azLocale from "@fullcalendar/core/locales/az";

const events = [
  { title: "Meeting", start: new Date() },
  {
    title: "Conference",
    start: new Date(new Date().setDate(new Date().getDate() + 1)),
  }, // Add more events if needed
];

export function FullCalendarPage() {
  return (
    <div>
      <h1>Calendar</h1>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        weekends={true} // Disable weekends, change as per requirement
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
