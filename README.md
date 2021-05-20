frankbosma.nl is made with [Next.js](https://nextjs.org/) and [Strapi](http://strapi.io/)

## Getting Started

First things first: use [Node.js](https://nodejs.org/en/) >= v10.
Do an `npm install` to install all necessary requirements.

### Offline mode / if you don't have the Strapi CMS and database
run the development server in offline mode:

```bash
npm run dev:offline
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the website.

The website will run with static CMS data as defined in `next.config.js`, environment
variable `NEXT_PUBLIC_DATA_PATH`. 

### Create a static version
frankbosma.nl can be built as a static website with no need for a NodeJS back end. 
For that run the development server in offline (`npm run dev:offline`) mode 
and build the static version through `npm run export`.

The static version makes use of the static data as configured in `next.config.js`, 
environment variable `NEXT_PUBLIC_DATA_PATH`. The running server is needed to fetch
the data. 

A static version of the site is created under `/out` which you can then run on any
web server.

Or you can try it out locally with `npm run serve:export` and visit 
[http://localhost:3001](http://localhost:3001).
 
### Using Strapi
When Strapi is installed, including the 
[GraphQL plugin](https://strapi.io/documentation/3.0.0-beta.x/plugins/graphql.html),
you can run regular dev mode `npm run dev` 
so content is fetched on the fly from the Strapi database. 

Appropriate API URLs are configured in the `.env` in the root. See the Next.js
docs on [environment variables](https://nextjs.org/docs/basic-features/environment-variables)
for local / test / production configuration if you need that.

#### Todo
Of course you need the proper database content in order to use Strapi with
frankbosma.nl. I will update this repository soon with the setup. Of course if you're
eager you can reverse engineer it through the GraphQL content of `/pages/api/home.js`
or the GraphQL schema in `/strapi`.
