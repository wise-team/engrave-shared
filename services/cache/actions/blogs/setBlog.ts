
import engine from '../../store/engine';
// import prepareNewBlogToCache from '../../utils/prepareNewBlog';
import { IBlog } from '../../../../interfaces/IBlog';
import keys from '../../store/keys';

const JSONCache = require('redis-json');
const blogs = new JSONCache(engine, {prefix: `${keys.blogs}:`});

async function setBlog(domain: string, blog: IBlog): Promise<IBlog>{
    
    await blogs.rewrite(domain, blog.toJSON());
    
    return blog;
}

export default setBlog;