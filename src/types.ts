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

export interface UserProfile {
  id: string;
  name: string;
  mobile: string;
  email: string;
  city: string;
  state: string;
  role: 'student' | 'staff' | 'others';
  college?: string;
  year_of_study?: string;
  department?: string;
  occupation?: string;
  company?: string;
  created_at?: string;
}
