import engine from "../../store/engine";

async function getForMigration() {
    let posts:any = [];
    
    const keys = await engine.keys('article:*');

    console.log(keys);

    for(const key of keys) {
        const article = await engine.get(key);
        if(article) {
            const parsed = JSON.parse(article);
            if(parsed && parsed.state != 404) {
                posts.push({
                    username: key.split(':')[2],
                    permlink: parsed.permlink,
                    category: parsed.category.slug
                })
            }
        }
    }
    return posts;
}

export default getForMigration;