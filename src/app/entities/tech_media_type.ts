import { RowDataPacket } from "mysql2";

export interface TechMediaType extends RowDataPacket {
    MediaType: string;
    Priority: number;
}