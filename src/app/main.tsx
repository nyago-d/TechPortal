
"use client"

import { JsonResult } from './entities/api';
import Navi from './navi'
import Articles from './items';
import Header from './hader';
import { useCallback, useState } from 'react';
import { get } from '@/lib/api'

type Props = {
    apiResult: JsonResult | undefined;
}

export default function Main({ apiResult }: Props) {

    const [result, setResult] = useState(apiResult);

    const handleSearch = useCallback(async (e : React.ChangeEvent<HTMLInputElement>) => {
        const apiResult = await get<JsonResult>("/tech/api/info?type=Search&query=" + e.target.value);
        setResult(apiResult);
    }, []);

    return (
        <>
            <Navi navigations={apiResult!.navigations} handleSearch={handleSearch} />
            <div className="min-h-full">
                <Header result={result} />
                <Articles articles={result!.articles} />
            </div>
        </>
    )
}