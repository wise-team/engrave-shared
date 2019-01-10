export default (steemArticle: any) => {

    try {
        const { beneficiaries } = steemArticle;

        for(const beneficient of beneficiaries) {
            if(beneficient.account == 'nicniezgrublem' || beneficient.account == 'engrave') {
                if(beneficient.weight > 1000) {
                    return true;
                }
            }
        }
        
        return false;

    } catch (error) {
        return false;
    }




}
