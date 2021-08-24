export interface IFilterQuery {
  limit?: number
  offset?: number
  favorited?: string
  followed?: string
  author?: string
  tags?: string
  fandoms?: string
  excludeTags?: string
  excludeFandoms?: string
  rating?: string
  focus?: string
  title?: string
  characters?: string
  pairings?: string
  words?: number
  sort?: string
  order?: 'ASC' | 'DESC'
}
