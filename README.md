# QX Code

QX Code is a SaaS platform that enables users to generate fully customizable QR codes for free. The generated QR codes can be downloaded and never expire. The application leverages modern web technologies to deliver a fast, scalable, and secure experience.

## Features

- **Customizable QR Codes** – Change colors, shapes, and branding elements.
- **Free and Permanent** – QR codes never expire and can be used indefinitely.
- **Modern UI** – Built using React 19 and Next.js 15 with a smooth and interactive user experience.
- **Server Actions** – Efficient server-side processing with React Server Actions.
- **Optimized Performance** – Implements server-side rendering (SSR) with React Server Components (RSC)

## Tech Stack

- **Frontend:** Next.js 15 (React 19, Server Components, SSR, SSG)
- **Styling:** Tailwind CSS
- **State Management & Data Fetching:** TanStack React Query
- **UI Components:** Radix UI
- **Authentication:** bcrypt & jsonwebtoken
- **QR Code Generation:** qrcode-with-logos
- **Deployment:** Vercel / AWS

## Live Demo

Check out the deployed version at: [QX Code](https://qxcode.tech)

## Installation

### Prerequisites

Ensure you have the following installed:

- Node.js 18+
- pnpm (preferred package manager)

### Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/qxcode.git
   cd qxcode
   ```
2. Install dependencies:
   ```sh
   pnpm install
   ```
3. Set up environment variables:
   - Copy `.env.example` to `.env.local` and update the values.
4. Run the development server:
   ```sh
   pnpm dev
   ```
   The app should now be running at `http://localhost:3000`.

## Build & Deployment

To build the application for production:

```sh
pnpm build
```

To start the production server:

```sh
pnpm start
```

## Contributing

We welcome contributions! Feel free to submit issues or pull requests to improve the project.

## License

This project is licensed under the MIT License.

---

🚀 Built with love and modern web technologies!
