import lscache from 'lscache'
import { stringify } from 'query-string'
import fetch from 'isomorphic-fetch'
import randomcolor from 'randomcolor'

const CACHE_EXPIRY = 30 // minutes

// http://ponyfoo.com/articles/es6-number-improvements-in-depth#numberisnan
export function isNumber (value) {
  return typeof value === 'number' && !isNaN(value)
}

export function pluralize (num, phrase, plural) {
  num = isNumber(num) ? num : 0
  plural = plural || phrase + 's'
  return addCommas(num) + ' ' + (num === 1 ? phrase : plural)
}

function addCommas (number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function decode (str) {
  if (!str) {
    return str
  }
  return str
    .replace('&lt;', '<')
    .replace('&gt;', '>')
    .replace('&amp;', '&')
}

export function fetchJSON (path, query, parseData = (d) => d) {
  const url = path + '?' + stringify(query)
  const cache = lscache.get(url)
  if (cache) {
    return Promise.resolve(cache)
  }
  return fetch(url)
    .then((response) => response.json())
    .then(parseData)
    .then((data) => {
      lscache.set(url, data, CACHE_EXPIRY)
      return data
    })
}

export function updateFavicon (params, pathname) {
  const seed = params.post_id || params.subreddit || params.multi || pathname
  const canvas = document.createElement('canvas')
  canvas.width = 32
  canvas.height = 32
  if (canvas.getContext) {
    const ctx = canvas.getContext('2d')

    // Coloured circle
    ctx.beginPath()
    ctx.arc(16, 16, 16, 0, 360)
    ctx.fillStyle = randomcolor({ seed, luminosity: 'light' })
    ctx.fill()

    // Shading half-circle
    ctx.beginPath()
    ctx.arc(16, 16, 16, 290 * Math.PI / 180, 110 * Math.PI / 180)
    ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
    ctx.fill()

    // Render to URL and update favicon
    const url = canvas.toDataURL('image/png')
    document.querySelector('link[rel="icon"]').setAttribute('href', url)
  }
  // const svgString = '<g><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4 6h-3v7c0 1.66-1.34 3-3 3s-3-1.34-3-3 1.34-3 3-3c.55 0 1.06.16 1.5.42V6H16v2z"></path></g>'
  // const url = 'data:image/svg+xml,'+encodeURIComponent(svgString);
  // document.querySelector('link[rel="icon"]').setAttribute('href', url)

}
