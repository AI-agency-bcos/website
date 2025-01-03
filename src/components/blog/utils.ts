import { READ_TIME_UNIT } from './constants';

export const formatReadTime = (minutes: number): string => {
  return `${minutes} ${READ_TIME_UNIT}`;
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};