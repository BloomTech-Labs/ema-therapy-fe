function moodToString(moodInt) {
  let moodString;
  if (moodInt === 1) {
    moodString = 'happy';
  } else if (moodInt === 2) {
    moodString = 'fine';
  } else if (moodInt === 3) {
    moodString = 'normal';
  } else if (moodInt === 4) {
    moodString = 'sad';
  } else if (moodInt === 5) {
    moodString = 'unhappy';
  }

  return moodString;
}

export default moodToString;
