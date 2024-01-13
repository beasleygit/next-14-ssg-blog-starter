import { getAllPostSlugs, getPosts } from '../../../lib/markdown'
import Link from 'next/link'

export async function PostList({filterType, filterName}) {
  const slugs = await getAllPostSlugs(filterType, filterName)
  const posts = await Promise.all(slugs.map(slug => getPosts(slug.slug)))
  return (
    <div className="flex flex-col"> 
      {posts.map((post, index) => (
        <div key={index} className="py-5">
          <Link href={`/blog/${post.slug}`}>
            <h2>{post.data.title}</h2>
          </Link>
          <p>{post.data.excerpt}</p>
          {/* Render other post data as needed */}
        </div>
      ))}
    </div>
  ) 
}