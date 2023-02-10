/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"Y0wGB8PoSVtOgeTa","label":"Essentials","bookmarks":[{"id":"VlJYgkvtl8J2dt27","label":"Gmail - Work","url":"https://mail.google.com/mail/u/1/#inbox"},{"id":"vUsxDBGbuYt8u9ZJ","label":"Gmail - Casual","url":"https://mail.google.com/mail/u/0/#inbox"}]},{"id":"PB5b13dBqlkLX07F","label":"Design Tools","bookmarks":[{"id":"wiUfQbYbG1HhMXEK","label":"pixlrx","url":"https://pixlr.com/x/"},{"id":"la6tmG6muAx8koo3","label":"image enlarger","url":"https://bigjpg.com/en"},{"id":"UdhVlOPZq8vQocMK","label":"haikei","url":"https://app.haikei.app/"},{"id":"DW8bLGQN34HynOWL","label":"css gradients","url":"https://larsenwork.com/easing-gradients/"}]},{"id":"eNESnGcYlXq8WuY1","label":"Other Tools","bookmarks":[{"id":"LnGezzdKVsP4sqvT","label":"Yandex Translate","url":"https://translate.yandex.com/ocr"}]},{"id":"WhYmEhjzom2qcBab","label":"Youtube","bookmarks":[{"id":"TXEdRPpZNIFgPP7r","label":"PyroLive","url":"https://www.youtube.com/@PyrocynicalVEVO"},{"id":"TFm4OlcGace6iYCU","label":"Markiplier","url":"https://www.youtube.com/@markiplier/videos"},{"id":"Uuz2IuZAI31HZfrA","label":"OddHeader","url":"https://www.youtube.com/@oddheader"},{"id":"7XpMDtI9rl6enUDY","label":"Critikal","url":"https://www.youtube.com/@penguinz0/videos"}]},{"id":"xBwpJiG5reuG2fyq","label":"Anime/Manga","bookmarks":[{"id":"eaqH1UegEoXv5bnN","label":"9Anime","url":"https://9anime.to/home"},{"id":"HXnK5HWbHTRFqHFo","label":"MangaDex","url":"https://mangadex.org"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
