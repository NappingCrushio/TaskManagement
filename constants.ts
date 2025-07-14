
import { Status } from './types';

export const STATUSES: Status[] = [Status.ToDo, Status.InProgress, Status.Done];

export const STATUS_COLORS: { [key in Status]: string } = {
  [Status.ToDo]: 'bg-sky-500',
  [Status.InProgress]: 'bg-amber-500',
  [Status.Done]: 'bg-emerald-500',
};

export const STATUS_TEXT_COLORS: { [key in Status]: string } = {
  [Status.ToDo]: 'text-sky-800 dark:text-sky-200',
  [Status.InProgress]: 'text-amber-800 dark:text-amber-200',
  [Status.Done]: 'text-emerald-800 dark:text-emerald-200',
};

export const STATUS_BG_COLORS: { [key in Status]: string } = {
  [Status.ToDo]: 'bg-sky-100 dark:bg-sky-900/50',
  [Status.InProgress]: 'bg-amber-100 dark:bg-amber-900/50',
  [Status.Done]: 'bg-emerald-100 dark:bg-emerald-900/50',
};
