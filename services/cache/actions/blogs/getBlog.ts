
import { BlogNotExist } from "../../../../helpers/errorCodes";
import { setBlog } from "../../cache";
import engine from "../../store/engine";
import { Blogs } from "../../../../models/Blogs";
import { IBlog } from "../../../../interfaces/IBlog";
import keys from "../../store/keys";

const JSONCache = require('redis-json');
const blogs = new JSONCache(engine, {prefix: `${keys.blogs}:`});

async function getBlog(hostname: string): Promise<IBlog> {
    try {
        const blog = await blogs.get(hostname);
        
        if( ! blog) {

            const dbBlog = await Blogs.findOne({domain: hostname});

            if( ! dbBlog) throw new BlogNotExist();

            return await setBlog(hostname, dbBlog);

        }
        
        return blog;
    } catch (error) {
        throw new BlogNotExist();
    }
}

export default getBlog;