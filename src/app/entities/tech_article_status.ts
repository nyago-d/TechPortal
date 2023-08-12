import { RowDataPacket } from "mysql2";

export interface TechArticleStatus extends RowDataPacket {
    MediaType: string;
    ArticleUrl: string;
    Status: string;
}