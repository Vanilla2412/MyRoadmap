# My Roadmap 🚀

> A modern learning task management application to help you track and organize your learning journey systematically.

**[日本語版 README はこちら](./README.ja.md) | [Japanese README Available](./README.ja.md)**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![AWS Amplify](https://img.shields.io/badge/AWS-Amplify_Gen_2-orange)](https://aws.amazon.com/amplify/)

---

## 📋 Overview

**My Roadmap** is a full-stack learning task management application built with modern web technologies and AWS cloud infrastructure. It enables users to create, organize, and track their learning tasks with features like priority management, categorization, and deadline tracking.

This project demonstrates:

- ✅ **Modern Frontend**: Next.js App Router with TypeScript and Tailwind CSS
- ✅ **Cloud-Native Backend**: AWS Amplify Gen 2 (Infrastructure as Code)
- ✅ **Serverless Architecture**: AWS AppSync (GraphQL), DynamoDB, and Cognito
- ✅ **Best Practices**: Type safety, security-first design, and comprehensive documentation

🔗 **Live Demo**: _(Coming Soon)_

---

## 🛠️ Tech Stack

### Frontend

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)

### Backend & Infrastructure

- **IaC**: [AWS Amplify Gen 2](https://docs.amplify.aws/) (TypeScript-based)
- **Authentication**: [Amazon Cognito](https://aws.amazon.com/cognito/)
- **Database**: [Amazon DynamoDB](https://aws.amazon.com/dynamodb/)
- **API**: [AWS AppSync](https://aws.amazon.com/appsync/) (GraphQL)

### CI/CD

- **Version Control**: GitHub
- **Pipeline**: GitHub Actions

---

## ✨ Features (Phase 1 - MVP)

### Core Task Management

- ✅ **Create, Read, Update, Delete** learning tasks
- ✅ **Task Properties**: Title, Status, Priority, Due Date, Category
- ✅ **Status Tracking**: NOT_STARTED → IN_PROGRESS → COMPLETED
- ✅ **Priority Levels**: HIGH, MEDIUM, LOW

### Organization & Filtering

- ✅ Filter tasks by status, priority, and category
- ✅ Sort tasks by due date and priority
- ✅ Visual status indicators and deadline highlights

### Security & Authentication

- ✅ AWS Cognito authentication with email verification
- ✅ Password complexity enforcement
- ✅ JWT-based authorization
- ✅ Row-level security (users can only access their own tasks)

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18.17 or higher
- **npm**: v9 or higher
- **AWS Account**: For deploying backend infrastructure (optional for local development)

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Vanilla2412/MyRoadmap.git
   cd MyRoadmap
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run documentation site (VitePress)**
   ```bash
   npm run docs:dev
   ```
   The documentation will be available at `http://localhost:5173`

### Running the Application

_(Implementation in progress - this section will be updated once the Next.js app is scaffolded)_

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 📁 Project Structure

```
MyRoadmap/
├── docs/                      # VitePress documentation
│   ├── .vitepress/           # VitePress configuration
│   ├── requirements.md       # Comprehensive requirements specification
│   └── index.md              # Documentation homepage
├── .gitignore                # Git ignore patterns
├── package.json              # Project dependencies and scripts
├── README.md                 # This file (English)
├── README.ja.md              # Japanese README
└── LICENSE                   # MIT License
```

---

## 📚 Documentation

Comprehensive project documentation is available via VitePress:

- **Requirements Specification**: See [`docs/requirements.md`](./docs/requirements.md)
- **System Architecture**: Detailed diagrams and data flow
- **API Design**: GraphQL schema and resolver specifications
- **Security Guidelines**: Authentication, authorization, and best practices

To view the documentation locally:

```bash
npm run docs:dev
```

---

## 🗺️ Roadmap

### Phase 1 - MVP ✅ (In Progress)

- [x] Define comprehensive requirements
- [ ] Scaffold Next.js application
- [ ] Implement AWS Amplify Gen 2 backend
- [ ] Build task management UI
- [ ] Deploy to AWS

### Phase 2 - Advanced Features 🔮

- [ ] Subtasks and nested tasks
- [ ] Time tracking (estimated vs. actual hours)
- [ ] Learning resources (URLs, attachments)
- [ ] Progress analytics and insights
- [ ] Multi-Factor Authentication (MFA)

See [`docs/requirements.md`](./docs/requirements.md) for the complete feature roadmap.

---

## 🤝 Contributing

This is a personal learning project, but feedback and suggestions are welcome! Feel free to:

- Open an issue for bug reports or feature suggestions
- Submit a pull request for improvements

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](./LICENSE) file for details.

---

## 👤 Author

**Vanilla2412**

- GitHub: [@Vanilla2412](https://github.com/Vanilla2412)
- Project Link: [https://github.com/Vanilla2412/MyRoadmap](https://github.com/Vanilla2412/MyRoadmap)

---

**Built with ❤️ and modern web technologies**
