function convertTemp(kelvin) {
  const fahr = (kelvin - 273) * 1.8 + 32;
  return Math.round(fahr);
}

export default convertTemp;
