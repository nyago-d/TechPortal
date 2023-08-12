import { RowDataPacket } from "mysql2";

export interface TechArticle extends RowDataPacket {
    MediaType: string;
    ArticleUrl: string;
    Title: string;
    ImageUrl: string | undefined;
    Author: string | undefined;
    Status: string;
    CreatedAt: Date;
    EntryDate: Date;
}