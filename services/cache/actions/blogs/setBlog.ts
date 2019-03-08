
import engine from '../../store/engine';
import prepareNewBlogToCache from '../../utils/prepareNewBlog';
import { IBlog } from '../../../../interfaces/IBlog';

const JSONCache = require('redis-json');
const blogs = new JSONCache(engine, {prefix: 'blogs:'});

async function setBlog(hostname: string, blog: IBlog) {
    const newblog = prepareNewBlogToCache(blog)
    await blogs.rewrite(hostname, newblog);
    return newblog;
}

export default setBlog;