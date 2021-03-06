import {Effects, Task} from 'reflex';
import * as Result from '../common/result';
import * as JsonHttp from '../common/json-http';
import {compose} from '../lang/functional';

export const Get = url => ({
  type: 'Get',
  url
})

// Apologies for the silly name
export const Got = result => ({
  type: 'Got',
  result
});

const GetEffect = (url) =>
  Effects.task(new Task((succeed, fail) => {
    const ok = compose(succeed, Got, Result.ok);
    const error = compose(succeed, Got, Result.error);
    JsonHttp.get(url)
      .then(ok, error)
      .catch(error);
  }));

export const get = (model, url) => [
  model,
  GetEffect(url)
];

export const Post = url => ({
  type: 'Post',
  url
})

// Apologies for the silly name
export const Posted = result => ({
  type: 'Posted',
  result
});

const PostEffect = (url, body) =>
  Effects.task(new Task((succeed, fail) => {
    const ok = compose(succeed, Posted, Result.ok);
    const error = compose(succeed, Posted, Result.error);
    JsonHttp.post(url, body)
      .then(ok, error)
      .catch(error);
  }));

export const post = (model, url, body) => [
  model,
  PostEffect(url, body)
];
