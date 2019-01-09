const Redis = require('ioredis');
const redis = new Redis({ host: "redis" });
const JSONCache = require('redis-json');
const blogs = new JSONCache(redis, {prefix: 'blogs:'});

import prepareNewBlogToCache from '../utils/prepareNewBlog';
import { IBlog } from '../../../interfaces/IBlog';

async function setBlog(hostname: string, blog: IBlog) {
    const newblog = prepareNewBlogToCache(blog)
    await blogs.set(hostname, newblog);
    return newblog;
}

export default setBlog;