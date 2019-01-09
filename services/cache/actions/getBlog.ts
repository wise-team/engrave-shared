import { Blog } from "../../../interfaces/IBlog";
import { Blogs } from "../../../models/BlogsModel";
import { BlogNotExist } from "../../../helpers/errorCodes";
import { setBlog } from "../cache";

const Redis = require('ioredis');
const redis = new Redis({ host: "redis" });
const JSONCache = require('redis-json');
const blogs = new JSONCache(redis, {prefix: 'blogs:'});

async function getBlog(hostname: string): Promise<Blog> {
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