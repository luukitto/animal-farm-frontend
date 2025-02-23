export interface Animal {
  id: number;
  name: string;
  type: string;
  arkipoCounter: number;
}

export interface Animals {
  items: Animal[]
  meta: Meta
}

export interface Meta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
