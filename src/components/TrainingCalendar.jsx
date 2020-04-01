import React, { useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction"; 
import { ApiService } from '../services/apiservice';
import { useEffect } from 'react';
import moment from 'moment';

export const TrainingCalendar = () => {
  const [trainings, setTrainings] = useState([])
  const handleEventClick = (arg) => {
      // Just in case we'd like to do something if an event
      // is clicked..
      console.log("Calendar event", arg.event)
  }

  const fetchAllTrainings = () => {
    ApiService
    .fetchAllTrainingsWithCustomerInfo()
    .then(data=> {
        const trainingdata = data.map(t=> {
            const eventobj = {}
            eventobj.title = `${t.activity} - ${t.customer.firstname} ${t.customer.lastname}`
            const start = moment(t.date)
            const end = start.add(t.duration, 'm')
            
            eventobj.start = start.toISOString()
            eventobj.end = end.toISOString()
            return eventobj
        })
        setTrainings(trainingdata)
    })
  }

  useEffect(()=> {
    fetchAllTrainings()
  }, [])

  return (
      <FullCalendar 
        defaultView="timeGridWeek" 
        plugins={[ timeGridPlugin, dayGridPlugin, interactionPlugin ]}
        scrollTime={'07:00'}
        firstDay={1}
        eventClick={handleEventClick}
        header = {{
          left: 'prev,next today',
          center: 'title',
          right: 'timeGridWeek,timeGridDay,dayGridMonth'
        }}
        events={trainings}
      />
    )

}

export default TrainingCalendar