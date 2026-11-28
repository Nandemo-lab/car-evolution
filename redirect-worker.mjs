export default {
  fetch(request) {
    const url = new URL(request.url)
    if (url.hostname !== 'carvista.jp' && url.hostname !== 'www.carvista.jp') {
      return new Response('Not found', { status: 404 })
    }
    if (url.hostname === 'carvista.jp' && url.protocol === 'https:') {
      return new Response('Not found', { status: 404 })
    }
    url.hostname = 'carvista.jp'
    url.protocol = 'https:'
    return Response.redirect(url.href, 308)
  },
}
