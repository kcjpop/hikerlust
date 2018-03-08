export default function(tag) {
  return new Set(Array.from(tag.post, post => post.id)).size
}
