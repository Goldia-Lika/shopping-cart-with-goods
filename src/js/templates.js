// import { attachBtnHandlers } from './handlers'
import { SELECTORS, PRODUCTS_IN_BASKET } from './global.js'
import { Notification } from './components/notification'


// функция добавления товара в корзину без дублей
function addToBasket(product) {
    const exists = PRODUCTS_IN_BASKET?.some(item => item?.id === product?.id)
    if (!exists)   PRODUCTS_IN_BASKET.push(product)
    renderBasket(PRODUCTS_IN_BASKET, SELECTORS?.basketList)

new Notification({
  title: 'Добавление товара',
  subtitle: 'Товар успешно добавлен в корзину',
})
}

/**
 * Рендерит корзины товаров
 * @param {array} basketProducts - товары в корзине
 * @param {Element} basketElement - контейнер для рендера
 */
export const renderBasket = (basketProducts, basketElement) => {
  basketElement.innerHTML = ''

  let template = '';
  if (basketProducts && Array.isArray(basketProducts)) {
    basketProducts.forEach((product) => {
      // Если нет imgSrc, пробуем взять картинку из карточки по аналогии с generateTemplate
      let imgSrc = product?.imgSrc;
      if (!imgSrc && product?.defaultImgFile) {
        imgSrc = '/images/' + product.defaultImgFile;
      }
      if (!imgSrc) {
        // fallback: если нет defaultImgFile, используем любую картинку по аналогии с generateTemplate
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
        imgSrc = '/images/' + images[0];
      }
      template += `
        <div data-id="${product?.id}" class="w-full max-w-sm mb-6 bg-white border
         border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <a href="#" class="flex max-h-72 min-h-72 ">
            <img class="p-4 rounded-lg object-cover" src="${imgSrc}" alt="${product?.name ?? 'Изображение отсутствует'}"/>
          </a>
          <div class="px-4 pb-4">
            <a href="#">
              <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${product?.name ?? 'Название отсутствует'}</h5>
              <span class="text-md font-medium text-gray-900">${product?.description ?? 'Описание отсутствует'}</span>
            </a>
            <div class="text-gray-500 text-sm mb-2">${product?.category ?? 'Категория не выбрана'}</div>
            <div class="flex items-center mt-2.5 mb-5">
              <div class="flex items-center space-x-1 rtl:space-x-reverse">
                <svg class="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
                </svg>
                <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-blue-200 dark:text-blue-800 ms-3">${product.rating}</span>
              </div>
            </div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-3xl font-bold text-gray-900 dark:text-white">$${product.price ?? 'Цена отсутствует'}</span>
            </div>
            <button type="button" class="remove-basket-btn text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 
            font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600
             dark:hover:bg-red-700 focus:outline-none
              dark:focus:ring-red-800">Удалить из корзины</button>
          </div>
        </div>
      `;
    });
  }

  basketElement.insertAdjacentHTML('beforeend', template)

  // Need to fix
  const removeBtns = basketElement.querySelectorAll('.remove-basket-btn')
  removeBtns.forEach((button) => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('[data-id]')
      const carId = card?.getAttribute('data-id')
      console.log('carId', carId)

      if (carId) removeFromBasket(carId)
    })
  })
}

/**
 * Функция генерации и вставки шаблона (карточка)
 * @param {array} products - продукты
 * @param {string} defaultImgFile - имя файла картинки по умолчанию (если нет product.imgSrc)
//  * @param {Element} container - DOM-элемент, куда вставлять карточку
 */
export const generateTemplate = (products, defaultImgFile, container) => {
    let template = ''

    if (products && Array.isArray(products)) {
        // Массив с названиями картинок из public/images
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
<div data-id="${
    product?.id
}" class="w-full max-w-sm mb-6 bg-white border border-gray-200 rounded-lg shadow-sm
 dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <div class="flex justify-center items-center w-full mt-2  min-h-72">
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


// Навешиваем обработчики на кнопки 'Добавить в корзину' после рендера карточек
const allBtns = document?.querySelectorAll('.basket-btn');
if (allBtns) {
  allBtns.forEach((button) => {
    button.addEventListener('click', (event) => {
      const card = event.target.closest('[data-id]');
      const carId = card?.getAttribute('data-id');
      // Получаем товар по id из products
      // Находим DOM-элемент карточки и извлекаем все данные
      const product = products?.find((element) => element?.id === Number(carId));

      if (product) {
        // Берём картинку из img внутри карточки
        const imgEl = card?.querySelector('img');
        const imgSrc = imgEl?.getAttribute('src');
        // Создаём копию товара с актуальной картинкой
        const productForBasket = { ...product, imgSrc };
        addToBasket(productForBasket);
      }
    });
  });
}
}
