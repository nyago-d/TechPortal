"use client"

import { useCallback, useState } from "react";
import { TechArticle } from "./entities/tech_article";
import { parseISO, format } from 'date-fns';
import { PostParam, PostResult } from "./entities/api";
import { post } from "@/lib/api";

type Props = {
    articles: TechArticle[];
}

export default function Articles({ articles }: Props) {
    return (
        <main>
            <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                <ul role="list" className="divide-y divide-gray-100">
                    {articles.map((article) => (<Item key={article.ArticleUrl + article.MediaType} article={article} />))}
                </ul>
            </div>
        </main>
    )
}

type ItemProps = {
    article: TechArticle;
}

function Item({ article }: ItemProps) {

    const [checked, setChecked] = useState(article.Status === "checked");
    const [visible, setVisible] = useState(true);

    const handleChange = useCallback(async (e : any) => {
        const param: PostParam = { mediaType: article.MediaType, articleUrl: article.ArticleUrl, status: e.target.checked ? "checked": "initial" };
        const res = await post<PostResult>("/tech/api/status/", param);
        setChecked(!e.target.checked);
    }, [article]);

    const handleClick = async(e : any) => {
        const param: PostParam = { mediaType: article.MediaType, articleUrl: article.ArticleUrl, status: "done" };
        const res = await post<PostResult>("/tech/api/status/", param);
        setVisible(false);
    };

    return (
        <li key={article.Title} className={classNames(visible ? "" : "hidden", "flex justify-between gap-x-6 py-4 px-2")}>
                <div className="flex gap-x-4">
                    <div className="flex-auto">
                        <label className="relative inline-flex items-center mt-1 cursor-pointer">
                            <input type="checkbox" 
                                    value="" 
                                    key={article.MediaType + "-" + article.ArticleUrl}
                                    className="sr-only peer" 
                                    checked={checked} 
                                    onChange={handleChange} 
                                    />
                            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        </label>
                    {/* </div>
                    <div className="min-w-0 flex-auto"> */}
                        <p className="mt-1 text-xs leading-5 text-gray-500 lg:w-20">{article.MediaType}</p>
                    </div>
                    <div className="flex-auto">
                        <a href={article.ArticleUrl} target="_blank" onClick={handleClick}>
                            <p className="text-sm font-semibold leading-6 text-gray-900 hover:underline">{article.Title}</p>
                        </a>
                        <p className="text-sm leading-6 text-gray-900 break-all mt-2">{article.Author}</p>
                    </div>
                </div>
                {/* <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm leading-6 text-gray-900 break-all">{article.Author}</p>
                    </div>
                    <div className="min-w-0 flex-auto">
                        <p className="text-xs leading-5 text-gray-500">
                            {format(new Date(article.CreatedAt), 'yyyy/MM/dd hh:MM')}
                        </p>
                    </div>
                </div> */}
        </li>
    );
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
  }