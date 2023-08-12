import { TechArticle } from '@/app/entities/tech_article';

export class JsonResult {
    hitCount!: number;
    pageSize!: number;
    navigations!: Navigation[];
    articles!: TechArticle[];
    constructor(init?: Partial<JsonResult>) {
        Object.assign(this, init);
    }
}

export class Navigation {
    name!: string;
    current!: boolean;
    constructor(init?: Partial<Navigation>) {
        Object.assign(this, init);
    }
}

export interface PostParam {
    mediaType: string;
    articleUrl: string;
    status: string;
}

export interface PostResult {
    status: string;
}