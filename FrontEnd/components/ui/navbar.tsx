// // // components/Navbar.tsx
// // import Link from 'next/link'
// // import './components.css' // Giả sử chứa CSS tùy chỉnh cho ô tìm kiếm của bạn

// // // Import các component DropdownMenu từ Shadcn UI
// // import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu' // Điều chỉnh đường dẫn nếu cần thiết
// // import Image from 'next/image'

// // export const Navbar = () => {
// //   return (
// //     <nav style={{ backgroundColor: '#323031', fontSize: '20px' }} className='sticky top-0 z-50 text-white shadow-md'>
// //       <div style={{ fontFamily: 'MicaValo' }} className='container mx-auto flex items-center justify-between p-4'>
// //         <Link href='/'>ECHO RECORDS</Link>
// //         <div className='flex gap-10 text-center'>
// //           <Link href='/'>home</Link>
// //           <Link href='/products'>products</Link>
// //         </div>
// //         {/* Search */}
// //         <div className='ui-input-container'>
// //           <input placeholder='Search...' className='ui-input' type='text' />
// //           <div className='ui-input-underline'></div>
// //           <div className='ui-input-highlight'></div>
// //           <div className='ui-input-icon'>
// //             <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
// //               <path
// //                 strokeLinejoin='round'
// //                 strokeLinecap='round'
// //                 strokeWidth='2'
// //                 stroke='currentColor'
// //                 d='M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z'
// //               ></path>
// //             </svg>
// //           </div>
// //         </div>
// //         <div className='flex gap-10 text-center'>
// //           <Link href='/cart' className='flex items-center gap-2'>
// //             <Image src='/assets/cart.png' alt='Cart' width={24} height={24} className='cursor-pointer' />
// //           </Link>

// //           {/* Dropdown Menu cho biểu tượng tài khoản */}
// //           <DropdownMenu>
// //             {/* DropdownMenuTrigger là phần tử sẽ kích hoạt menu (ở đây là icon user) */}
// //             <DropdownMenuTrigger asChild>
// //               {/* Sử dụng button để đảm bảo khả năng truy cập (accessibility) */}
// //               <button className='flex items-center gap-2 focus:outline-none'>
// //                 {/* <img src='/assets/user.png' alt='Account' className='w-6 h-6 cursor-pointer' /> */}
// //                 <Image src='/assets/user.png' alt='Account' width={24} height={24} className='cursor-pointer' />
// //               </button>
// //             </DropdownMenuTrigger>

// //             {/* DropdownMenuContent là nội dung của menu thả xuống */}
// //             <DropdownMenuContent
// //               className='w-56'
// //               align='end'
// //               style={{ backgroundColor: '#323031', color: 'white', border: '1px solid #444', fontFamily: 'MicaValo' }}
// //             >
// //               {/* Mục WISHLIST */}
// //               <DropdownMenuItem asChild>
// //                 <Link
// //                   href='/wishlist'
// //                   className='flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200'
// //                 >
// //                   {/* Thay icon bằng icon trái tim thực tế nếu có (ví dụ từ Lucide React) */}
// //                   <span className='text-xl'>💖</span> wishlist
// //                 </Link>
// //               </DropdownMenuItem>

// //               {/* Mục THEO DÕI ĐƠN HÀNG */}
// //               <DropdownMenuItem asChild>
// //                 <Link
// //                   href='/order-tracking'
// //                   className='flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200'
// //                 >
// //                   {/* Thay icon bằng icon giỏ hàng/thùng rác thực tế nếu có */}
// //                   <span className='text-xl'>🧺</span> Theo dõi đơn hàng
// //                 </Link>
// //               </DropdownMenuItem>

// //               {/* Mục ĐĂNG KÝ */}
// //               <DropdownMenuItem asChild>
// //                 <Link
// //                   href='/register'
// //                   className='flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200'
// //                 >
// //                   {/* Thay icon bằng icon người dùng/key thực tế nếu có */}
// //                   <span className='text-xl'>🔑</span> đăng ký
// //                 </Link>
// //               </DropdownMenuItem>

// //               {/* Mục ĐĂNG NHẬP */}
// //               <DropdownMenuItem asChild>
// //                 <Link
// //                   href='/login'
// //                   className='flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200'
// //                 >
// //                   {/* Thay icon bằng icon người dùng/key thực tế nếu có */}
// //                   <span className='text-xl'>✌️</span> đăng nhập
// //                 </Link>
// //               </DropdownMenuItem>
// //             </DropdownMenuContent>
// //           </DropdownMenu>
// //           {/* Kết thúc Dropdown Menu */}
// //         </div>
// //       </div>
// //     </nav>
// //   )
// // }

'use client'

import Link from 'next/link'
import './components.css'
import { useState, useEffect } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import SearchBar from '../SearchBar'
export const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const getCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]')
      const uniqueCount = cart.length // mỗi item có id khác nhau
      setCartCount(uniqueCount)
    }

    getCartCount()

    // Lắng nghe sự kiện custom khi có thay đổi từ ProductCard
    window.addEventListener('cart-updated', getCartCount)

    return () => window.removeEventListener('cart-updated', getCartCount)
  }, [])

  useEffect(() => {
    // Kiểm tra và log trạng thái từ localStorage
    const tokenvalue = localStorage.getItem('token')
    const loggedIn = !!tokenvalue
    console.log('Initial isLoggedIn from localStorage:', loggedIn)
    setIsLoggedIn(loggedIn)

    // Lắng nghe sự kiện thay đổi từ localStorage
    const handleStorageChange = () => {
      const updatedLoggedIn = !!localStorage.getItem('token')
      console.log('Storage changed, updated isLoggedIn:', updatedLoggedIn)
      if (updatedLoggedIn !== isLoggedIn) {
        setIsLoggedIn(updatedLoggedIn)
      }
    }
    window.addEventListener('storage', handleStorageChange)

    // Dọn dẹp event listener
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [isLoggedIn])

  return (
    <nav style={{ backgroundColor: '#323031', fontSize: '20px' }} className='sticky top-0 z-50 text-white shadow-md'>
      <div style={{ fontFamily: 'MicaValo' }} className='container mx-auto flex items-center justify-between p-4'>
        <Link href='/'>ECHO RECORDS</Link>
        <div className='flex gap-10 text-center'>
          <Link href='/'>Home</Link>
          <Link href='/products'>Products</Link>
        </div>
        <SearchBar />

        <div className='flex gap-5 text-center'>
          <Link href='/cart' className='relative flex items-center gap-2'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='28'
              height='28'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#ffffff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
              className='lucide lucide-shopping-cart-icon lucide-shopping-cart cursor-pointer'
            >
              <circle cx='8' cy='21' r='1' />
              <circle cx='19' cy='21' r='1' />
              <path d='M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12' />
            </svg>
            {cartCount >= 1 && (
              <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center'>
                {cartCount}
              </span>
            )}
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='flex items-center gap-2 focus:outline-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='28'
                  height='28'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#ffffff'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='lucide lucide-user-round-icon lucide-user-round cursor-pointer'
                >
                  <circle cx='12' cy='8' r='5' />
                  <path d='M20 21a8 8 0 0 0-16 0' />
                </svg>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-56'
              align='end'
              style={{
                backgroundColor: '#323031',
                color: 'white',
                border: '1px solid #444',
                fontFamily: 'MicaValo'
              }}
            >
              <DropdownMenuItem asChild>
                <Link
                  href='/wishlist'
                  className='group flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#ffffff'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='lucide lucide-heart-icon lucide-heart transition-colors duration-200 group-hover:stroke-black'
                  >
                    <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z' />
                  </svg>
                  Wishlist
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href='/order-tracking'
                  className='group flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='#ffffff'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='lucide lucide-shopping-basket-icon lucide-shopping-basket transition-colors duration-200 group-hover:stroke-black'
                  >
                    <path d='m15 11-1 9' />
                    <path d='m19 11-4-7' />
                    <path d='M2 11h20' />
                    <path d='m3.5 11 1.6 7.4a2 2 0 0 0 2 1.6h9.8a2 2 0 0 0 2-1.6l1.7-7.4' />
                    <path d='M4.5 15.5h15' />
                    <path d='m5 11 4-7' />
                    <path d='m9 11 1 9' />
                  </svg>
                  Theo dõi đơn hàng
                </Link>
              </DropdownMenuItem>
              {!isLoggedIn ? (
                <>
                  <DropdownMenuItem asChild>
                    <Link
                      href='/register'
                      className='group flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='#ffffff'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-circle-user-round-icon lucide-circle-user-round transition-colors duration-200 group-hover:stroke-black'
                      >
                        <path d='M18 20a6 6 0 0 0-12 0' />
                        <circle cx='12' cy='10' r='4' />
                        <circle cx='12' cy='12' r='10' />
                      </svg>
                      Register
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href='/login'
                      className='group flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200'
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='24'
                        height='24'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='#ffffff'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        className='lucide lucide-key-icon lucide-key transition-colors duration-200 group-hover:stroke-black'
                      >
                        <path d='m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4' />
                        <path d='m21 2-9.6 9.6' />
                        <circle cx='7.5' cy='15.5' r='5.5' />
                      </svg>
                      Login
                    </Link>
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem asChild>
                  <Link
                    href='/profile'
                    className='group flex items-center gap-2 px-4 py-2 hover:bg-gray-700 rounded-md transition-colors duration-200'
                  >
                    <span className='text-xl'>👤</span> Tài khoản
                  </Link>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
