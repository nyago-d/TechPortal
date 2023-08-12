import { NextRequest, NextResponse } from 'next/server';
import { query } from "@/lib/db"
import { TechArticle } from '@/app/entities/tech_article';
import { JsonResult, Navigation } from '@/app/entities/api';
import { CountPerPage } from '@/app/constant';
import { TechMediaType } from '@/app/entities/tech_media_type';

export async function GET(request: NextRequest) : Promise<NextResponse> {

    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const query = searchParams.get('query');
    // console.log("GET:" + request.url);
  
    const nav = await getNavigations(type);
    const results = await getArticles(type, query);
    const res = new JsonResult({
        hitCount: results.length,
        pageSize: getPageSize(results.length, CountPerPage),
        navigations: nav,
        articles: results
    });
  
    return NextResponse.json(res);
}


async function getNavigations(type: string | null) {
    const headline = new Navigation({ name: "Headline", current: type == null });
    const checked = new Navigation({ name: "Checked", current: type == "Checked" });
    const done = new Navigation({ name: "Done", current: type == "Done" });
    const search = new Navigation({ name: "Search", current: type == "Search" });
    const mediaTypes = await query<TechMediaType>("SELECT * FROM tech_media_type ORDER BY Priority");
    return [headline, checked, done, search].concat(mediaTypes.map(mt => new Navigation({ name: mt.MediaType, current: type == mt.MediaType })));
}

async function getArticles(type: string | null, q : string | null) {
    if (type == "Search") {
        return await query<TechArticle>(`select
                a.*
                , ifnull(s.Status, 'initial') as Status
            from
                tech_article a
                left join tech_article_status s
                    on a.MediaType = s.MediaType
                    and a.ArticleUrl = s.ArticleUrl
            where
                a.Title like ?
            order by
                a.CreatedAt desc`, [ "%" + q + "%" ]);
    } else if (type == "Checked" || type == "Done") {
        return await query<TechArticle>(`select
                t.*
                , ifnull(s.Status, 'initial') as Status 
            from
                tech_article t 
                left join tech_article_status s 
                on t.MediaType = s.MediaType 
                and t.ArticleUrl = s.ArticleUrl 
            where
                s.Status = ?
            order by
                t.CreatedAt desc`, [ type ]);
    } else if (type) {
        return await query<TechArticle>(`select
                a.*
                , ifnull(s.Status, 'initial') as Status
            from
                tech_article a
                left join tech_article_status s
                    on a.MediaType = s.MediaType
                    and a.ArticleUrl = s.ArticleUrl
            where
                a.MediaType = ?
                and (s.Status is null or s.Status = 'initial')
            order by
                a.CreatedAt desc`, [ type ]);
    } else {
        return await query<TechArticle>(`with newest as ( 
            select
              max(EntryDate) as EntryDate 
            from
              tech_article
          ) 
          select
            t.* 
            , ifnull(s.Status, 'initial') as Status
          from
            tech_article t 
            inner join newest n 
              on t.EntryDate = n.EntryDate 
            inner join tech_media_type m 
              on t.MediaType = m.MediaType 
            left join tech_article_status s
              on t.MediaType = s.MediaType
              and t.ArticleUrl = s.ArticleUrl
          where
            (s.Status is null or s.Status = 'initial')
          order by
            m.Priority
            , t.CreatedAt desc`);
    }
}

function getPageSize(hitCount: number, countPerPage: number) {
    if (hitCount % countPerPage == 0) {
        return Math.floor(hitCount / countPerPage);
    } else {
        return Math.floor(hitCount / countPerPage) + 1;
    }
}