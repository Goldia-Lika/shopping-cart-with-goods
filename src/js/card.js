
/**
 * Универсальная функция для генерации и вставки HTML шаблона карточки товара
 * Используется на главной странице и в корзине
 * @param {array} products - продукты
 * @param {string} defaultImgFile - имя файла картинки по умолчанию (если нет product.imgSrc)
//  * @param {Element} container - DOM-элемент, куда вставлять карточку
 */
export const generateTemplate = (products, defaultImgFile, container) => {
    let template = ''

    if (products && Array.isArray(products)) {
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
        
        products.forEach((product, idx) => {
            // Берём картинку по индексу, если картинок меньше чем товаров — используем последнюю
            const currentImgFile = images[idx] ? images[idx] : images[images.length - 1];
            
            template += `
<div id=${product?.id} class="w-full max-w-sm mb-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <div class="flex justify-center items-center w-full mt-2">
            <div class="w-[360px] h-[300px] flex items-center justify-center rounded-t-lg overflow-hidden">
                <img class="object-contain w-full h-full" src="${product?.imgSrc ? product.imgSrc : '/images/' + (defaultImgFile || currentImgFile)}" alt="product image" />
            </div>
        </div>
    </a>
    <div class="px-8 pb-5 pt-8">
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
            <span class="bg-blue-100 text-blue-800 text-xs font-semibold 
            px-2.5 py-0.5 rounded-sm dark:bg-blue-200
             dark:text-blue-800 ms-3">${product?.rating || 0}
             </span>
        </div>

       <button type="button" class="basket-btn text-white bg-lime-700 hover:bg-lime-500 focus:ring-4
   focus:ring-lime-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-6
    dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none
     dark:focus:ring-blue-800">Add to</button>
    
    </div>
</div>
`

        })
    }
 container.insertAdjacentHTML('beforeend', template)

// функция получения каждой кнопки в карточке
const allBtns = document?.querySelectorAll('.basket-btn')


if (allBtns) {
    allBtns.forEach((button) => {
        button.addEventListener('click', (event) => {
            // находим id карточки в иерархии DOM
       const carId = event?.target?.parentElement?.parentElement?.id


        //  находим элемент с id в массиве products
    const product = products?.find((element) => element?.id === Number(carId))
        console.log('найденый элемент', product)

        // вызов функции для отрисовки полученного элемента на странице
        return product

        })
    })
}
}