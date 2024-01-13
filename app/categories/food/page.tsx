import { PostList } from '../../components/post-list/index'
import { PostCount } from '../../components/post-list/post-count'

export default function CategoryPage() {
  const categoryName = 'food'
  return (
    <div>
      <h6>There are <PostCount filterType={"category"} filterName={categoryName} /> total posts...</h6>
      <PostList filterType={"category"} filterName={categoryName} />
    </div>
  )
}