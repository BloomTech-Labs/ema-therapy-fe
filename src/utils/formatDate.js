import { format } from 'date-fns';

const formatDate = (timestamp, fmt) => {
  const ts = Number(timestamp);
  return format(new Date(ts), fmt);
};

export default formatDate;
