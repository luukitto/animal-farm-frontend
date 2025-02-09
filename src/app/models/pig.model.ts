export interface PigStatus {
  id: number;
  name: string;
  status: Status
}

export enum Status {
  DEFAULT = "default",
  HAPPY = "happy",
  PUTIN = "putin"
}
