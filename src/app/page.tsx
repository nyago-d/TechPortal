import { JsonResult } from './entities/api';
import Main from './main'
import { get } from '@/lib/api'

type PageProps = {
  params: {
    id: string[]
  },
  searchParams: {
    type: string
  }
}

export default async function Home({ params, searchParams }: PageProps) {

  const apiResult = await get<JsonResult>("http://localhost:3000/tech/api/info" + (searchParams.type ? "?type=" + searchParams.type : ""));
  
  return (
    <Main apiResult={apiResult} />
  )
}
