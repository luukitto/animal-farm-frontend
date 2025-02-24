export interface Animal {
  id: number;
  name: string;
  type: string;
  arkipoCounter: number;
}

// Remove or update the Animals interface to match PaginatedResponse
// export interface Animals {
//   items: Animal[];
//   meta: {
//     total: number;
//     page: number;
//     limit: number;
//   };
// }

export interface Meta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}
