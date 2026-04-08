export interface MissionLinks {
  mission_patch_small: string | null;
  article_link: string | null;
  wikipedia: string | null;
  video_link: string | null;
}

export interface MissionRocket {
  rocket_name: string;
  rocket_type: string;
}

export interface Mission {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  details: string | null;
  links: MissionLinks;
  rocket: MissionRocket;
}
