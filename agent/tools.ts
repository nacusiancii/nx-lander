import fs from 'fs/promises';
import path from 'path';
import simpleGit from 'simple-git';
import { Octokit } from '@octokit/rest';
import { generatePageCode, generateSearchResultsUpdate, generateRouteUpdate } from './templates';

const git = simpleGit();

export const tools = [
  {
    type: 'function',
    function: {
      name: 'generate_keywords',
      description: 'Generate SEO keywords for the landing page based on the theme',
      parameters: {
        type: 'object',
        properties: {
          theme: {
            type: 'string',
            description: 'The landing page theme (e.g., "romance books", "thriller audiobooks")'
          }
        },
        required: ['theme']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'fetch_book_recommendations',
      description: 'Fetch book recommendations from the API',
      parameters: {
        type: 'object',
        properties: {
          search_term: {
            type: 'string',
            description: 'Search term for book recommendations'
          }
        },
        required: ['search_term']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'generate_content',
      description: 'Generate content for the landing page (title, subtitle, ad copy, features)',
      parameters: {
        type: 'object',
        properties: {
          theme: {
            type: 'string',
            description: 'The landing page theme'
          },
          keywords: {
            type: 'array',
            items: { type: 'string' },
            description: 'SEO keywords'
          },
          books: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                title: { type: 'string' },
                author: { type: 'string' },
                cover: { type: 'string' }
              }
            },
            description: 'Book recommendations'
          }
        },
        required: ['theme', 'keywords', 'books']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'write_page_file',
      description: 'Write the main page component file',
      parameters: {
        type: 'object',
        properties: {
          page_name: {
            type: 'string',
            description: 'CamelCase page name (e.g., "Romance", "Thriller")'
          },
          content: {
            type: 'object',
            description: 'Page content including title, subtitle, books, features'
          }
        },
        required: ['page_name', 'content']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'update_app_routes',
      description: 'Update App.tsx with new route',
      parameters: {
        type: 'object',
        properties: {
          page_name: {
            type: 'string',
            description: 'CamelCase page name'
          },
          route_path: {
            type: 'string',
            description: 'URL path (e.g., "/romance")'
          }
        },
        required: ['page_name', 'route_path']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'update_search_results',
      description: 'Update SearchResults.tsx with keywords and ad',
      parameters: {
        type: 'object',
        properties: {
          variable_name: {
            type: 'string',
            description: 'Variable name for keywords (e.g., "romanceKeywords")'
          },
          keywords: {
            type: 'array',
            items: { type: 'string' },
            description: 'SEO keywords array'
          },
          ad_content: {
            type: 'object',
            properties: {
              title: { type: 'string' },
              url: { type: 'string' },
              description: { type: 'string' }
            },
            description: 'Ad content'
          },
          route_path: {
            type: 'string',
            description: 'Route path to link to'
          }
        },
        required: ['variable_name', 'keywords', 'ad_content', 'route_path']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'create_git_branch',
      description: 'Create a new git branch for the landing page',
      parameters: {
        type: 'object',
        properties: {
          branch_name: {
            type: 'string',
            description: 'Branch name (e.g., "feat/landing-romance")'
          }
        },
        required: ['branch_name']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'commit_and_push',
      description: 'Commit changes and push to remote',
      parameters: {
        type: 'object',
        properties: {
          commit_message: {
            type: 'string',
            description: 'Commit message'
          },
          branch_name: {
            type: 'string',
            description: 'Branch name to push'
          }
        },
        required: ['commit_message', 'branch_name']
      }
    }
  },
  {
    type: 'function',
    function: {
      name: 'create_pull_request',
      description: 'Create a pull request on GitHub',
      parameters: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            description: 'PR title'
          },
          body: {
            type: 'string',
            description: 'PR description'
          },
          branch_name: {
            type: 'string',
            description: 'Source branch name'
          }
        },
        required: ['title', 'body', 'branch_name']
      }
    }
  }
];

export async function executeTool(toolName: string, args: any): Promise<any> {
  switch (toolName) {
    case 'generate_keywords':
      return generateKeywords(args.theme);
    
    case 'fetch_book_recommendations':
      return fetchBookRecommendations(args.search_term);
    
    case 'generate_content':
      return generateContent(args.theme, args.keywords, args.books);
    
    case 'write_page_file':
      return writePageFile(args.page_name, args.content);
    
    case 'update_app_routes':
      return updateAppRoutes(args.page_name, args.route_path);
    
    case 'update_search_results':
      return updateSearchResults(args.variable_name, args.keywords, args.ad_content, args.route_path);
    
    case 'create_git_branch':
      return createGitBranch(args.branch_name);
    
    case 'commit_and_push':
      return commitAndPush(args.commit_message, args.branch_name);
    
    case 'create_pull_request':
      return createPullRequest(args.title, args.body, args.branch_name);
    
    default:
      throw new Error(`Unknown tool: ${toolName}`);
  }
}

async function generateKeywords(theme: string): Promise<string[]> {
  // Simple keyword generation based on theme
  const baseKeywords = theme.toLowerCase().split(' ');
  const keywords = [
    theme.toLowerCase(),
    `${theme} 2025`,
    `best ${theme}`,
    `${theme} audiobooks`,
    `${theme} ebooks`,
    `top ${theme}`,
    `popular ${theme}`,
    `${theme} recommendations`,
    `listen to ${theme}`,
    `stream ${theme}`,
    `${theme} nextory`,
    `trending ${theme}`
  ];
  return keywords;
}

async function fetchBookRecommendations(searchTerm: string): Promise<any[]> {
  // Mock implementation - in real scenario would call actual API
  // For demo, return placeholder books
  return [
    { id: 1, title: `Popular ${searchTerm} Book 1`, author: 'Author One', cover: '/book-covers/placeholder.svg' },
    { id: 2, title: `Popular ${searchTerm} Book 2`, author: 'Author Two', cover: '/book-covers/placeholder.svg' },
    { id: 3, title: `Popular ${searchTerm} Book 3`, author: 'Author Three', cover: '/book-covers/placeholder.svg' },
    { id: 4, title: `Popular ${searchTerm} Book 4`, author: 'Author Four', cover: '/book-covers/placeholder.svg' },
    { id: 5, title: `Popular ${searchTerm} Book 5`, author: 'Author Five', cover: '/book-covers/placeholder.svg' },
    { id: 6, title: `Popular ${searchTerm} Book 6`, author: 'Author Six', cover: '/book-covers/placeholder.svg' }
  ];
}

async function generateContent(theme: string, keywords: string[], books: any[]): Promise<any> {
  const capitalizedTheme = theme.charAt(0).toUpperCase() + theme.slice(1);
  
  return {
    title: `Discover the Best ${capitalizedTheme} on Nextory`,
    subtitle: `Stream unlimited ${theme} audiobooks and e-books. Start your free 30-day trial today.`,
    adTitle: `Best ${capitalizedTheme} Audiobooks 2025 - Listen on Nextory`,
    adDescription: `Discover trending ${theme} everyone is talking about. Unlimited streaming of bestselling ${theme}. Start your free trial today.`,
    features: [
      {
        title: 'Unlimited Access',
        description: `Listen to thousands of ${theme} audiobooks and e-books`
      },
      {
        title: 'New Releases',
        description: `Get access to the latest ${theme} as soon as they're released`
      },
      {
        title: 'Offline Listening',
        description: `Download your favorite ${theme} and listen anywhere`
      }
    ],
    books: books.slice(0, 12)
  };
}

async function writePageFile(pageName: string, content: any): Promise<{ success: boolean }> {
  const code = generatePageCode(pageName, content);
  const filePath = path.join(process.cwd(), 'src', 'pages', `${pageName}.tsx`);
  await fs.writeFile(filePath, code, 'utf-8');
  return { success: true, path: filePath };
}

async function updateAppRoutes(pageName: string, routePath: string): Promise<{ success: boolean }> {
  const appPath = path.join(process.cwd(), 'src', 'App.tsx');
  let content = await fs.readFile(appPath, 'utf-8');
  
  // Add import
  const importLine = `import ${pageName} from "./pages/${pageName}";`;
  if (!content.includes(importLine)) {
    content = content.replace(
      /import NotFound from "\.\/pages\/NotFound";/,
      `import NotFound from "./pages/NotFound";\n${importLine}`
    );
  }
  
  // Add route before the catch-all
  const routeLine = `          <Route path="${routePath}" element={<${pageName} />} />`;
  if (!content.includes(routeLine)) {
    content = content.replace(
      /\s+{\/\* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "\*" ROUTE \*\/}/,
      `\n${routeLine}\n          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}`
    );
  }
  
  await fs.writeFile(appPath, content, 'utf-8');
  return { success: true };
}

async function updateSearchResults(
  variableName: string,
  keywords: string[],
  adContent: any,
  routePath: string
): Promise<{ success: boolean }> {
  const searchPath = path.join(process.cwd(), 'src', 'pages', 'SearchResults.tsx');
  let content = await fs.readFile(searchPath, 'utf-8');
  
  // Add keywords array
  const keywordsCode = `\n  const ${variableName} = ${JSON.stringify(keywords, null, 4)};\n`;
  content = content.replace(
    /const comparisonKeywords = \[[\s\S]*?\];/,
    `$&${keywordsCode}`
  );
  
  // Add matching logic
  const checkVarName = variableName.replace('Keywords', 'Related');
  const matchingCode = `\n  const is${checkVarName.charAt(0).toUpperCase() + checkVarName.slice(1)} = ${variableName}.some(keyword => \n    query.toLowerCase().includes(keyword.toLowerCase())\n  );\n`;
  content = content.replace(
    /const isComparisonRelated = comparisonKeywords[\s\S]*?\);/,
    `$&${matchingCode}`
  );
  
  // Update hasResults
  content = content.replace(
    /const hasResults = ([^;]+);/,
    `const hasResults = $1 || is${checkVarName.charAt(0).toUpperCase() + checkVarName.slice(1)};`
  );
  
  // Add sponsored ad
  const adCode = `\n            {/* Sponsored Ad - ${variableName.replace('Keywords', '')} */}
            {is${checkVarName.charAt(0).toUpperCase() + checkVarName.slice(1)} && (
              <div className="mb-6 p-4 border-l-4 border-blue-600 bg-blue-50 rounded-md">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2 py-0.5 bg-white border border-gray-300 rounded">Ad</span>
                </div>
                <Link to="${routePath}" className="block hover:underline">
                  <h3 className="text-xl text-blue-700 font-medium mb-1">
                    ${adContent.title}
                  </h3>
                  <p className="text-sm text-green-700 mb-2">www.nextory.com${routePath}</p>
                  <p className="text-sm text-gray-700">
                    ${adContent.description}
                  </p>
                </Link>
              </div>
            )}\n`;
  
  content = content.replace(
    /\{isComparisonRelated && \([\s\S]*?\)\}/,
    `$&${adCode}`
  );
  
  await fs.writeFile(searchPath, content, 'utf-8');
  return { success: true };
}

async function createGitBranch(branchName: string): Promise<{ success: boolean }> {
  await git.checkoutLocalBranch(branchName);
  return { success: true, branch: branchName };
}

async function commitAndPush(commitMessage: string, branchName: string): Promise<{ success: boolean }> {
  await git.add('.');
  await git.commit(commitMessage);
  // skipping for now since remote is not set
  // await git.push('origin', branchName);
  return { success: true };
}

async function createPullRequest(title: string, body: string, branchName: string): Promise<{ success: boolean }> {
  const githubToken = process.env.GITHUB_TOKEN;
  if (!githubToken) {
    console.warn('⚠️  GITHUB_TOKEN not set, skipping PR creation');
    return { success: false, message: 'GITHUB_TOKEN not set' };
  }
  
  const octokit = new Octokit({ auth: githubToken });
  
  // Get repo info from git remote
  const remotes = await git.getRemotes(true);
  const origin = remotes.find(r => r.name === 'origin');
  if (!origin?.refs?.push) {
    throw new Error('No origin remote found');
  }
  
  // Parse owner and repo from URL
  const match = origin.refs.push.match(/github\.com[:/](.+?)\/(.+?)(\.git)?$/);
  if (!match) {
    throw new Error('Could not parse GitHub repo from remote');
  }
  
  const [, owner, repo] = match;
  
  const pr = await octokit.pulls.create({
    owner,
    repo: repo.replace('.git', ''),
    title,
    body,
    head: branchName,
    base: 'main'
  });
  
  return { success: true, pr_url: pr.data.html_url };
}

