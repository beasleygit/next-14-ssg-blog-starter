import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

export async function getAllPostSlugs(filterKey, filterValue) {
  const postsDirectory = path.join(process.cwd(), 'app/posts');
  const filenames = fs.readdirSync(postsDirectory)

  return filenames.reduce((filteredSlugs, filename) => {
    const fullPath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents)

    if (!filterKey || data[filterKey] === filterValue) {
      filteredSlugs.push({
        slug: filename.replace(/\.md$/, '') // removes the file extension
      });
    }

    return filteredSlugs
  }, []);
}

export async function getPosts(slug: string) {
  const fullPath = path.join(process.cwd(), 'app/posts', `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString()

  return { slug, data, content: contentHtml }
}

export async function getAllCategories() {
  const postsDirectory = path.join(process.cwd(), 'app/posts');
  const filenames = fs.readdirSync(postsDirectory)

  const categories = new Set()

  filenames.forEach(filename => {
    const fullPath = path.join(postsDirectory, filename)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data } = matter(fileContents);

    if (data.category) {
      categories.add(data.category)
    }
  });

  return Array.from(categories)
}