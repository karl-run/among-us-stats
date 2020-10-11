import formatIso from 'date-fns/formatISO';
import parseIso from 'date-fns/parseISO';
import subFn from 'date-fns/sub';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import type { Duration } from 'date-fns';

import { Session } from '../store/stats/statsRedux';

export function now(): string {
  return formatIso(new Date());
}

export function sub(date: string, duration: Duration): string {
  return formatIso(subFn(parseIso(date), duration));
}

export function byDate(a: Session, b: Session): 0 | 1 | -1 {
  if (b.lastGamePlayed < a.lastGamePlayed) return -1;
  if (b.lastGamePlayed > a.lastGamePlayed) return 1;
  return 0;
}

export { formatDistanceToNow, parseIso };
