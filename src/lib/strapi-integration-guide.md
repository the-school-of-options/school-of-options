# Strapi 5 Integration Guide for Blog Management

## 1. Strapi 5 Content Types Setup

### Blog Post Content Type (Collection Type)
```javascript
// strapi/src/api/blog-post/content-types/blog-post/schema.json
{
  "kind": "collectionType",
  "collectionName": "blog_posts",
  "info": {
    "singularName": "blog-post",
    "pluralName": "blog-posts",
    "displayName": "Blog Post",
    "description": "Blog posts for The School of Options"
  },
  "options": {
    "draftAndPublish": true
  },
  "pluginOptions": {
    "i18n": {
      "localized": true
    }
  },
  "attributes": {
    "title": {
      "type": "string",
      "required": true,
      "maxLength": 500
    },
    "slug": {
      "type": "uid",
      "targetField": "title",
      "required": true
    },
    "excerpt": {
      "type": "text",
      "required": true,
      "maxLength": 500
    },
    "content": {
      "type": "richtext",
      "required": true
    },
    "featured": {
      "type": "boolean",
      "default": false
    },
    "readTime": {
      "type": "string",
      "required": true
    },
    "publishedDate": {
      "type": "datetime",
      "required": true
    },
    "author": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::author.author",
      "inversedBy": "blog_posts"
    },
    "category": {
      "type": "relation",
      "relation": "manyToOne",
      "target": "api::category.category",
      "inversedBy": "blog_posts"
    },
    "tags": {
      "type": "relation",
      "relation": "manyToMany",
      "target": "api::tag.tag",
      "mappedBy": "blog_posts"
    },
    "featuredImage": {
      "type": "media",
      "multiple": false,
      "required": false,
      "allowedTypes": ["images"]
    },
    "seo": {
      "type": "component",
      "repeatable": false,
      "component": "shared.seo"
    },
    "viewCount": {
      "type": "integer",
      "default": 0
    },
    "featuredOrder": {
      "type": "integer",
      "required": false,
      "description": "Order for featured articles (1 = top priority)"
    }
  }
}
```

### Category Content Type
```javascript
// strapi/src/api/category/content-types/category/schema.json
{
  "kind": "collectionType",
  "collectionName": "categories",
  "info": {
    "singularName": "category",
    "pluralName": "categories",
    "displayName": "Category"
  },
  "attributes": {
    "name": {
      "type": "string",
      "required": true,
      "unique": true
    },
    "slug": {
      "type": "uid",
      "targetField": "name"
    },
    "description": {
      "type": "text"
    },
    "color": {
      "type": "string",
      "regex": "^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
    },
    "blog_posts": {
      "type": "relation",
      "relation": "oneToMany",
      "target": "api::blog-post.blog-post",
      "mappedBy": "category"
    }
  }
}
```

## 2. Featured Articles Management Strategy

### Option A: Boolean + Order Field (Recommended)
```javascript
// In Strapi Admin Panel
const featuredArticleFields = {
  featured: true,           // Boolean to mark as featured
  featuredOrder: 1,        // Integer for ordering (1 = highest priority)
  publishedDate: "2024-12-20T10:00:00Z"
}

// Query for featured articles
const featuredQuery = {
  filters: {
    featured: {
      $eq: true
    },
    publishedAt: {
      $notNull: true
    }
  },
  sort: ['featuredOrder:asc', 'publishedDate:desc'],
  pagination: {
    limit: 3
  }
}
```

### Option B: Dedicated Featured Collection (Advanced)
```javascript
// Create separate "Featured Articles" collection type
{
  "kind": "collectionType",
  "collectionName": "featured_articles",
  "attributes": {
    "blog_post": {
      "type": "relation",
      "relation": "oneToOne",
      "target": "api::blog-post.blog-post"
    },
    "order": {
      "type": "integer",
      "required": true
    },
    "startDate": {
      "type": "datetime"
    },
    "endDate": {
      "type": "datetime"
    },
    "active": {
      "type": "boolean",
      "default": true
    }
  }
}
```

## 3. Frontend Integration Code

### API Service Layer
```typescript
// src/lib/strapi.ts
interface StrapiResponse<T> {
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

interface StrapiBlogPost {
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
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    author: {
      data: {
        id: number;
        attributes: {
          name: string;
          bio?: string;
          avatar?: any;
        };
      };
    };
    category: {
      data: {
        id: number;
        attributes: {
          name: string;
          slug: string;
          description?: string;
          color?: string;
        };
      };
    };
    tags: {
      data: Array<{
        id: number;
        attributes: {
          name: string;
          slug: string;
        };
      }>;
    };
    featuredImage?: {
      data?: {
        id: number;
        attributes: {
          url: string;
          alternativeText?: string;
          caption?: string;
        };
      };
    };
  };
}

class StrapiService {
  private baseUrl: string;
  private apiToken: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
    this.apiToken = process.env.STRAPI_API_TOKEN || '';
  }

  private async fetchAPI(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl}/api${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...(this.apiToken && { Authorization: `Bearer ${this.apiToken}` }),
      ...options.headers,
    };

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`Strapi API error: ${response.status}`);
    }

    return response.json();
  }

  // Get featured articles
  async getFeaturedArticles(limit: number = 3): Promise<StrapiBlogPost[]> {
    const response: StrapiResponse<StrapiBlogPost[]> = await this.fetchAPI(
      `/blog-posts?` + new URLSearchParams({
        'filters[featured][$eq]': 'true',
        'filters[publishedAt][$notNull]': 'true',
        'sort[0]': 'featuredOrder:asc',
        'sort[1]': 'publishedDate:desc',
        'pagination[limit]': limit.toString(),
        'populate[author][populate]': 'avatar',
        'populate[category]': '*',
        'populate[tags]': '*',
        'populate[featuredImage]': '*',
      })
    );

    return response.data;
  }

  // Get all published articles
  async getAllArticles(page: number = 1, pageSize: number = 10): Promise<{
    articles: StrapiBlogPost[];
    pagination: any;
  }> {
    const response: StrapiResponse<StrapiBlogPost[]> = await this.fetchAPI(
      `/blog-posts?` + new URLSearchParams({
        'filters[publishedAt][$notNull]': 'true',
        'sort[0]': 'publishedDate:desc',
        'pagination[page]': page.toString(),
        'pagination[pageSize]': pageSize.toString(),
        'populate[author][populate]': 'avatar',
        'populate[category]': '*',
        'populate[tags]': '*',
        'populate[featuredImage]': '*',
      })
    );

    return {
      articles: response.data,
      pagination: response.meta.pagination,
    };
  }

  // Get article by slug
  async getArticleBySlug(slug: string): Promise<StrapiBlogPost | null> {
    const response: StrapiResponse<StrapiBlogPost[]> = await this.fetchAPI(
      `/blog-posts?` + new URLSearchParams({
        'filters[slug][$eq]': slug,
        'filters[publishedAt][$notNull]': 'true',
        'populate[author][populate]': 'avatar',
        'populate[category]': '*',
        'populate[tags]': '*',
        'populate[featuredImage]': '*',
      })
    );

    return response.data[0] || null;
  }

  // Get articles by category
  async getArticlesByCategory(categorySlug: string, page: number = 1): Promise<{
    articles: StrapiBlogPost[];
    pagination: any;
    category: any;
  }> {
    const response: StrapiResponse<StrapiBlogPost[]> = await this.fetchAPI(
      `/blog-posts?` + new URLSearchParams({
        'filters[category][slug][$eq]': categorySlug,
        'filters[publishedAt][$notNull]': 'true',
        'sort[0]': 'publishedDate:desc',
        'pagination[page]': page.toString(),
        'pagination[pageSize]': '9',
        'populate[author][populate]': 'avatar',
        'populate[category]': '*',
        'populate[tags]': '*',
        'populate[featuredImage]': '*',
      })
    );

    return {
      articles: response.data,
      pagination: response.meta.pagination,
      category: response.data[0]?.attributes.category.data.attributes,
    };
  }

  // Increment view count
  async incrementViewCount(articleId: number): Promise<void> {
    await this.fetchAPI(`/blog-posts/${articleId}`, {
      method: 'PUT',
      body: JSON.stringify({
        data: {
          viewCount: { $inc: 1 }
        }
      }),
    });
  }
}

export const strapiService = new StrapiService();
```

### Data Transformation Layer
```typescript
// src/lib/blog-transformer.ts
import { BlogPost } from '@/data/blogs';

export function transformStrapiBlogPost(strapiPost: StrapiBlogPost): BlogPost {
  const attributes = strapiPost.attributes;
  
  return {
    id: strapiPost.id.toString(),
    slug: attributes.slug,
    title: attributes.title,
    excerpt: attributes.excerpt,
    content: attributes.content,
    author: attributes.author.data.attributes.name,
    date: new Date(attributes.publishedDate).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),
    readTime: attributes.readTime,
    category: attributes.category.data.attributes.name,
    tags: attributes.tags.data.map(tag => tag.attributes.name),
    featured: attributes.featured,
    featuredImage: attributes.featuredImage?.data?.attributes.url,
    viewCount: attributes.viewCount || 0,
  };
}
```

## 4. Updated Frontend Components

### Updated Blog Listing Page
```typescript
// src/app/knowledge-hub/blogs/page.tsx
import { strapiService } from '@/lib/strapi';
import { transformStrapiBlogPost } from '@/lib/blog-transformer';

export default async function BlogsPage() {
  // Fetch featured articles from Strapi
  const strapiFeaturedArticles = await strapiService.getFeaturedArticles(3);
  const featuredBlogs = strapiFeaturedArticles.map(transformStrapiBlogPost);

  // Fetch all articles from Strapi
  const { articles: strapiAllArticles } = await strapiService.getAllArticles(1, 12);
  const allBlogs = strapiAllArticles.map(transformStrapiBlogPost);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      {/* ... existing hero code ... */}

      {/* Featured Articles - Now Dynamic */}
      {featuredBlogs.length > 0 && (
        <section className="py-12 sm:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-navy mb-4">
                Featured Articles
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                Our most important and impactful content
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {featuredBlogs.map((blog) => (
                <FeaturedBlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles - Now Dynamic */}
      <section className="py-12 sm:py-16">
        {/* ... rest of component using allBlogs ... */}
      </section>
    </div>
  );
}
```

### Individual Blog Page with ISR
```typescript
// src/app/knowledge-hub/blogs/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { strapiService } from '@/lib/strapi';
import { transformStrapiBlogPost } from '@/lib/blog-transformer';

// Enable ISR (Incremental Static Regeneration)
export const revalidate = 3600; // Revalidate every hour

export async function generateStaticParams() {
  const { articles } = await strapiService.getAllArticles(1, 100);
  
  return articles.map((article) => ({
    slug: article.attributes.slug,
  }));
}

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const strapiPost = await strapiService.getArticleBySlug(params.slug);
  
  if (!strapiPost) {
    notFound();
  }

  const blog = transformStrapiBlogPost(strapiPost);

  // Increment view count (optional - can be done client-side)
  // await strapiService.incrementViewCount(strapiPost.id);

  return (
    <div className="min-h-screen bg-white">
      {/* ... existing blog page layout using blog data ... */}
    </div>
  );
}
```

## 5. Featured Articles Management in Strapi Admin

### Admin Panel Customization
```javascript
// strapi/src/admin/app.js
export default {
  config: {
    // Custom field for featured articles
    translations: {
      en: {
        'content-type-builder.modalForm.attribute.text.name.placeholder': 'e.g. Featured Order (1 = highest priority)',
      },
    },
  },
};
```

### Custom Controller for Featured Management
```javascript
// strapi/src/api/blog-post/controllers/blog-post.js
'use strict';

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::blog-post.blog-post', ({ strapi }) => ({
  // Custom endpoint to manage featured articles
  async setFeatured(ctx) {
    const { id } = ctx.params;
    const { featured, featuredOrder } = ctx.request.body;

    try {
      const updatedPost = await strapi.entityService.update('api::blog-post.blog-post', id, {
        data: {
          featured,
          featuredOrder: featured ? featuredOrder : null,
        },
      });

      return { data: updatedPost };
    } catch (error) {
      ctx.throw(400, error);
    }
  },

  // Get featured articles with custom logic
  async getFeatured(ctx) {
    const { limit = 3 } = ctx.query;

    try {
      const featuredPosts = await strapi.entityService.findMany('api::blog-post.blog-post', {
        filters: {
          featured: true,
          publishedAt: { $notNull: true },
        },
        sort: [
          { featuredOrder: 'asc' },
          { publishedDate: 'desc' },
        ],
        limit: parseInt(limit),
        populate: {
          author: { populate: ['avatar'] },
          category: true,
          tags: true,
          featuredImage: true,
        },
      });

      return { data: featuredPosts };
    } catch (error) {
      ctx.throw(500, error);
    }
  },
}));
```

## 6. Environment Configuration

### Environment Variables
```bash
# .env.local
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_api_token_here

# For production
NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com
STRAPI_API_TOKEN=your_production_api_token
```

## 7. Migration Strategy

### Phase 1: Parallel Setup
1. Set up Strapi 5 with content types
2. Import existing blog data to Strapi
3. Test API endpoints and data transformation

### Phase 2: Gradual Migration
1. Update blog listing page to use Strapi data
2. Update individual blog pages with ISR
3. Implement featured articles management

### Phase 3: Full Integration
1. Remove static blog data files
2. Add admin interface for content management
3. Implement advanced features (search, analytics)

## 8. Best Practices for Featured Articles

### Content Strategy
- **Limit featured articles** to 3-5 maximum for better UX
- **Rotate featured content** regularly (weekly/monthly)
- **Use featuredOrder** for precise control over positioning
- **Set expiration dates** for time-sensitive featured content

### Performance Optimization
- **Use ISR** for automatic cache invalidation
- **Implement CDN** for image delivery
- **Cache API responses** on the frontend
- **Lazy load** non-critical content

### SEO Considerations
- **Proper meta tags** for featured articles
- **Structured data** markup for articles
- **Sitemap generation** from Strapi data
- **Canonical URLs** for duplicate content prevention
