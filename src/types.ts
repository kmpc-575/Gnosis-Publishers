export interface ContentItem {
  id: string;
  type: 'paper' | 'journal' | 'patent' | 'book' | 'project';
  title: string;
  description: string;
  price: string;
  category: string;
  image_url?: string;
  created_at: string;
}

export interface AdminUser {
  email: string;
  isAdmin: boolean;
}
