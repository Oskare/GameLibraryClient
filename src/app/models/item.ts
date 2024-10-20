export type ItemPage = {
  currentPage: number,
  items: Item[],
  pageSize: number,
  totalItems: number,
  totalPages: number
}

export type Item = {
  id: number,
  name: string,
  description: string,
  status: number,
  youtubeUrl: string | null,
  createdAt: Date | null
}

export type ItemDetail = {
  id: number,
  itemId: number,
  detail: string,
  createdAt: Date | null
}

export type ItemCreateModel = {
  name: string,
  description: string,
  youtubeUrl: string | null,
}

export type ItemUpdateModel = {
  name: string,
  description: string,
  youtubeUrl: string | null,
}

export type SteamDetail = {
  id: string;
  name: string;
  img: string;
  price: string;
}
