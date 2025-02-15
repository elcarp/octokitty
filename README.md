## GitHub Profile Finder - Next.js Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

To run the project locally, clone the repository and install dependencies:

git clone https://github.com/elcarp/octokitty.git
cd octokitty

# Install dependencies
npm install  # or yarn install / pnpm install / bun install


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel and [Mansalva], 
a fun handwriting style font.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Octokit REST API](https://octokit.github.io/rest.js/) - GitHub REST API client for JavaScript/TypeScript

## 🔍 Features  

- ✅ **GitHub User Search** – Search for any GitHub user and retrieve their profile info.  
- ✅ **Public Repository Listing** – View a user's repositories with descriptions and links.  
- ✅ **Octokit REST API Integration** – Efficient and secure API requests to GitHub.  
- ✅ **Debounced Input** – Prevents excessive API calls while typing.  
- ✅ **Pagination** – Browse through repositories with Next/Previous buttons.  
- ✅ **Language Switcher** – Switch between English 🇬🇧 and a fun cat-themed mode 🐈.  

## 🔑 Environment Variables

- To use the GitHub API, create a .env.local file and add: 
- NEXT_PUBLIC_GITHUB_TOKEN=your_personal_access_token
- This ensures authenticated API requests with a higher rate limit.

## 🛠 Development
- Modify the main page at app/page.tsx – changes auto-refresh in development.
- The project uses next/font to optimize and load Geist, a modern font from Vercel.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 💡 Contributing
👾 Want to improve the project? Feel free to open issues, submit PRs, or suggest new features!
🔗 Happy coding! 🚀🐙🐈
