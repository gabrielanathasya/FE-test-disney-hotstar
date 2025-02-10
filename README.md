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

`NEXT_PUBLIC_TMDB_BASE_URL`: Tmdb database connection string
`NEXT_PUBLIC_TMDB_API_KEY`: Your API key for Tmdb services
`NEXT_PUBLIC_TMDB_IMAGE_BASE_URL`: The URL to fetch images from Tmdb

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
