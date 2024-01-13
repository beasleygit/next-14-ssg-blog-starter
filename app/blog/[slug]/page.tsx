import { getPosts, getAllPostSlugs } from '../../../lib/markdown'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export async function getStaticPaths() {
  const posts = await getAllPostSlugs()
  return { paths: posts.map(post => ({ params: { slug: post.slug } })), fallback: false }
}

export default async function PostPage({
  params,
}: {
  params: {
    slug: string
  }
}) {
  const post = await getPosts(params.slug)

  if (!post || !post.content) return notFound()

  const formattedDate = new Date(post.data.date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const text = post.content

  // Calculate Reading Time
  const wordsPerMinute = 200; // Average reading speed
  const textLength = text.split(/\s+/).length; // Count words in text
  const readingTime = Math.ceil(textLength / wordsPerMinute);

  return (
    <article className="markdown">
      <section>
        <h1>{post.data.title}</h1> 
        <div className="flex flex-row flex-wrap text-sm my-3">
          <div>Published in <Link className="font-medium uppercase" href={`/categories/${post.data.category}`}>{post.data.category}</Link></div>
          <div className="mx-2">&bull;</div>
          <div>{readingTime} Minute Read</div>
          <div className="mx-2">&bull;</div>
          <div>{formattedDate}</div>
        </div>
      </section>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  ) 
}
