# 🚀 Gen AI Analytics Query Engine

## Overview

A lightweight backend service that simulates a simplified version of a Gen AI Analytics data query system. Transform natural language queries into powerful database insights with ease.

![Project Banner](https://via.placeholder.com/1200x400?text=Gen+AI+Analytics+Query+Engine)

## 🌟 Key Features

- **Natural Language Queries**: Ask complex business questions in plain English
- **SQL Translation**: Automatically convert natural language to optimized SQL queries
- **Query Validation**: Ensure query compatibility with your database schema
- **Detailed Query Explanations**: Get insights into query execution and optimization

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js
- **API Routing**: Express.js

### Database
- **Provider**: Neon PostgreSQL
- **Query Language**: SQL

### Frontend
- **UI Library**: React
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui

### AI Integration
- **LLM Provider**: Groq API
- **AI SDK**: For seamless AI integration

### Deployment
- **Hosting**: Vercel
- **Version Control**: GitHub

### Development
- **Language**: TypeScript
- **Linting**: ESLint
- **Formatting**: Prettier

## 🚦 Quick Start

### Prerequisites
- Node.js
- npm or yarn
- PostgreSQL database

### Installation

1. Clone the repository
```bash
git clone https://github.com/sagarmanchakatla/gen-ai-analysis.git
```

2. Install dependencies
```bash
cd gen-ai-analysis
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
# Fill in your database and API credentials
```

4. Run the development server
```bash
npm run dev
```

## 📘 API Endpoints

### Data Endpoint
`POST /api/data`
- Return the data present in the database
`curl --location 'https://gen-ai-analysis.vercel.app/api/data'`

### Query Endpoint
`POST /api/query`
- Accept natural language query
- Returns SQL and query results
`  curl --location 'https://gen-ai-analysis.vercel.app/api/query' \
--header 'Content-Type: application/json' \
--data '{
    "query": "Get all from transaction where sales amount is more than and equal 6000"
}'`

### Explain Endpoint
`POST /api/explain`
- Provides detailed query explanation
- Includes execution plan and optimization suggestions
`curl --location 'https://gen-ai-analysis.vercel.app/api/explain' \
--header 'Content-Type: application/json' \
--data '{
    "query": "Get all from transaction where sales amount is more than 6000"
}'`

### Validate Endpoint
`POST /api/validate`
- Validates SQL query against database schema
`curl --location 'https://gen-ai-analysis.vercel.app/api/validate' \
--header 'Content-Type: application/json' \
--data '{
    "query": "SELECT sales FROM transactions WHERE product = '\''Smartphone'\'';"
}'`

## 🔐 Authentication

The demo uses a simplified authentication mechanism. For production, implement robust authentication like OAuth 2.0 or JWT.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 🌐 Contact

Sagar Manchakatla - [@your_twitter](https://twitter.com/your_twitter)

Project Link: [https://github.com/sagarmanchakatla/gen-ai-analysis](https://github.com/sagarmanchakatla/gen-ai-analysis)

---

**Disclaimer**: This is a demo project. Always ensure proper security and performance testing before production use.
