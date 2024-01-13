import { PostList } from '../components/post-list/index'
import { PostCount } from '../components/post-list/post-count'

export default function Blog() {
  return (
    <div>
      <h6>There are <PostCount /> total posts...</h6>
      <PostList />
    </div>
  )
}