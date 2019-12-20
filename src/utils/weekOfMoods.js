import isAfter from 'date-fns/isAfter';
import startOfDay from 'date-fns/startOfDay';
import subDays from 'date-fns/subDays';
import getDay from 'date-fns/getDay';

function weekOfMoods(data) {
  // get only the mood entries from the previous week
  const prevWeekMoodArr = data.filter((mood) => {
    return isAfter(startOfDay(+mood.createdAt), subDays(Date.now(), 7));
  });

  // index 0 = sunday, index 1 = monday, etc
  const week = [[], [], [], [], [], [], []];

  prevWeekMoodArr.forEach((mood) => {
    week[getDay(+mood.createdAt)].push(mood);
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
