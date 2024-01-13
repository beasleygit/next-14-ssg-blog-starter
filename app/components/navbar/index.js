import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="flex flex-row content-center flex-wrap justify-between px-20 py-6">
      <Link href="/"><h2>Bloggeroo</h2></Link>
      <ul className="flex flex-row content-center flex-wrap">
        <li className="mx-4"><Link href="/about">About Us</Link></li>
        <li className="mx-4"><Link href="/blog">All Posts</Link></li>
        <li className="mx-4"><Link href="/categories">Categories</Link></li>
      </ul>
    </nav>
  )
}