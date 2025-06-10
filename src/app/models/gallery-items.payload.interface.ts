export interface IGalleryItem {
  name: string;
  description: string;
  image: string;
}

export interface IGalleryItemsPayload {
  items: IGalleryItem[];
  page: number;
  totalPages: number;
}
