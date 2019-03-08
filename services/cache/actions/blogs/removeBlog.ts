
import engine from '../../store/engine';
import keys from '../../store/keys';

const JSONCache = require('redis-json');
const blogs = new JSONCache(engine, {prefix: `${keys.blogs}:`});

async function removeBlog(domain: string){
    
    await blogs.rewrite(domain, {removed: true});

}

export default removeBlog;