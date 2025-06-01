export type OpeningHours = {
  monday: [string, string];
  tuesday: [string, string];
  wednesday: [string, string];
  thursday: [string, string];
  friday: [string, string];
  saturday: [string, string];
  sunday: [string, string];
};

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  openingHours: string | OpeningHours;
  googleMapsUrl: string;
  mainImageUrl: string;
  restaurateurId: string;
}
