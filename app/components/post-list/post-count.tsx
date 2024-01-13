import { getAllPostSlugs } from '../../../lib/markdown';

export async function PostCount({filterType, filterName}) {
const slugs = await getAllPostSlugs(filterType, filterName)
  return slugs.length
}
