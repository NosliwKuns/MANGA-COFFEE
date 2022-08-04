export interface Manga {
  id: number;
  title: string;
  description: string;
  status: boolean;
}
export type MangaContextType = {
  colorF: any
  setColorF: any
  query: string
  setQuery: any
  page: any
  setPage: any
  genre: any
  setGenre: any
  sort: any
  setSort: any
  res: any
};
