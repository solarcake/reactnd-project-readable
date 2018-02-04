const API_HOST = 'http://localhost:3001'
const HEADERS = { 'Authorization': 'blogudacity' }
const POST_HEADERS = Object.assign({'Content-Type':'application/json', 'Accept': 'application/json'} , HEADERS)

export function getCategories() {
  return fetch(`${API_HOST}/categories`, {headers: HEADERS})
         .then((response) => response.json())
         .then((categories) => categories.categories)
}

export function getPosts() {
    return fetch(`${API_HOST}/posts`, {headers: HEADERS})
    .then((response) => response.json())
    .then((posts) => posts)
}

export function getComments(postId) {
    return fetch(`${API_HOST}/posts/${postId}/comments`, {headers: HEADERS})
    .then((response) => response.json())
    .then((comments) => comments)
    .catch((e) => [])
}

export function addComment(comment) {
    return fetch(`${API_HOST}/comments`, {
        headers: POST_HEADERS,
        method:'POST',
        body: JSON.stringify(comment)
    })
    .then((response) => response.json())
}

export function addPost(post) {
    return fetch(`${API_HOST}/posts`, {
        headers: POST_HEADERS,
        method:'POST',
        body: JSON.stringify(post)
    })
    .then((response) => response.json())
}


