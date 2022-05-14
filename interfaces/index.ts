export interface Panelist {
  avatar_url: string;
  name: string;
  title: string;
}

export interface Event {
  id: string;
  short_description: string;
  hero_url: string;
  featured: boolean;
  starts_at: string;
  ends_at: string;
  panelists: Panelist[];
}
