import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import { connect } from 'react-redux'
import { Agenda } from 'react-native-calendars'
import * as AgendaItem from '../Components/AgendaItem'
import moment from 'moment'
import { Images } from '../Themes'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

class CalendarScreen extends Component {
  static navigationOptions = {
    headerTitle: 'Calendar',
    headerBackTitleVisible: false

  }

  constructor (props) {
    super(props)
    this.state = {
      items: {},
      sched: {},
      filter: true
    }
  }

  render () {
    const today = moment().format('YYYY-MM-DD')

    return (
      <View style={{backgroundColor: 'transparent', flex: 0.4}}>
        <Agenda
          items={{}}
          selected={today}
          loadItemsForMonth={this.loadTimesFiltered.bind(this)}
          renderItem={this.renderItem.bind(this)}
          renderEmptyDate={this.renderEmptyDate.bind(this)}
          rowHasChanged={this.rowHasChanged.bind(this)}
          theme={{
            calendarBackground: 'white',
            textSectionTitleColor: 'white',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#2d4150',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: 'white',
            arrowColor: 'orange',
            monthTextColor: 'black',
            textDayFontSize: 14,
            textMonthFontSize: 14,
            textMonthMargin: 140,
            textDayHeaderFontSize: 14
          }}
          style={{}}
        />
        <Text style={{textAlign: 'center', fontSize: 24, fontWeight: '100'}}>Calendar functionality is coming
          soon!</Text>

      </View>
    )
  };

  loadTimes (day) {
    const classroomSchedule = {}

    //Necessary because of RNCalendar quirk of requiring date:empty[] pair
    setTimeout(() => {
      let schedule = {}
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000
        const strTime = this.timeToString(time)
        if (!schedule[strTime]) {
          schedule[strTime] = []
        }
      }

      Object.values(classroomSchedule).forEach(event => {
        for (i = 0; i < event.calendarDates.length; i++) {
          if (!schedule[event.calendarDates[i]])
            schedule[event.calendarDates[i]] = []
          schedule[event.calendarDates[i]].push({
            title: event.title,
            startTime: event.startTime,
            finishTime: event.finishTime,
            mychildren: event.mychildren,
            students: event.students,
            location: event.location
          })
        }
      })

      this.setState({
        sched: schedule
      })
    }, 1000)
  }

  loadTimesFiltered (day) {
    const classroomSchedule = {}

    //Necessary because of RNCalendar quirk of requiring date:empty[] pair
    setTimeout(() => {
      let schedule = {}
      this.setState({
        sched: schedule
      })
    }, 100)
  }

  renderItem (item) {
    return (
      <View style={styles.emptyDate}><Text style={{fontFamily: 'AvenirNext-UltraLight', fontSize: 16}}>
        Nothing Scheduled for this date! </Text></View>

    )
  }

  renderEmptyDate () {
    return (
      <View style={styles.emptyDate}><Text style={{fontFamily: 'AvenirNext-UltraLight', fontSize: 16}}>
        Nothing Scheduled for this date! </Text></View>
    )
  }

  rowHasChanged (r1, r2) {
    return r1.title !== r2.title
  }

  timeToString (time) {
    const date = new Date(time)
    return date.toISOString().split('T')[0]
  }

}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    margin: 5,
    padding: 5
  },
  emptyDate: {
    height: 15,
    flex: 1,
    margin: 5,
    paddingTop: 30,
    justifyContent: 'center'
  }
})

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarScreen)
