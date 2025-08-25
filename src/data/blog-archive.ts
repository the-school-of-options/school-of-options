import { BlogPost } from './blogs';

// Archive structure for organizing blogs by date
export interface BlogArchive {
  year: number;
  months: {
    month: number;
    monthName: string;
    posts: BlogPost[];
    postCount: number;
  }[];
  totalPosts: number;
}

// Category structure for organizing blogs by topic
export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  postCount: number;
  posts: BlogPost[];
}

// Helper function to get archive data
export function getBlogArchive(posts: BlogPost[]): BlogArchive[] {
  const archiveMap = new Map<number, Map<number, BlogPost[]>>();
  
  posts.forEach(post => {
    const date = new Date(post.date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    
    if (!archiveMap.has(year)) {
      archiveMap.set(year, new Map());
    }
    
    if (!archiveMap.get(year)!.has(month)) {
      archiveMap.get(year)!.set(month, []);
    }
    
    archiveMap.get(year)!.get(month)!.push(post);
  });
  
  const archive: BlogArchive[] = [];
  
  for (const [year, monthMap] of archiveMap) {
    const months = [];
    let totalPosts = 0;
    
    for (const [month, monthPosts] of monthMap) {
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      months.push({
        month,
        monthName: monthNames[month - 1],
        posts: monthPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
        postCount: monthPosts.length
      });
      
      totalPosts += monthPosts.length;
    }
    
    // Sort months in descending order (newest first)
    months.sort((a, b) => b.month - a.month);
    
    archive.push({
      year,
      months,
      totalPosts
    });
  }
  
  // Sort years in descending order (newest first)
  return archive.sort((a, b) => b.year - a.year);
}

// Helper function to get blogs by category
export function getBlogCategories(posts: BlogPost[]): BlogCategory[] {
  const categoryMap = new Map<string, BlogPost[]>();
  
  posts.forEach(post => {
    const category = post.category;
    if (!categoryMap.has(category)) {
      categoryMap.set(category, []);
    }
    categoryMap.get(category)!.push(post);
  });
  
  const categories: BlogCategory[] = [];
  
  for (const [categoryName, categoryPosts] of categoryMap) {
    const categoryId = categoryName.toLowerCase().replace(/\s+/g, '-');
    
    // Define category descriptions
    const descriptions: Record<string, string> = {
      'psychology': 'Understanding the mental aspects of trading and behavioral finance',
      'research': 'Market analysis, volatility studies, and institutional-grade research',
      'video': 'Live trading sessions, tutorials, and educational content',
      'strategy': 'Options trading strategies, setups, and execution guides',
      'education': 'Fundamental concepts and educational resources for traders'
    };
    
    categories.push({
      id: categoryId,
      name: categoryName,
      description: descriptions[categoryId] || `Articles and insights about ${categoryName.toLowerCase()}`,
      postCount: categoryPosts.length,
      posts: categoryPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    });
  }
  
  // Sort by post count (most popular first)
  return categories.sort((a, b) => b.postCount - a.postCount);
}

// Helper function for pagination
export interface PaginationResult<T> {
  items: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export function paginateBlogs(
  posts: BlogPost[], 
  page: number = 1, 
  limit: number = 6
): PaginationResult<BlogPost> {
  const totalItems = posts.length;
  const totalPages = Math.ceil(totalItems / limit);
  const currentPage = Math.max(1, Math.min(page, totalPages));
  const startIndex = (currentPage - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    items: posts.slice(startIndex, endIndex),
    currentPage,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1
  };
}

// Helper function to search blogs
export interface BlogSearchOptions {
  query?: string;
  category?: string;
  tag?: string;
  author?: string;
  year?: number;
  month?: number;
}

export function searchBlogs(posts: BlogPost[], options: BlogSearchOptions): BlogPost[] {
  let filteredPosts = [...posts];
  
  // Filter by search query (title, excerpt, content)
  if (options.query) {
    const query = options.query.toLowerCase();
    filteredPosts = filteredPosts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // Filter by category
  if (options.category) {
    filteredPosts = filteredPosts.filter(post =>
      post.category.toLowerCase() === options.category!.toLowerCase()
    );
  }
  
  // Filter by tag
  if (options.tag) {
    filteredPosts = filteredPosts.filter(post =>
      post.tags.some(tag => tag.toLowerCase() === options.tag!.toLowerCase())
    );
  }
  
  // Filter by author
  if (options.author) {
    filteredPosts = filteredPosts.filter(post =>
      post.author.toLowerCase().includes(options.author!.toLowerCase())
    );
  }
  
  // Filter by year and month
  if (options.year || options.month) {
    filteredPosts = filteredPosts.filter(post => {
      const date = new Date(post.date);
      const postYear = date.getFullYear();
      const postMonth = date.getMonth() + 1;
      
      if (options.year && postYear !== options.year) return false;
      if (options.month && postMonth !== options.month) return false;
      
      return true;
    });
  }
  
  return filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// Helper function to get related posts
export function getRelatedPosts(currentPost: BlogPost, allPosts: BlogPost[], limit: number = 3): BlogPost[] {
  const otherPosts = allPosts.filter(post => post.id !== currentPost.id);
  
  // Score posts based on similarity
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Same category gets high score
    if (post.category === currentPost.category) score += 10;
    
    // Shared tags get points
    const sharedTags = post.tags.filter(tag => currentPost.tags.includes(tag));
    score += sharedTags.length * 5;
    
    // Same author gets points
    if (post.author === currentPost.author) score += 3;
    
    // Newer posts get slight preference
    const daysDiff = Math.abs(new Date(post.date).getTime() - new Date(currentPost.date).getTime()) / (1000 * 60 * 60 * 24);
    score += Math.max(0, 30 - daysDiff) * 0.1;
    
    return { post, score };
  });
  
  // Sort by score and return top posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}

// Helper function to get popular posts (based on featured status and category)
export function getPopularPosts(posts: BlogPost[], limit: number = 5): BlogPost[] {
  return posts
    .sort((a, b) => {
      // Featured posts first
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Then by date
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);
}
