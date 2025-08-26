import { BlogPost, Category } from '@/data/blogs';

// Strapi API Configuration
const STRAPI_BASE_URL = 'https://exciting-action-06824a0289.strapiapp.com/api';
const STRAPI_TOKEN = 'b78e9d3ae1dbd23c6b3e85223dabd416318c2b9a26d8c6f2c694a39e1621f75057a8ac3791c6a6854bb0bd4fbb3365744ff4bfbac67f048479ba60c9a332852483ab00039f2d48584225ad6b46d025fd016d19e936e4fcfb4c3a01c740f7c616bbf322e38e9bf2ab2cbb83e8a7d5b85f2f5cedaedd83fbf2790a536c29294c44';

// Type definitions for Strapi responses
interface StrapiResponse<T> {
  data: T;
  meta?: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Type for flexible Strapi data structure
type StrapiAny = Record<string, unknown>;

interface StrapiAttributes extends StrapiAny {
  [key: string]: unknown;
}

interface StrapiBlog {
  id: number;
  attributes?: StrapiAttributes;
  [key: string]: unknown;
}

interface StrapiCategory {
  id: number;
  attributes?: StrapiAttributes;
  [key: string]: unknown;
}

class StrapiService {
  private baseUrl: string;
  private token: string;

  constructor() {
    this.baseUrl = STRAPI_BASE_URL;
    this.token = STRAPI_TOKEN;
  }

  // Generic fetch method with proper error handling
  private async fetchAPI(endpoint: string): Promise<StrapiResponse<StrapiAny[]> | StrapiResponse<StrapiAny>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json',
        },
        cache: 'no-store', // Always fetch fresh data
      });

      if (!response.ok) {
        throw new Error(`Strapi API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      // In production, we might want to log to an error service like Sentry
      throw error;
    }
  }

  // Transform Strapi blog data to our BlogPost interface
  private transformBlogPost(strapiBlog: StrapiBlog): BlogPost | null {
    if (!strapiBlog) {
      return null;
    }

    // Handle both Strapi v4 (with attributes) and v5 (direct fields) structures
    const data = strapiBlog.attributes || strapiBlog;
    
    // Extract core fields with multiple fallbacks
    const slug = data.slug || data.Slug || strapiBlog.Slug;
    const title = data.title || data.Title || strapiBlog.Title;
    const content = String(data.content || data.Content || strapiBlog.Content || '');
    const excerpt = String(data.excerpt || data.Excerpt || strapiBlog.Excerpt || this.generateExcerpt(content));
    
    // Validate required fields
    if (!slug || !title) {
      return null;
    }

    // Extract category
    let categoryName = 'Uncategorized';
    const dataObj = data as Record<string, unknown>;
    const categoryData = dataObj.category as Record<string, unknown> | undefined;
    
    if (categoryData?.data && typeof categoryData.data === 'object') {
      const categoryDataObj = categoryData.data as Record<string, unknown>;
      const categoryAttributes = categoryDataObj.attributes as Record<string, unknown> | undefined;
      if (categoryAttributes?.name && typeof categoryAttributes.name === 'string') {
        categoryName = categoryAttributes.name;
      }
    } else if (categoryData?.name && typeof categoryData.name === 'string') {
      categoryName = categoryData.name;
    } else if (categoryData?.Name && typeof categoryData.Name === 'string') {
      categoryName = categoryData.Name;
    } else if (dataObj.categories && Array.isArray(dataObj.categories) && dataObj.categories.length > 0) {
      const firstCategory = dataObj.categories[0] as Record<string, unknown>;
      if (firstCategory.Title && typeof firstCategory.Title === 'string') {
        categoryName = firstCategory.Title;
      } else if (firstCategory.name && typeof firstCategory.name === 'string') {
        categoryName = firstCategory.name;
      } else if (firstCategory.Name && typeof firstCategory.Name === 'string') {
        categoryName = firstCategory.Name;
      }
    }

    // Extract tags
    let tags: string[] = [];
    const tagsData = dataObj.tags as Record<string, unknown> | unknown[] | undefined;
    
    if (tagsData && typeof tagsData === 'object' && 'data' in tagsData && Array.isArray(tagsData.data)) {
      tags = tagsData.data.map((tag: unknown) => {
        const tagData = tag as Record<string, unknown>;
        const tagAttributes = tagData.attributes as Record<string, unknown> | undefined;
        return (tagAttributes?.name as string) || (tagData.name as string) || (tagData.Name as string);
      }).filter(Boolean) as string[];
    } else if (Array.isArray(tagsData)) {
      tags = tagsData.map((tag: unknown) => {
        const tagData = tag as Record<string, unknown>;
        return (tagData.name as string) || (tagData.Name as string) || (tagData.Title as string);
      }).filter(Boolean) as string[];
    }

    // Extract featured image
    let featuredImageUrl: string | undefined;
    const featuredImageData = dataObj.featuredImage as Record<string, unknown> | undefined;
    const displayImageData = dataObj.DisplayImage as unknown[] | undefined;
    
    if (featuredImageData?.data && typeof featuredImageData.data === 'object') {
      const imageDataObj = featuredImageData.data as Record<string, unknown>;
      const imageAttributes = imageDataObj.attributes as Record<string, unknown> | undefined;
      if (imageAttributes?.url && typeof imageAttributes.url === 'string') {
        featuredImageUrl = `https://exciting-action-06824a0289.strapiapp.com${imageAttributes.url}`;
      }
    } else if (Array.isArray(displayImageData) && displayImageData.length > 0) {
      const firstImage = displayImageData[0] as Record<string, unknown>;
      const imageUrl = firstImage.url as string;
      if (imageUrl) {
        featuredImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://exciting-action-06824a0289.strapiapp.com${imageUrl}`;
      }
    }

    // Extract dates
    const publishedDate = String(dataObj.publishedDate || dataObj.publishedAt || strapiBlog.publishedAt || dataObj.createdAt || strapiBlog.createdAt || new Date().toISOString());
    const updatedDate = String(dataObj.updatedAt || strapiBlog.updatedAt || publishedDate);

    // Extract author
    const authorData = dataObj.author as Record<string, unknown> | undefined;
    let authorName = 'The School of Options Team';
    if (authorData?.data && typeof authorData.data === 'object') {
      const authorDataObj = authorData.data as Record<string, unknown>;
      const authorAttributes = authorDataObj.attributes as Record<string, unknown> | undefined;
      if (authorAttributes?.name && typeof authorAttributes.name === 'string') {
        authorName = authorAttributes.name;
      }
    } else if (authorData?.name && typeof authorData.name === 'string') {
      authorName = authorData.name;
    }

    const transformedBlog: BlogPost & { updatedAt: string } = {
      id: strapiBlog.id.toString(),
      slug: String(slug),
      title: String(title),
      excerpt: excerpt,
      content: content,
      author: authorName,
      date: this.formatDate(publishedDate),
      updatedAt: updatedDate,
      readTime: String(dataObj.readTime || dataObj.ReadTime || this.calculateReadTime(content)),
      category: categoryName,
      tags: tags,
      featured: Boolean(dataObj.featured || dataObj.Featured),
      featuredOrder: Number(dataObj.featuredOrder || dataObj.FeaturedOrder) || undefined,
      featuredImage: featuredImageUrl,
      viewCount: Number(dataObj.viewCount || dataObj.ViewCount) || 0,
    };

    return transformedBlog;
  }

  // Transform Strapi category data
  private transformCategory(strapiCategory: StrapiCategory): Category {
    const data = strapiCategory.attributes || strapiCategory;
    const dataObj = data as Record<string, unknown>;
    
    const name = String(dataObj.name || dataObj.Name || dataObj.Title || 'Unnamed Category');
    const slug = String(dataObj.slug || dataObj.Slug || this.slugify(name));
    const description = String(dataObj.description || dataObj.Description || '');
    
    return {
      id: strapiCategory.id.toString(),
      name: name,
      slug: slug,
      description: description,
    };
  }

  // Utility methods
  private generateExcerpt(content: string): string {
    if (!content) return '';
    const plainText = content.replace(/<[^>]*>/g, ''); // Remove HTML tags
    return plainText.length > 150 ? plainText.substring(0, 150) + '...' : plainText;
  }

  private calculateReadTime(content: string): string {
    if (!content) return '1 min read';
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
  }

  private slugify(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  private formatDate(dateString: string): string {
    if (!dateString) return new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  // API Methods using your exact endpoints

  // Get all blogs: https://exciting-action-06824a0289.strapiapp.com/api/blogs?populate=*
  async getAllBlogs(): Promise<BlogPost[]> {
    try {
      const response = await this.fetchAPI('/blogs?populate=*') as StrapiResponse<StrapiAny[]>;
      
      if (!response.data || !Array.isArray(response.data)) {
        return [];
      }

      const blogs = response.data
        .map(blog => this.transformBlogPost(blog as StrapiBlog))
        .filter((blog): blog is BlogPost => blog !== null)
        .sort((a, b) => {
          // Sort by latest updated or created date
          const aDate = new Date(Math.max(
            new Date(a.date).getTime(),
            new Date((a as BlogPost & { updatedAt?: string }).updatedAt || a.date).getTime()
          ));
          const bDate = new Date(Math.max(
            new Date(b.date).getTime(),
            new Date((b as BlogPost & { updatedAt?: string }).updatedAt || b.date).getTime()
          ));
          return bDate.getTime() - aDate.getTime();
        });

      return blogs;
    } catch {
      // In production, log to error monitoring service
      return [];
    }
  }

  // Get single blog: https://exciting-action-06824a0289.strapiapp.com/api/blogs?slug=${slugName}&populate=*
  async getBlogBySlug(slug: string): Promise<BlogPost | null> {
    try {
      // First try the direct slug query
      const response = await this.fetchAPI(`/blogs?slug=${slug}&populate=*`) as StrapiResponse<StrapiAny[]>;
      
      if (!response.data || !Array.isArray(response.data)) {
        return null;
      }

      // Transform all blogs and find the one with matching slug
      const allBlogs = response.data
        .map(blog => this.transformBlogPost(blog as StrapiBlog))
        .filter((blog): blog is BlogPost => blog !== null);

      // Find the blog with the exact matching slug
      const matchingBlog = allBlogs.find(blog => blog.slug === slug);
      
      if (!matchingBlog) {
        return null;
      }
      
      return matchingBlog;
    } catch {
      // In production, log to error monitoring service
      return null;
    }
  }

  // Get all categories: https://exciting-action-06824a0289.strapiapp.com/api/categories
  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await this.fetchAPI('/categories') as StrapiResponse<StrapiAny[]>;
      
      if (!response.data || !Array.isArray(response.data)) {
        return [];
      }

      const categories = response.data.map(category => this.transformCategory(category as StrapiCategory));
      return categories;
    } catch {
      // In production, log to error monitoring service
      return [];
    }
  }

  // Helper methods for specific use cases
  async getRecentBlogs(limit: number = 3): Promise<BlogPost[]> {
    const allBlogs = await this.getAllBlogs();
    return allBlogs.slice(0, limit); // Already sorted in getAllBlogs()
  }

  async getFeaturedBlogs(): Promise<BlogPost[]> {
    const allBlogs = await this.getAllBlogs();
    return allBlogs
      .filter(blog => blog.featured)
      .sort((a, b) => (a.featuredOrder || 999) - (b.featuredOrder || 999));
  }

  async getBlogsByCategory(categorySlug: string): Promise<BlogPost[]> {
    const allBlogs = await this.getAllBlogs();
    return allBlogs.filter(blog => 
      this.slugify(blog.category) === categorySlug
    );
  }

  async getPopularBlogs(limit: number = 5): Promise<BlogPost[]> {
    const allBlogs = await this.getAllBlogs();
    return allBlogs
      .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
      .slice(0, limit);
  }

  async getRelatedBlogs(currentBlogSlug: string, limit: number = 3): Promise<BlogPost[]> {
    const allBlogs = await this.getAllBlogs();
    const currentBlog = allBlogs.find(blog => blog.slug === currentBlogSlug);
    
    if (!currentBlog) return [];

    return allBlogs
      .filter(blog => 
        blog.slug !== currentBlogSlug && 
        (blog.category === currentBlog.category || 
         blog.tags.some(tag => currentBlog.tags.includes(tag)))
      )
      .slice(0, limit);
  }
}

// Export singleton instance
export const strapiService = new StrapiService();

// Export individual methods for convenience - properly bound to the instance
export const getAllBlogs = () => strapiService.getAllBlogs();
export const getBlogBySlug = (slug: string) => strapiService.getBlogBySlug(slug);
export const getAllCategories = () => strapiService.getAllCategories();
export const getRecentBlogs = (limit?: number) => strapiService.getRecentBlogs(limit);
export const getFeaturedBlogs = () => strapiService.getFeaturedBlogs();
export const getBlogsByCategory = (categorySlug: string) => strapiService.getBlogsByCategory(categorySlug);
export const getPopularBlogs = (limit?: number) => strapiService.getPopularBlogs(limit);
export const getRelatedBlogs = (currentBlogSlug: string, limit?: number) => strapiService.getRelatedBlogs(currentBlogSlug, limit);