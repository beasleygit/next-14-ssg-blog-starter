import { getAllCategories } from '../../lib/markdown'
import Link from 'next/link'

async function getCategories() {
  const categories = await getAllCategories()
  return categories
}

export default async function AllCategoriesPage() {
  const categories = await getCategories()
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <Link href={`/categories/${category}`}><li key={category}>{category}</li></Link>
        ))}
      </ul>
    </div>
  )
}
