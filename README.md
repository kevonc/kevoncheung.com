# kevoncheung.com

My personal website built with Next.js.

## Pages

- Articles Page: list all articles
- Topic Page: list all articles in that topic
- Article Page: individual article

## Data Structure

- Articles (date, title, slug, content, topic, meta_description)
- Topics (title, slug)

My current website is https://kevoncheung.com/ , can you duplicate the entire site, including the blog, and create a new site for me? Use markdown for content management and have a folder for each of them. Ignore the styling for now.

Pages:
- Home
- Now
- Blog: list all essays
- Individual Essay
- Essays Category Page: list all essays in that category

Content Management System:
- Essays (date, title, slug, content, essay_category_id, meta_description)
- Essays Categories (title, slug)
- Projects (title, description, image, link)
- Appearances (title, image, link)


## Create new article

1. Create a new markdown file in the `content/articles` folder
2. git add, git commit, git push

## How to run

```bash
npm run dev
```

## How to deploy to Vercel directly

```bash
vercel deploy --prod
```

