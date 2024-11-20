# Gardening Tips & Advice Platform (plantify)

The Gardening Tips & Advice Platform is a comprehensive full-stack web application designed for gardening enthusiasts and professionals to share, discover, and engage with gardening knowledge. It will provide users with insightful tips, plant care advice, seasonal guides, and techniques to enhance their gardening experiences. Additionally, users can share their gardening knowledge, interact with others, and explore premium content through a seamless payment integration.
The platform aims to foster a vibrant community where users can post gardening advice, upvote content, comment, follow other users, and share their experiences. Key features include a rich text editor for content creation, user authentication, premium content access via payments, and social interaction tools. It will blend informative gardening content with an interactive community-focused experience.

## Live URL

[Live Deployment Link](https://plantify-server.vercel.app/)

## Technology Stack & Packages

**Backend:** List backend technologies ( Node.js, Express, MongoDB,Mongoose (ORM))

## Setup Instructions

Follow these steps to set up and run the project locally:

1. **Clone the repository:** `git clone https://github.com/fahimcce/plantify-server `
2. **Navigate to the project directory:** `cd plantify-server `
3. **Install dependencies:** `npm install `
4. **Set up environment variables:** Create a `.env` file in the root directory and add the required environment variables :
   NODE_ENV=
   PORT=
   DATABASE_URL=

BCRYPT_SALT_ROUNDS=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=
JWT_REFRESH_EXPIRES_IN=

##### Cloudinary Credentials

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

DEFAULT_PASSWORD=
STRIPE_SECRET_KEY=
CLIENT_SITE_URL=

5. **Run the application:** Start the development server. `npm run dev `
6. **Build the project for production (if applicable):** `npm run build `
