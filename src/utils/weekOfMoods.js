import { isAfter, subDays, getDay } from 'date-fns';

function weekOfMoods(data) {
  // get only the mood entries from the previous week
  const prevWeekMoodArr = data.filter((mood) => {
    return isAfter(+mood.createdAt, subDays(Date.now(), 7));
  });

  // index 0 = sunday, index 1 = monday, etc
  const week = [[], [], [], [], [], [], []];

  // add mood to the week array at the index corresponding to the day it was created
  prevWeekMoodArr.forEach((mood) => {
    switch (getDay(+mood.createdAt)) {
      case 0:
        week[0].push(mood);
        break;
      case 1:
        week[1].push(mood);
        break;
      case 2:
        week[2].push(mood);
        break;
      case 3:
        week[3].push(mood);
        break;
      case 4:
        week[4].push(mood);
        break;
      case 5:
        week[5].push(mood);
        break;
      case 6:
        week[6].push(mood);
        break;
      default:
    }
  });

  // re-order the week array - entries from today at last index
  for (let i = 0, d = getDay(Date.now()); i < d + 1; i += 1) {
    const value = week.shift();
    week.push(value);
  }
  // reverse week array
  return week.reverse();
}

export default weekOfMoods;
