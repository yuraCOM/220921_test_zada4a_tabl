import axios from 'axios'

export async function getDB(url) {
    return await axios.get(url).then(function (response) {
        // handle success
        return response.data
        // setData(response.data)
    })
        .catch(function (error) {
            // handle error
            console.log(error);
        })

}

// set context

export function updContext(context, setContext, DB) {
    DB.sort((x, y) => x.id - y.id)
    let totalPages = Math.ceil(DB.length / context.pageLimit)
    let curPagDB = DB.slice(0, context.pageLimit)
    context.currentPage = 1
    setContext(
        {
            ...context,
            "currentDB": curPagDB,
            'start': true,
            "totalRecords": DB.length,
            "totalPages": totalPages,
            "paginateDB": DB,

        })
}

