import { PublicFeed } from ".";

declare global {
    type PublicFeedResponse = ApiResponse<Array<PublicFeed>>;
}

export {};
