export const useGetData = () => {
  const { baseApi, otakuLineApi } = useAppConfig()
  const token = localStorage.getItem('token') || ''

  const resProfile = async () => {
    return await useFetch('api/me', {
      baseURL: baseApi,
      method: 'GET',
      headers: {
        'Authorization': token
      }
    })
  }

  const resUserProfile = async (username: string) => (await useLazyFetch(`api/user/${username}`, {
    baseURL: baseApi,
    method: 'GET',
    headers: {
      'Authorization': token
    }
  }))
  
  const resPosts = async (data: { params: object }) => (await useLazyFetch('api/post', {
    baseURL: baseApi,
    method: 'GET',
    headers: {
      'Authorization': token
    },
    params: data.params
  }))

  const resDetailPost = async (postId: string) => (await useLazyFetch(`/api/post/${postId}`, { baseURL: baseApi }))

  const resComments = async (postId: string) => (await useLazyFetch(`/api/${postId}/comment`, { baseURL: baseApi }))

  const resOtakuLine = async () => (await useLazyFetch('wp-json/wp/v2/posts', {
    baseURL: otakuLineApi,
    params: {
      per_page: 1
    }
  }))

  return { resProfile, resPosts, resOtakuLine, resDetailPost, resComments, resUserProfile }
}
