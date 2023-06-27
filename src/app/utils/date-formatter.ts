import { formatDate } from "@angular/common";

export function apply_yyyy_MM_dd(aDate: Date): string {
  return formatDate(aDate, 'yyyy-MM-dd', 'en');
}

