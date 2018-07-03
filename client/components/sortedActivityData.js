import moment from 'moment'


export const getWeeklyData = (activitiesArray) => {

  const data = [
    { day: "Mon", points: 0 },
    { day: "Tue", points: 0 },
    { day: "Wed", points: 0 },
    { day: "Thu", points: 0 },
    { day: "Fri", points: 0 },
    { day: "Sat", points: 0 },
    { day: "Sun", points: 0 }
  ]


  activitiesArray.forEach(activity => {
    if (moment(activity.createdAt).format('"ddd"') === '"Mon"') {
      data[0].points += activity.points
    }
    if (moment(activity.createdAt).format('"ddd"') === '"Tue"') {
      data[1].points += activity.points
    }
    if (moment(activity.createdAt).format('"ddd"') === '"Wed"') {
      data[2].points += activity.points
    }
    if (moment(activity.createdAt).format('"ddd"') === '"Thu"') {
      data[3].points += activity.points
    }
    if (moment(activity.createdAt).format('"ddd"') === '"Fri"') {
      data[4].points += activity.points
    }
    if (moment(activity.createdAt).format('"ddd"') === '"Sat"') {
      data[5].points += activity.points
    }
    if (moment(activity.createdAt).format('"ddd"') === '"Sun"') {
      data[6].points += activity.points
    }
  });

  return data
}
