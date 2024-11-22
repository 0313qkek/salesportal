import React from 'react';
import FullCalendar from '@fullcalendar/react'; // Main FullCalendar component
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin for Month/Week/Day views
import timeGridPlugin from '@fullcalendar/timegrid'; // Plugin for time-based views
import listPlugin from '@fullcalendar/list'; // Plugin for list view
import './CalendarView.css'; // Custom styles if needed

const CalendarView = ({ events }) => {
  const formattedEvents = events.map(event => ({
    title: event.title,
    start: event.start,
    end: event.end,
    location: event.location,
    description: event.description,
  }));

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, listPlugin]} // Add plugins here
        initialView="dayGridMonth" // Set the default view
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
        }} // Customize header
        events={formattedEvents} // Pass events
        eventContent={(eventInfo) => (
          <div>
            <b>{eventInfo.event.title}</b>
            <p>{eventInfo.event.extendedProps.location}</p>
          </div>
        )} // Customize event display
        height="auto" // Adjust height
      />
    </div>
  );
};

export default CalendarView;