export interface IMovieActor {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface IActor {
  profile_path: string;
  adult: boolean;
  id: number;
  name: string;
}

export interface IActorDetails {
  birthday: string | null;
  deathday: string | null;
  id: number;
  name: string;
  biography: string;
  place_of_birth: string | null;
  profile_path: string | null;
}
