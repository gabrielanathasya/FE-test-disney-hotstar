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

## Deployed on Vercel

This project is deployed on Vercel, follow this link to check it out (https://disney-hotstar-clone-liard.vercel.app/)https://disney-hotstar-clone-liard.vercel.app/

## Architecture and Approach

This application is built with the following decisions:

**Server-Side Rendering (SSR)**: Implemented using React's fetch capabilities to optimize performance and SEO. This approach also reduces client-side JavaScript bundle size and improves Core Web Vitals metrics by pre-rendering the content.

**State Management**: Utilizes React Context for centralized operations and localStorage management. Custom hooks are used to handle abstract logic for state mutations and simple implementation for components.

**Component Structure**:
Follows a hybrid approach of feature and domain driven structure. The shared components layer contains of reusable generic components that can be used on different domains. This layer has flat structure for easy discovery, and promotes consistent UI accross the application. The domain layer separates the code by feature (home, search, detail). Each domain contains specific components and business logic.

**API Architecture**:

- Centralized API client for core functionality
- Feature-based service separation for better maintainability
- Modular approach to API integration
- Structured for potential future microservices integration

**TypeScript Implementation**: Promotes interface-first approach for API contracts. Type definition can be shared for consistent data handling. Typescript's strict type checking reduces runtime errors.

**Development Priorities**:

- Desktop-first approach for initial MVP
- Focus on delivering core requirements within time constraints
- Scalable component architecture for future development
- Laying ground work foundation for feature additions

**Performance Optimizations**:

- Image lazy loading and fallback
- Component-level code splitting
- Minimum library used for efficient bundle size management
- API data caching

**Future Enhancements**:

- Mobile responsiveness and micro interaction
- Enhanced error handling
- Analytics integration
