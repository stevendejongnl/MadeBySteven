interface GitHubUser {
  login: string
  avatar_url: string
  public_repos: number
  followers: number
  name: string | null
  bio: string | null
}

interface CachedData<T> {
  data: T
  timestamp: number
  ttl: number
}

const CACHE_TTL_USER = 3600000;
const CACHE_TTL_STATS = 1800000;
const API_BASE = import.meta.env['VITE_API_URL'] || '/api/v1';

function getCacheKey(key: string): string {
  return `mbs_github_cache_${key}`;
}

function setCachedData<T>(key: string, data: T, ttl: number): void {
  const cached: CachedData<T> = {
    data,
    timestamp: Date.now(),
    ttl,
  };
  try {
    localStorage.setItem(getCacheKey(key), JSON.stringify(cached));
  } catch {
    console.warn('Failed to cache GitHub data');
  }
}

function getCachedData<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(getCacheKey(key));
    if (!item) return null;
    const cached: CachedData<T> = JSON.parse(item);
    const age = Date.now() - cached.timestamp;
    if (age > cached.ttl) {
      localStorage.removeItem(getCacheKey(key));
      return null;
    }
    return cached.data;
  } catch {
    return null;
  }
}

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const cached = getCachedData<GitHubUser>('profile_github');
  if (cached) return cached;

  try {
    const response = await fetch(`${API_BASE}/profiles/github`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const user: GitHubUser = await response.json();
    setCachedData('profile_github', user, CACHE_TTL_USER);
    return user;
  } catch (error) {
    console.error('Failed to fetch GitHub user:', error);
    const fallback: GitHubUser = {
      login: 'github',
      avatar_url: '',
      public_repos: 0,
      followers: 0,
      name: null,
      bio: null,
    };
    return fallback;
  }
}

export async function fetchGitHubStats(): Promise<number> {
  const cached = getCachedData<number>('stats_global');
  if (cached !== null) return cached;

  try {
    const response = await fetch(`${API_BASE}/stats`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    setCachedData('stats_global', data.contributions, CACHE_TTL_STATS);
    return data.contributions;
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return 0;
  }
}

export function getAvatarUrl(user: { login: string; avatar_url: string }, useFallback: boolean = false): string {
  // Use GitHub's redirect URL format which is more reliable
  if (!useFallback) {
    return `https://github.com/${user.login}.png`;
  }

  // Fallback to SVG with initials
  const initials = user.login.substring(0, 2).toUpperCase();
  return `data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256"><rect fill="%2344475A" width="256" height="256"/><text x="128" y="140" font-size="80" font-weight="bold" text-anchor="middle" fill="%2350FA7B" font-family="monospace">${initials}</text></svg>`;
}
