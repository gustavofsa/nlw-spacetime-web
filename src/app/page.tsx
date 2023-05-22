import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-br'
import { ArrowRight } from 'lucide-react'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'

import { api } from '@/lib/api'
import { EmptyMemories } from '@/components/EmptyMemories'

dayjs.locale(ptBr)
interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}

function MemoryCover({ source }: { source: string }) {
  const extension = source.match(/\.([^.]+)$/)

  if (extension && extension[1] === 'mp4') {
    return (
      <video
        muted
        width={592}
        height={280}
        controls={true}
        loop
        autoPlay
        className="aspect-video w-full rounded-lg object-cover"
      >
        <source src={source} type="video/mp4" />
      </video>
    )
  }

  return (
    <Image
      src={source}
      width={592}
      height={280}
      className="aspect-video w-full rounded-lg object-cover"
      alt=""
    />
  )
}

export default async function Home() {
  const isAuthenticated = cookies().has('token')

  if (!isAuthenticated) {
    return <EmptyMemories />
  }
  const token = cookies().get('token')?.value
  const response = await api.get('/memories', {
    headers: {
      Authorization: `bearer ${token}`,
    },
  })

  const memories: Memory[] = response.data

  if (memories.length === 0) {
    return <EmptyMemories />
  }

  return (
    <div className="flex flex-col gap-10 p-8">
      {memories.map((memory) => (
        <div key={memory.id} className="space-y-4">
          <time className="-ml-8 flex items-center gap-2 text-sm text-gray-100 before:h-px before:w-5 before:bg-gray-50">
            {dayjs(memory.createdAt).format('D[ de ]MMMM[, ]YYYY')}
          </time>
          <MemoryCover source={memory.coverUrl} />
          <p className="text-lg leading-relaxed text-gray-100">
            {memory.excerpt}
          </p>
          <Link
            href={`/memories/${memory.id}`}
            className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
          >
            Ler mais
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      ))}
    </div>
  )
}
