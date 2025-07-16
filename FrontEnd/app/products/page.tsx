'use client'
import Ecatalog from '@/components/ECatalog'
import { ProductCard } from '@/components/ui/product-card'
import { useEffect, useState } from 'react'
import ProductCategory from '../homepage/components/ProductCategory'
import { useSearchParams } from 'next/navigation'
// Import các component Pagination từ Shadcn UI
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination' // Điều chỉnh đường dẫn import nếu cần thiết
import axios from 'axios'

export default function Products() {
  type Product = {
    _id: string
    name: string
    price: string
    image: string
    // Add more fields if needed
  }

  const [products, setProducts] = useState<Product[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 16

  // elastic search dựa vào tên sản phẩm lấy từ thanh tìm k

  // bộ lọc sidebar
  const searchParams = useSearchParams()
  const selectedCategory = searchParams.get('category')
  const filterByCategory = (product: Product) => {
    if (!product.name) return false // an toàn: nếu name undefined thì bỏ

    const name = product.name.toLowerCase()

    switch (selectedCategory) {
      case 'vietnamese':
        return /[àáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]/i.test(name)
      case 'international':
        return !/[àáảãạăằắẳẵặâầấẩẫậđèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵ]/i.test(name)
      case 'cd-dvd':
        return name.includes('cd') || name.includes('dvd')
      case 'vinyl':
        return name.includes('đĩa than') || name.includes('vinyl')
      case 'cassette':
        return name.includes('cassette')
      case 'merch':
        return [
          'áo',
          'ví',
          'móc khóa',
          'tuyển tập',
          'túi',
          'nhật ký',
          'sách',
          'merch',
          'lanyard',
          'mũ',
          'khẩu trang',
          'book',
          'phone',
          'magazine'
        ].some((keyword) => name.includes(keyword))
      case 'signed':
        return name.includes('chữ ký')
      default:
        return true
    }
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://melody-hub-vhml.onrender.com/api/products')
        setProducts(response.data)
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    }
    fetchProducts()
  }, [])

  // PHẦN PHÂN TRANG
  // Tính tổng số trang
  // const totalPages = Math.ceil(products.length / itemsPerPage)
  const [inputPage, setInputPage] = useState(currentPage)

  // Lấy danh sách sản phẩm cho trang hiện tại
  const filteredProducts = products.filter(filterByCategory)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  const currentItems = filteredProducts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    setInputPage(page) // đồng bộ input
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Hàm để tạo các số trang hiển thị (có thể có dấu "...")
  const getPageNumbers = (currentPage: number, totalPages: number) => {
    const pageNumbers = []
    const maxPageButtons = 5 // Số lượng nút trang tối đa muốn hiển thị

    if (totalPages <= maxPageButtons) {
      // Nếu tổng số trang ít, hiển thị tất cả
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
      }
    } else {
      // Luôn hiển thị trang đầu tiên
      pageNumbers.push(1)

      // Xác định phạm vi các trang ở giữa để hiển thị
      let startPage = Math.max(2, currentPage - Math.floor(maxPageButtons / 2) + 1)
      let endPage = Math.min(totalPages - 1, currentPage + Math.floor(maxPageButtons / 2) - 1)

      // Điều chỉnh start/end nếu gần biên
      if (currentPage < maxPageButtons - 1) {
        endPage = maxPageButtons - 1
      }
      if (currentPage > totalPages - (maxPageButtons - 2)) {
        startPage = totalPages - (maxPageButtons - 2)
      }

      if (startPage > 2) {
        pageNumbers.push('...') // Dấu chấm lửng ở đầu
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i)
      }

      if (endPage < totalPages - 1) {
        pageNumbers.push('...') // Dấu chấm lửng ở cuối
      }

      // Luôn hiển thị trang cuối cùng nếu chưa bao gồm
      if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages)
      }
    }
    return pageNumbers
  }

  return (
    <div>
      <Ecatalog />

      <div className='container mx-auto py-8'>
        <h1 className='text-[40px] font-bold mb-8 text-left font-[MicaValo]'>OUR PRODUCTS</h1>

        <div className='flex flex-col sm:flex-row gap-6'>
          <ProductCategory />

          <div className='flex-1'>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-center'>
              {currentItems.map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  imageUrl={product.image}
                  isNew={false}
                  onAddToCart={(id) => {
                    console.log(`Added product ${id} to cart`)
                  }}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className='flex justify-center mt-8'>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => handlePageChange(currentPage - 1)}
                        isActive={currentPage > 1}
                        className='cursor-pointer'
                      />
                    </PaginationItem>

                    {getPageNumbers(currentPage, totalPages).map((page, index) => (
                      <PaginationItem key={index}>
                        {page === '...' ? (
                          <PaginationEllipsis className='cursor-default' />
                        ) : (
                          <PaginationLink
                            onClick={() => handlePageChange(page as number)}
                            isActive={page === currentPage}
                            className='cursor-pointer'
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationNext
                        onClick={() => handlePageChange(currentPage + 1)}
                        isActive={currentPage < totalPages}
                        className='cursor-pointer'
                      />
                    </PaginationItem>

                    {/* Ô nhập trang */}
                    <div className='flex items-center gap-2 ml-4'>
                      <span className='text-sm'>Go to</span>
                      <input
                        type='number'
                        min={1}
                        max={totalPages}
                        value={inputPage}
                        onChange={(e) => setInputPage(Number(e.target.value))}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && inputPage >= 1 && inputPage <= totalPages) {
                            handlePageChange(inputPage)
                          }
                        }}
                        className='w-16 px-2 py-1 border rounded text-sm text-center'
                      />
                      <span className='text-sm'>/ {totalPages}</span>
                    </div>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
