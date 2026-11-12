export interface Article {
  title: string;
  link: string;
  source: string;
  publishDate: string;
  summary?: string;
  images?: string[];
}

export interface NewsResponse {
  status: string;
  page: number;
  pageSize: number;
  articles: Article[];
}
