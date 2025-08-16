import { SELECTORS } from './selectors'

//функция загрузки продуктов (WIP)

export async function loadJSON() {
  try {
    const response = await fetch('http://localhost:3000/products')
    const data = await response.json()

    let html = ''

    if (data && Array.isArray(data)) {
      // Массив с названиями картинок из public/images (укажите свои файлы)
      const images = [
        'help-image-1.jpg',
        'help-image-2.jpg',
        'help-image-3.jpg',
        'help-image-5.jpg',
        'help-image-7.jpg',
        'help-image-8.jpg',
        'help-image-9.jpg',
        'help-image-10.jpg',
        'help-image-11.jpg',
        'help-image-12.jpg',
        'help-image-4.png'
      ];
      data.forEach((product, idx) => {
        // Берём картинку по индексу, если картинок меньше чем товаров — используем последнюю
        const imgFile = images[idx] ? images[idx] : images[images.length - 1];
        html += `
<div class="w-full max-w-sm mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
  <a href="#">
  <img class="p-8 rounded-t-lg" src="${product?.imgSrc ? product.imgSrc : '/images/' + imgFile}" alt="product image" />
  </a>
  <div class="px-5 pb-5">
        <a href="#">
            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${product?.name || product?.title || 'Без названия'}</h5>
            <div class="text-md font-medium text-gray-900 mb-2">${product?.description ? product.description : 'Описание отсутствует'}</div>
             
        </a>
        <div class="text-sm text-gray-500 dark:text-gray-400 mb-2">${product?.category || ''}</div>
        <div class="flex items-center mt-2.5 mb-5">
            <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <svg class="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
            </div>
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">${product?.rating || 0}</span>
        </div>
        <div class="flex items-center justify-between">
            <span class="text-3xl font-bold text-gray-900 dark:text-white">${product.price ? '$' + product.price : ''}</span>
            <a href="#" class="text-white bg-lime-700
             hover:bg-lime-600 focus:ring-4 focus:outline-none
              focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
               dark:bg-blue-600 dark:hover:bg-blue-700
                dark:focus:ring-blue-800">Add to cart</a>
        </div>
    </div>
</div>

        `
      })
    }
    SELECTORS?.productsList?.insertAdjacentHTML('beforeend', html)
  } catch (error) {
    console.error('Ошибка загрузки данных:', error)
  }
}

/**
 * функция создания продуктов
 * @param {object} product - Продукт 
 */
export async function createProduct (product){
  try {
    const response = await fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    })
    if (!response.ok) throw new Error('Ошибка при добавлении продукта')
      return await response.json()
  } catch (error) {
    console.error('Ошибка POST:', error)
    throw error     
    }
}
