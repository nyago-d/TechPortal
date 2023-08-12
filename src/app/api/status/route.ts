import { PostParam } from '@/app/entities/api';
import { NextRequest, NextResponse } from 'next/server';
import { execute } from "@/lib/db"
import { TechArticleStatus } from '@/app/entities/tech_article_status';

export async function POST(request: NextRequest) : Promise<NextResponse> {

    const param = await request.json() as PostParam;
    // console.log("POST:" + param);

    const status: TechArticleStatus = {
        MediaType: param.mediaType,
        ArticleUrl: param.articleUrl,
        Status: param.status
    } as TechArticleStatus;
    
    await execute("insert into tech_article_status set ? on duplicate key update Status = ?", [status, status.Status]);
    return NextResponse.json({ status: "OK" });
}