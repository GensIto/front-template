import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

type Task = {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const useExample = () => {
  const getTasks = async () => {
    const { data } = await axios.get<Task[]>(`https://jsonplaceholder.typicode.com/todos`)
    return data
  }
  return useQuery<Task[], Error>({
    queryKey: ['tasks'],
    queryFn: getTasks,
    staleTime: 0,
    refetchOnWindowFocus: true,
    cacheTime: 5000,
    refetchInterval: 5000,
  })
}
