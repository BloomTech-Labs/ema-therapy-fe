const checkIcon = (icon) => {
  switch (icon) {
    case 'meat':
      icon = 'euro';
      break;
    case 'fruit':
      icon = 'fork';
      break;
    default:
      icon = 'question';
  }
  return icon;
};

export default checkIcon;
