export async function get<T>(url: string) : Promise<T | undefined> {

    console.log("APIリクエスト：get：" + url);

    try {
      const response = await fetch(url, { cache: "no-store", })
      if (!response?.ok) {
        return undefined
      }
  
      const result = await response.json() as Promise<T>
      return result;
  
    } catch (error) {
      console.log(error);
      return undefined
    }
}

export async function post<T>(url: string, param: any) : Promise<T> {

    console.log("APIリクエスト：post：" + url);

    try {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(param),
            headers: {
              'Content-Type': 'application/json'
            }
        })

        return await response.json() as Promise<T>

    } catch (error) {
        console.log(error);
        throw error;
    }
}