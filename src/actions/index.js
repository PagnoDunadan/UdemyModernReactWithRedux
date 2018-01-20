import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

const ROOT_URL = 'http://reduxblog.herokuapp.com/api';
const API_KEY = '?key=pagnodunadan';

export function fetchPosts() {
  const request = axios.get(`${ROOT_URL}/posts${API_KEY}`);

  return {
    type: FETCH_POSTS,
    payload: request
  };
}

export function createPost(values, callback) {
  const request = axios.post(`${ROOT_URL}/posts${API_KEY}`, values)
    .then(() => callback());

  // Useless code in Lecture 143?
  // Flow of events: take data and send it, then change route,
  // then send action to reducers (because request is resolved) which should
  // add that new post, but there is no reducer for CREATE_POST acton.type.
  // Now PostsIndex will be mounted in the DOM and it will
  // call componentDidMount and fetch posts from API anyway
  // and rewrite all posts in the store and it doesn't even matter
  // that we have an action that has no reducer because we would
  // have never even used data from this action anyway
  return {
    type: CREATE_POST,
    payload: request
  };
}

export function fetchPost(id) {
  const request = axios.get(`${ROOT_URL}/posts/${id}${API_KEY}`);

  return {
    type: FETCH_POST,
    payload: request
  };
}

export function deletePost(id, callback) {
  const request = axios.delete(`${ROOT_URL}/posts/${id}${API_KEY}`)
    .then(() => callback());

  // Again does nothing
  return {
    type: DELETE_POST,
    payload: id
  };
}
