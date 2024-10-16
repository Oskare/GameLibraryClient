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
  detail: string
}
