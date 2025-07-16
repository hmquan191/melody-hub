'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const categories = [
  { label: 'Tất cả', value: '' },
  { label: 'Nhạc Việt', value: 'vietnamese' },
  { label: 'Nhạc Nước Ngoài', value: 'international' },
  { label: 'CD / DVD', value: 'cd-dvd' },
  { label: 'Đĩa Than / Vinyl', value: 'vinyl' },
  { label: 'Băng Cassette', value: 'cassette' },
  { label: 'Merch', value: 'merch' },
  { label: 'Ấn bản có chữ ký', value: 'signed' }
]

export default function ProductCategory() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const selected = searchParams.get('category') || ''

  const handleClick = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === selected) {
      params.delete('category')
    } else {
      params.set('category', value)
    }
    router.push(`/products?${params.toString()}`)
  }

  return (
    <aside className='w-full sm:w-64 mb-8 sm:mb-0 sm:pr-8'>
      <h2 className='text-3xl font-bold mb-4 border-b pb-2 border-gray-500 uppercase'>Danh mục sản phẩm</h2>
      <ul className='space-y-2'>
        {categories.map((cat) => (
          <li key={cat.value}>
            <Button
              variant='ghost'
              className={cn(
                'justify-start w-full hover:bg-muted rounded-none text-xl border-b',
                selected === cat.value ? 'text-primary font-semibold' : 'text-gray-700'
              )}
              onClick={() => handleClick(cat.value)}
            >
              {cat.label}
            </Button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
