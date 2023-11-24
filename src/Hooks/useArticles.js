import { useQuery } from "react-query"

function useArticles() {
    return useQuery("articles", () => {
        return fetch(`http://localhost:4000/v1/articles`).then(res => res.json())
    })
}

export default useArticles