export default function(tag) {
  return tag.post != null ? new Set(Array.from(tag.post, post => post.id)).size : 0
}
