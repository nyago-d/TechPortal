import { JsonResult } from "./entities/api";

type Prop = {
    result: JsonResult | undefined;
}

export default function Header({ result }: Prop) {
    return(
        <header className="bg-white shadow">
            <div className="flex justify-between mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{result!.navigations.find(n => n.current)?.name}</h1>
            <p className='font-bold text-gray-600 leading-10'>{result?.hitCount} Articles</p>
            </div>
        </header>    
    )
}