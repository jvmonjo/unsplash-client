export class Image {
    constructor(
        private id: string,
        private description: string,
        private author: string,
        private author_link: string,
        private created_at: Date,
        private urls: {string: string},
        private color: string,
        private hash_url: string
        ){
    }
}