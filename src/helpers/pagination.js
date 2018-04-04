export function makeNextPath({ pathPrefix, last, first, index }) {
  const n = last ? index : index + 1
  return pathPrefix.length > 0 ? `/${pathPrefix}/${n}` : `/${n}`
}

export function makePrevPath({ pathPrefix, last, first, index }) {
  const n = index - 1

  if (n === 1) return '/'
  return pathPrefix.length > 0 ? `/${pathPrefix}/${n}` : `/${n}`
}
