
import engine from '../../store/engine';
import prepareNewBlogToCache from '../../utils/prepareNewBlog';
import { IBlog } from '../../../../interfaces/IBlog';
import keys from '../../store/keys';

const JSONCache = require('redis-json');
const blogs = new JSONCache(engine, {prefix: `${keys.blogs}:`});

async function setBlog(domain: string, blog: any): Promise<IBlog>{
    const newblog = prepareNewBlogToCache(blog)
    
    await blogs.rewrite(domain, newblog);
    
    return newblog;
}

export default setBlog;