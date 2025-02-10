This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started &#9774;

First, clone the repository:

```bash
git clone https://github.com/gabrielanathasya/FE-test-disney-hotstar.git
cd FE-test-disney-hotstar
```

Install the dependencies:

```
npm install
```

Set up your environment variables:

Create a `.env.local` file in the root directory
Add the following variables to your .`env.local` file:

```
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_TMDB_BASE_URL=tdmb_database_url
NEXT_PUBLIC_TMDB_IMAGE_BASE_URL=tmdb_image_base_url
```

Replace the values with your actual configuration.

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

This project requires the following environment variables to be set in your `.env.local` file:

- `NEXT_PUBLIC_TMDB_BASE_URL`: Tmdb database connection string
- `NEXT_PUBLIC_TMDB_API_KEY`: Your API key for Tmdb services
- `NEXT_PUBLIC_TMDB_IMAGE_BASE_URL`: The URL to fetch images from Tmdb

## Architecture and Approach

This application is built with the following architectural decisions:

**Server-Side Rendering (SSR)**: Implemented using React's fetch capabilities to optimize performance and SEO.
**State Management**: Utilizes React Context for centralized operations and localStorage management.
**Component Structure**: Follows Atomic Design principles, organizing components into atoms that serve as building blocks for larger components, reducing redundancy.
**UI Priority**: Desktop-first approach for the user interface development.
**API Architecture**:

- Centralized API client for core functionality
- Feature-based service separation for better maintainability
- Modular approach to API integration
