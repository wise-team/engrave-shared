
import engine from '../../store/engine';
import { IBlog } from '../../../../interfaces/IBlog';
import keys from '../../store/keys';

const JSONCache = require('redis-json');
const blogs = new JSONCache(engine, {prefix: `${keys.blogs}:`});

async function setBlog(blog: IBlog): Promise<IBlog>{
    
    await blogs.rewrite(blog.domain, blog.toJSON());
    if(blog.custom_domain) {
        await blogs.rewrite(blog.custom_domain, blog.toJSON());
    }
    
    return blog;
}

export default setBlog;