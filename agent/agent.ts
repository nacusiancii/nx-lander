#!/usr/bin/env node
import OpenAI from 'openai';
import * as readline from 'readline';
import { tools, executeTool } from './tools';
import simpleGit from 'simple-git';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(query: string): Promise<string> {
  return new Promise(resolve => rl.question(query, resolve));
}

async function runAgent(apiKey: string) {
  const client = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: apiKey,
    defaultHeaders: {
      'HTTP-Referer': 'https://github.com/booktok-hype-hub',
      'X-Title': 'BookTok Landing Page Agent'
    }
  });

  console.log('\n🤖 Landing Page Agent Started!\n');
  
  const idea = await askQuestion('💡 What landing page idea do you have? (e.g., "romance books", "thriller audiobooks"): ');
  
  console.log('\n🧠 Agent thinking...\n');

  const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
    {
      role: 'system',
      content: `You are an autonomous landing page generator agent. Your goal is to:
1. Analyze the user's landing page idea
2. Generate SEO keywords (8-12 terms)
3. Fetch book recommendations
4. Generate page content (title, subtitle, ad copy, features)
5. Generate all necessary code files
6. Create a git branch and push code
7. Create a pull request

Use the provided tools to accomplish these tasks. Work step by step and use tools in sequence.
Be concise and efficient. Generate production-ready code following the requirements document patterns.`
    },
    {
      role: 'user',
      content: `Create a landing page for: "${idea}"\n\nRequirements doc location: docs/minimum_requirements_for_new_landing_page.md\nAPI endpoint for books: /api/recommendations?search={term}`
    }
  ];

  let continueLoop = true;
  let iterations = 0;
  const maxIterations = 15;

  while (continueLoop && iterations < maxIterations) {
    iterations++;
    
    const response = await client.chat.completions.create({
      model: 'moonshotai/kimi-k2-thinking',
      messages: messages,
      tools: tools as any,
      tool_choice: 'auto',
      temperature: 0.7,
      max_tokens: 4096,
      provider: {
        order: ['moonshotai/int4'],
        allow_fallbacks: false
      }
    });

    const assistantMessage = response.choices[0].message;
    messages.push(assistantMessage);

    if (assistantMessage.content) {
      console.log(`\n💬 Agent: ${assistantMessage.content}\n`);
    } else if (assistantMessage.refusal) {
      console.log(`\n💬 Agent: ${assistantMessage.refusal}\n`);
    } else {
      console.log(`\n💬 Agent is empty?: ${assistantMessage.content}\n`);
    }

    if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
      for (const toolCall of assistantMessage.tool_calls) {
        const toolName = toolCall.function.name;
        const toolArgs = JSON.parse(toolCall.function.arguments);
        
        console.log(`\n🔧 Executing: ${toolName}`);
        console.log(`   Args: ${JSON.stringify(toolArgs, null, 2)}`);
        
        try {
          const result = await executeTool(toolName, toolArgs);
          console.log(`   ✅ Result: ${JSON.stringify(result, null, 2).substring(0, 200)}...`);
          
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify(result)
          });
        } catch (error: any) {
          console.error(`   ❌ Error: ${error.message}`);
          messages.push({
            role: 'tool',
            tool_call_id: toolCall.id,
            content: JSON.stringify({ error: error.message })
          });
        }
      }
    } else {
      continueLoop = false;
    }
  }

  console.log('\n✨ Agent completed! Check your repository for the new branch and PR.\n');
  rl.close();
}

// Parse command line arguments
const args = process.argv.slice(2);
const keyIndex = args.indexOf('-k');

if (keyIndex === -1 || !args[keyIndex + 1]) {
  console.error('Usage: pnpm agent -k <openrouter-api-key>');
  process.exit(1);
}

const apiKey = args[keyIndex + 1];
runAgent(apiKey).catch(console.error);

