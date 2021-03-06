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
  ratings?: string
  focuses?: string
  title?: string
  characters?: string
  excludeCharacters?: string
  pairings?: string
  excludePairings?: string
  words?: number
  sort?: string
  order?: 'ASC' | 'DESC'
}
