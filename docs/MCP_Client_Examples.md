# MCP Client Examples

## Authentication

### Get Access Token
```javascript
const response = await fetch('/api/mcp/auth', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    apiKey: 'your-api-key-here'
  })
});

const { success, data, error } = await response.json();

if (success) {
  const { token, agent } = data;
  console.log('Authenticated as:', agent.name);
  // Store token for subsequent requests
  localStorage.setItem('mcpToken', token);
}
```

## Collections

### List All Collections
```javascript
const token = localStorage.getItem('mcpToken');

const response = await fetch('/api/mcp/collections', {
  headers: {
    'Authorization': `Bearer ${token}`,
  }
});

const { success, data } = await response.json();
if (success) {
  console.log('Available collections:', data.collections);
}
```

### Get Collection Schema
```javascript
const response = await fetch('/api/mcp/collections/pages', {
  headers: {
    'Authorization': `Bearer ${token}`,
  }
});

const { success, data } = await response.json();
if (success) {
  console.log('Pages collection schema:', data.collection);
}
```

### Query Documents
```javascript
const queryParams = new URLSearchParams({
  page: '1',
  limit: '10',
  where: JSON.stringify({ _status: 'published' }),
  populate: JSON.stringify(['author']),
  sort: 'createdAt.desc'
});

const response = await fetch(`/api/mcp/collections/pages/documents?${queryParams}`, {
  headers: {
    'Authorization': `Bearer ${token}`,
  }
});

const { success, data } = await response.json();
if (success) {
  console.log('Found documents:', data.docs);
  console.log('Total:', data.totalDocs);
}
```

### Create Document
```javascript
const response = await fetch('/api/mcp/collections/pages/documents', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    data: {
      title: 'New Page Created by AI',
      slug: 'ai-created-page',
      _status: 'draft',
      layout: [
        {
          blockType: 'content',
          columns: [
            {
              size: 'full',
              richText: {
                root: {
                  type: 'root',
                  children: [
                    {
                      type: 'paragraph',
                      children: [
                        {
                          type: 'text',
                          text: 'This page was created by an AI agent using the MCP API.',
                          version: 1
                        }
                      ],
                      version: 1
                    }
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  version: 1
                }
              }
            }
          ]
        }
      ]
    }
  })
});

const { success, data } = await response.json();
if (success) {
  console.log('Created document:', data.doc);
}
```

## Globals

### List All Globals
```javascript
const response = await fetch('/api/mcp/globals', {
  headers: {
    'Authorization': `Bearer ${token}`,
  }
});

const { success, data } = await response.json();
if (success) {
  console.log('Available globals:', data.globals);
}
```

## Health Check

### Check MCP Server Status
```javascript
const response = await fetch('/api/mcp/health');
const { success, data } = await response.json();

if (success) {
  console.log('MCP Server Status:', data.status);
  console.log('Success Rate:', data.stats.successRate);
  console.log('Active Agents:', data.agents.active);
}
```

## Error Handling

```javascript
async function mcpRequest(url, options = {}) {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('mcpToken')}`,
        'Content-Type': 'application/json',
        ...options.headers,
      }
    });

    const result = await response.json();

    if (!result.success) {
      throw new Error(`MCP Error: ${result.error.message}`);
    }

    return result.data;
  } catch (error) {
    console.error('MCP Request failed:', error);
    throw error;
  }
}

// Usage
try {
  const collections = await mcpRequest('/api/mcp/collections');
  console.log('Collections:', collections);
} catch (error) {
  console.error('Failed to fetch collections:', error.message);
}
```

## Environment Variables

Add these to your `.env.local` file:

```env
# MCP Server Configuration
MCP_SECRET_KEY=your-super-secret-jwt-key-here
MCP_JWT_EXPIRY=24h
MCP_RATE_LIMIT_ENABLED=true
MCP_AUDIT_LOG_ENABLED=true

# AI Agent API Keys
MCP_CHATGPT_API_KEY=chatgpt-agent-api-key
MCP_LEO_API_KEY=leo-site-ai-api-key
MCP_ADMIN_API_KEY=admin-agent-api-key
```







