import fs from 'fs/promises';
import path from 'path';
import simpleGit from 'simple-git';
import { Octokit } from '@octokit/rest';
import OpenAI from 'openai';
import { generatePageCode, generateSearchResultsUpdate, generateRouteUpdate } from './templates';

// Node.js 18+ has built-in fetch
const fetch = globalThis.fetch;

const git = simpleGit();

async function createAIClient(apiKey: string) {
  return new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
    defaultHeaders: {
      'HTTP-Referer': 'https://github.com/booktok-hype-hub',
      'X-Title': 'BookTok Landing Page Agent'
    }
  });
}

async function callAI(client: OpenAI, model: string, messages: OpenAI.Chat.ChatCompletionMessageParam[], providerOrder: string[] = ['moonshotai/int4']): Promise<string> {
  const response = await client.chat.completions.create({
    model,
    messages,
    temperature: 0.7,
    max_tokens: 4096,
    provider: {
      order: providerOrder,
      allow_fallbacks: false
    }
  } as any);

  return response.choices[0].message.content || '';
}

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

export async function executeTool(toolName: string, args: any, apiKey?: string): Promise<any> {
  switch (toolName) {
    case 'generate_keywords':
      return generateKeywords(args.theme, apiKey);
    
    case 'fetch_book_recommendations':
      return fetchBookRecommendations(args.search_term);
    
    case 'generate_content':
      return generateContent(args.theme, args.keywords, args.books, apiKey);
    
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

async function generateKeywords(theme: string, apiKey?: string): Promise<string[]> {
  if (!apiKey) {
    throw new Error('API key required for AI-powered keyword generation');
  }

  const client = await createAIClient(apiKey);

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: 'You are a SEO expert. Generate 8-12 relevant SEO keywords for a book landing page theme.'
    },
    {
      role: 'user',
      content: `Generate SEO keywords for a landing page about "${theme}". Include variations like audiobooks, ebooks, recommendations, trending, etc. Use the submit_keywords tool to return your results.`
    }
  ];

  const tools = [
    {
      type: 'function',
      function: {
        name: 'submit_keywords',
        description: 'Submit the generated SEO keywords',
        parameters: {
          type: 'object',
          properties: {
            keywords: {
              type: 'array',
              items: { type: 'string' },
              description: 'Array of 8-12 SEO keywords'
            }
          },
          required: ['keywords']
        }
      }
    }
  ];

  try {
    const response = await client.chat.completions.create({
      model: 'moonshotai/kimi-k2-thinking',
      messages,
      tools: tools as any,
      tool_choice: { type: 'function', function: { name: 'submit_keywords' } } as any,
      temperature: 0.7,
      provider: {
        order: ['moonshotai/int4'],
        allow_fallbacks: false
      }
    } as any);

    const toolCall = response.choices[0].message.tool_calls?.[0];
    if (toolCall && toolCall.function.name === 'submit_keywords') {
      const args = JSON.parse(toolCall.function.arguments);
      console.log('AI generated keywords via tool call:', args.keywords);
      return Array.isArray(args.keywords) ? args.keywords : [];
    }

    throw new Error('No tool call found in response');
  } catch (error) {
    // Fallback to basic keywords if parsing fails
    console.warn('Failed to get AI keywords via tool call, using fallback:', error);
    return [
      theme.toLowerCase(),
      `best ${theme}`,
      `${theme} audiobooks`,
      `${theme} ebooks`,
      `top ${theme}`,
      `popular ${theme}`,
      `${theme} recommendations`,
      `trending ${theme}`
    ];
  }
}

async function fetchBookRecommendations(searchTerm: string): Promise<any[]> {
  try {
    // Create a more descriptive search term for better results
    const descriptiveSearchTerm = `${searchTerm} books`;
    const encodedSearchTerm = encodeURIComponent(descriptiveSearchTerm);
    const apiUrl = `https://apistaging.nextory.com/discovery/v1/search/products/books?search_phrase=${encodedSearchTerm}&page=0&per=12&format=ebook,audiobook&sort=relevance`;

    console.log(`Fetching book recommendations from: ${apiUrl}`);

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'x-app-version': '52.102',
        'x-application-id': '203',
        'x-country-code': 'SE',
        'x-device-id': '2ad15bd7-28a5-41ae-a3a9-35087b9ad077',
        'x-locale': 'sv_SE',
        'x-model': 'web',
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.products || !Array.isArray(data.products)) {
      console.warn('API response does not contain products array, falling back to mock data');
      console.warn('Response structure:', Object.keys(data));
      return getFallbackBooks(searchTerm);
    }

    if (data.products.length === 0) {
      console.warn('API returned empty products array, falling back to mock data');
      return getFallbackBooks(searchTerm);
    }

    // Transform API response to match expected format
    const books = data.products.slice(0, 12).map((product: any) => {
      // Extract first author name
      const author = product.authors && product.authors.length > 0
        ? product.authors[0].name
        : 'Unknown Author';

      // Extract cover image URL - prefer formats with images
      let cover = '/book-covers/placeholder.svg';
      if (product.formats && product.formats.length > 0) {
        // Find the first format that has an img_url
        const formatWithImage = product.formats.find((format: any) => format.img_url);
        if (formatWithImage?.img_url) {
          // Remove query parameters and use default size
          cover = formatWithImage.img_url.split('?')[0];
        }
      }

      return {
        id: product.id,
        title: product.title || 'Unknown Title',
        author,
        cover,
        // Optional: include additional metadata that might be useful
        rating: product.average_rating || 0,
        ratings_count: product.number_of_rates || 0,
      };
    });

    console.log(`Successfully fetched ${books.length} book recommendations`);
    return books;

  } catch (error) {
    console.error('Error fetching book recommendations:', error);
    console.log('Falling back to mock data');
    return getFallbackBooks(searchTerm);
  }
}

function getFallbackBooks(searchTerm: string): any[] {
  return [
    { id: 1, title: `Popular ${searchTerm} Book 1`, author: 'Author One', cover: '/book-covers/placeholder.svg' },
    { id: 2, title: `Popular ${searchTerm} Book 2`, author: 'Author Two', cover: '/book-covers/placeholder.svg' },
    { id: 3, title: `Popular ${searchTerm} Book 3`, author: 'Author Three', cover: '/book-covers/placeholder.svg' },
    { id: 4, title: `Popular ${searchTerm} Book 4`, author: 'Author Four', cover: '/book-covers/placeholder.svg' },
    { id: 5, title: `Popular ${searchTerm} Book 5`, author: 'Author Five', cover: '/book-covers/placeholder.svg' },
    { id: 6, title: `Popular ${searchTerm} Book 6`, author: 'Author Six', cover: '/book-covers/placeholder.svg' }
  ];
}

async function generateContent(theme: string, keywords: string[], books: any[], apiKey?: string): Promise<any> {
  if (!apiKey) {
    throw new Error('API key required for AI-powered content generation');
  }

  const client = await createAIClient(apiKey);

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `You are a marketing copywriter specializing in book landing pages for Nextory (a European audiobook/ebook service).
Generate compelling content for a landing page about "${theme}" books.
Focus on:
- Scandinavian market (mention free 30-day trial)
- Unlimited streaming of audiobooks and ebooks
- Trending/popular content
- BookTok-style hype and discovery
- Use the provided keywords naturally in the content`
    },
    {
      role: 'user',
      content: `Generate landing page content for the theme "${theme}" with these SEO keywords: ${keywords.join(', ')}.
Available books: ${books.slice(0, 6).map(b => `"${b.title}" by ${b.author}`).join(', ')}.

Create engaging, conversion-focused copy that would appear on a book discovery landing page. Use the submit_content tool to return your results.`
    }
  ];

  const tools = [
    {
      type: 'function',
      function: {
        name: 'submit_content',
        description: 'Submit the generated landing page content',
        parameters: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              description: 'SEO-optimized page title'
            },
            subtitle: {
              type: 'string',
              description: 'Engaging subtitle encouraging free trial signup'
            },
            adTitle: {
              type: 'string',
              description: 'Compelling ad title for sponsored content'
            },
            adDescription: {
              type: 'string',
              description: 'Persuasive ad description highlighting benefits'
            },
            features: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  title: { type: 'string' },
                  description: { type: 'string' }
                },
                required: ['title', 'description']
              },
              description: 'Array of 3-4 feature objects with title and description'
            }
          },
          required: ['title', 'subtitle', 'adTitle', 'adDescription', 'features']
        }
      }
    }
  ];

  try {
    const response = await client.chat.completions.create({
      model: 'moonshotai/kimi-k2-thinking',
      messages,
      tools: tools as any,
      tool_choice: { type: 'function', function: { name: 'submit_content' } } as any,
      temperature: 0.7,
      max_tokens: 4096,
      provider: {
        order: ['moonshotai/int4'],
        allow_fallbacks: false
      }
    } as any);

    const toolCall = response.choices[0].message.tool_calls?.[0];
    if (toolCall && toolCall.function.name === 'submit_content') {
      const content = JSON.parse(toolCall.function.arguments);
      console.log('AI generated content via tool call:', content);
      // Ensure books array is included
      content.books = books.slice(0, 12);
      return content;
    }

    throw new Error('No tool call found in response');
  } catch (error) {
    console.warn('Failed to get AI content via tool call, using fallback:', error);
    // Fallback to original hardcoded content
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
}

async function writePageFile(pageName: string, content: any): Promise<{ success: boolean; path: string }> {
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

async function createGitBranch(branchName: string): Promise<{ success: boolean; branch: string }> {
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

async function createPullRequest(title: string, body: string, branchName: string): Promise<{ success: boolean; message?: string; pr_url?: string }> {
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

