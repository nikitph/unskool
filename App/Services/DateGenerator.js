import moment from 'moment'
export const dayConversions = {
  Monday: {
    label: 'M',
    value: 1
  },
  Tuesday: {
    label: 'T',
    value: 2
  },
  Wednesday: {
    label: 'W',
    value: 3
  },
  Thursday: {
    label: 'Th',
    value: 4
  },
  Friday: {
    label: 'F',
    value: 5
  },
  Saturday: {
    label: 'S',
    value: 6
  },
  Sunday: {
    label: 'Su',
    value: 7
  },
  M: {
    label: 'Monday',
    value: 1
  },
  T: {
    label: 'Tuesday',
    value: 2
  },
  W: {
    label: 'Wednesday',
    value: 3
  },
  Th: {
    label: 'Thursday',
    value: 4
  },
  F: {
    label: 'Friday',
    value: 5
  },
  S: {
    label: 'Saturday',
    value: 6
  },
  Su: {
    label: 'Sunday',
    value: 7
  }
}

export function generateCalendarDates (formattedStartDate, formattedFinishDate, recurringDays, frequency) {
  let dateFormatCollection = {}
  dateFormatCollection[formattedStartDate] = []
  dateFormatCollection[formattedFinishDate] = []
  const startDateTimeStamp = moment(formattedStartDate).format('X')
  const finishDateTimeStamp = moment(formattedFinishDate).format('X')

  // if the frequency is none ('') or there are no recurring days then skip this function and return the startDate
  if (!formattedStartDate || !formattedFinishDate || frequency === '' || recurringDays.length === 0) {
    return []
  }

  // get the startingDay by converting the formattedStartDate to a day
  const startingDay = moment(formattedStartDate, 'YYYY-MM-DD').format('dddd')

  let numberOfDays
  // set numerical value for the days between the frequency options
  switch (frequency) {
    case 'monthly':
      numberOfDays = 30
      break
    case 'weekly':
      numberOfDays = 7
      break
    default:
    // no function
  }

  // check if the startingDay matches any of the recurringDays
  const startsOnRecurringDay = recurringDays.indexOf(dayConversions[startingDay].label) !== -1

  // if the startingDay matches a recurringDay, then remove the start day from the recurringDay list
  let recurringDaysList = recurringDays
  let firstRecurringDayObj
  if (startsOnRecurringDay) {
    const firstRecurringDayIndex = recurringDays.indexOf(dayConversions[startingDay].label)
    recurringDaysList = recurringDays.slice(0)
    recurringDaysList.asMutable().splice(firstRecurringDayIndex, 1)
  }

  let dateGroup = []
  // push the start and finish date in to the date group
  dateGroup.push(formattedStartDate)
  dateGroup.push(formattedFinishDate)

  // populate the dateGroup with the date format of the
  // recurring days remaning in the recurringDaysList
  if (recurringDaysList.length > 0) {
    recurringDaysList.map((currentDay, i) => {
      let recurringDayObj =
        moment(formattedStartDate)
          .add(dayConversions[recurringDaysList[i]].value - dayConversions[startingDay].value, 'days')

      let recurringDayFormat = recurringDayObj.format('YYYY-MM-DD')

      // only push the date format if the recurringDayFormat is before the finish date
      moment(recurringDayFormat).isBefore(formattedFinishDate) &&
      dateGroup.push(recurringDayFormat)
    })
  }

  // populate the dateGroup with the following weeks (if any) otherwise, return dateGroup
  let reachedLastDay = false
  let totalNumberOfDays = numberOfDays
  let numberOfWeeks = 1
  let followingRecurringDayFormat
  for (let i = 0; reachedLastDay === false; i++) {
    // if the followingRecurringDayFormat is after the finish date, break the loop
    if (moment(followingRecurringDayFormat).isAfter(formattedFinishDate)) break
    // if the numberOfWeeks is more than 10, break the loop
    if (numberOfWeeks > 10) break

    //
    if (i >= recurringDays.length) {
      numberOfWeeks++
      totalNumberOfDays += numberOfDays
      i = 0
    }

    // build the standard week formet
    let recurringDayObj =
      moment(formattedStartDate)
        .add(dayConversions[recurringDays[i]].value - dayConversions[startingDay].value, 'days')

    let recurringDayFormat = recurringDayObj.format('YYYY-MM-DD')

    // build the following week format
    followingRecurringDayFormat =
      moment(recurringDayFormat)
        .add(totalNumberOfDays, 'days')
        .format('YYYY-MM-DD')

    // push the followingRecurringDayFormat into the dateGroup
    dateGroup.push(followingRecurringDayFormat)
  }
  return dateGroup
}
