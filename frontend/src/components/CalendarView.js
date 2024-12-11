import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import './CalendarView.css';
import { RRule } from 'rrule';
import { DateTime } from 'luxon';

/**
 * CalendarView component
 * @param {Array} events - List of events to display on the calendar
 * @param {String} timeZone - Time zone for displaying events
 * @returns 
 */
const CalendarView = ({ events, timeZone }) => {
  /**
   * Expands recurring evetns into individual occurrences.
   * @param {Object} event - Event object, including recurrence details.
   * @returns {Array} Array of individual event instances for FullCalendar.
   */
  const expandRecurringEvents = (event) => {
    try {
      // Check if the event has recurrence data
      if (
        event.recurrence &&
        event.recurrence.pattern &&
        event.recurrence.range &&
        event.recurrence.pattern.type === 'weekly'
      ) {
        const { interval, daysOfWeek } = event.recurrence.pattern;
        const { startDate, endDate, numberOfOccurrences } = event.recurrence.range;

        // Validate required recurrence data
        if (!startDate || !daysOfWeek || daysOfWeek.length === 0) {
          console.warn('Invalid recurrence data for event:', event);
          return [event]; // Return original event if data is incomplete
        }

        // Map day names to RRUle weekday constants
        const dayMap = {
          sunday: RRule.SU,
          monday: RRule.MO,
          tuesday: RRule.TU,
          wednesday: RRule.WE,
          thursday: RRule.TH,
          friday: RRule.FR,
          saturday: RRule.SA,
        };

        // Convert daysOfWeek
        const rruleDays = daysOfWeek.map((day) => dayMap[day.toLowerCase()]).filter(Boolean);
  
        if (rruleDays.length === 0) {
          console.warn('No valid weekdays found for recurrence:', event);
          return [event];
        }

        // Default end date
        const defaultEndDate = DateTime.fromISO(startDate)
          .plus({ years: 1 }) // Default to 1 year if no endDate is provided
          .toJSDate();

        // Create the recurrence rule
        const rule = new RRule({
          freq: RRule.WEEKLY,
          interval: interval || 1,
          byweekday: rruleDays,
          dtstart: DateTime.fromISO(startDate).toJSDate(),
          until: endDate !== '0001-01-01' ? new Date(endDate) : defaultEndDate,
          count: numberOfOccurrences || undefined,
        });

        // Generate individual occurrences based on the recurrence rule
        return rule.all().map((date) => ({
          title: event.subject || 'Untitled Event',
          start: DateTime.fromJSDate(date).toISO(),
          end: event.end?.dateTime
            ? DateTime.fromISO(event.end.dateTime).toISO()
            : null,
          allDay: false, // Assume non-all-day events for now
          location: event.location?.displayName || 'N/A',
          description: event.bodyPreview || '',
        }));
      }
    } catch (error) {
      console.error('Error expanding recurrence for event:', event, error);
    }
  
    // Ensure the original event is formatted correctly for FullCalendar
    return [{
      title: event.subject || 'Untitled Event',
      start: event.start?.dateTime || null,
      end: event.end?.dateTime || null,
      allDay: false, // Assume non-all-day events for now
      location: event.location?.displayName || 'N/A',
      description: event.bodyPreview || '',
    }];
  };

  // Use flatMap to process both single and recurring events
  const formattedEvents = events.flatMap(expandRecurringEvents);

  console.log('Formatted Events:', formattedEvents);

  return (
    <div className="calendar-container">
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth',
        }}
        firstDay={0}
        events={formattedEvents}
        eventContent={(eventInfo) => (
          <div>
            <b>{eventInfo.event.title}</b>
            <p>{new Date(eventInfo.event.start).toLocaleString()}</p>
          </div>
        )}
        height="auto"
      />
    </div>
  );
};

export default CalendarView;