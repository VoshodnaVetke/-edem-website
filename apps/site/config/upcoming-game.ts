interface UpcomingGame {
  title: string;
  date: { iso: string; label: string };
  venue: string;
  description: string;
  coverPath: `/${string}`;
  participationHref: string;
}

export const upcomingGame: UpcomingGame | null = null;
