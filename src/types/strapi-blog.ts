// Extended blog interface for Strapi integration
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  featured?: boolean;
  featuredOrder?: number; // For controlling featured article order
  featuredImage?: string;
  viewCount?: number;
  publishedAt?: string;
  updatedAt?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

// Strapi API response interfaces
export interface StrapiImage {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string;
    caption?: string;
    width: number;
    height: number;
  };
}

export interface StrapiAuthor {
  id: number;
  attributes: {
    name: string;
    bio?: string;
    email?: string;
    avatar?: {
      data?: StrapiImage;
    };
  };
}

export interface StrapiCategory {
  id: number;
  attributes: {
    name: string;
    slug: string;
    description?: string;
    color?: string;
  };
}

export interface StrapiTag {
  id: number;
  attributes: {
    name: string;
    slug: string;
  };
}

export interface StrapiBlogPost {
  id: number;
  attributes: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured: boolean;
    featuredOrder?: number;
    readTime: string;
    publishedDate: string;
    viewCount: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    author: {
      data: StrapiAuthor;
    };
    category: {
      data: StrapiCategory;
    };
    tags: {
      data: StrapiTag[];
    };
    featuredImage?: {
      data?: StrapiImage;
    };
    seo?: {
      metaTitle?: string;
      metaDescription?: string;
      keywords?: string;
    };
  };
}

// API response wrapper
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Featured articles management
export interface FeaturedArticleConfig {
  maxFeatured: number; // Maximum number of featured articles
  rotationDays: number; // How often to rotate featured content
  autoPromote: boolean; // Automatically promote popular articles
  categories: string[]; // Which categories can be featured
}

// Analytics interface for tracking
export interface BlogAnalytics {
  postId: string;
  views: number;
  uniqueViews: number;
  avgReadTime: number;
  bounceRate: number;
  socialShares: {
    twitter: number;
    linkedin: number;
    whatsapp: number;
    facebook: number;
  };
  comments: number;
  likes: number;
  lastViewed: string;
}

// Search and filtering interfaces
export interface BlogSearchParams {
  query?: string;
  category?: string;
  tags?: string[];
  author?: string;
  featured?: boolean;
  dateFrom?: string;
  dateTo?: string;
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'popularity' | 'relevance' | 'title';
  sortOrder?: 'asc' | 'desc';
}

export interface BlogSearchResult {
  posts: BlogPost[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  facets: {
    categories: Array<{ name: string; count: number }>;
    tags: Array<{ name: string; count: number }>;
    authors: Array<{ name: string; count: number }>;
  };
}

// Content management interfaces
export interface BlogDraft {
  title: string;
  excerpt: string;
  content: string;
  categoryId: number;
  tagIds: number[];
  authorId: number;
  featured: boolean;
  featuredOrder?: number;
  publishedDate?: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface BlogUpdateData {
  title?: string;
  excerpt?: string;
  content?: string;
  featured?: boolean;
  featuredOrder?: number;
  categoryId?: number;
  tagIds?: number[];
  publishedDate?: string;
}

// Admin panel interfaces for featured management
export interface FeaturedManagementAction {
  type: 'SET_FEATURED' | 'REMOVE_FEATURED' | 'REORDER_FEATURED';
  postId: string;
  featured?: boolean;
  featuredOrder?: number;
}

export interface FeaturedArticlesState {
  articles: BlogPost[];
  maxSlots: number;
  availableSlots: number;
  lastUpdated: string;
}
