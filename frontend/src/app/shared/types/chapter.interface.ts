export interface IChapter {
  id: number
  slug: string
  title: string
  body: string
  words: number
  viewCount: number
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}
