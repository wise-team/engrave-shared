export interface ISteemPost {
    id: number;
    author: string;
    permlink: string;
    category: string;
    title: string;
    body: string;
    json_metadata: string;
    last_update: string;
    created: string;
    active: string;
    last_payout: string;
    total_payout_value: string;
    curator_payout_value: string;
    active_votes: {
        voter: string;
        weight: number;
        rshares: number;
        percent: number;
        reputation: number;
        time: string
    }[];
    [x: string]: any;
}