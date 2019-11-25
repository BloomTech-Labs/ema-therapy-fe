import { isAfter, subDays, getDay } from 'date-fns';

function weekOfMoods(data) {
  const newArr = data.filter((mood) => {
    return isAfter(+mood.createdAt, subDays(Date.now(), 7));
  });

  const week = [[], [], [], [], [], [], []];

  newArr.forEach((mood) => {
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

  for (let i = 0; i < getDay(Date.now()) + 1; i += 1) {
    const value = week.shift();
    week.push(value);
  }
  return week.reverse();
}

export default weekOfMoods;
