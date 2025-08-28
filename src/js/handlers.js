import { SELECTORS } from './global.js'
import { createProduct } from './api'
import { generateTemplate } from './templates.js'
import { PRODUCTS_IN_BASKET } from './global'
import { renderBasket } from './templates.js'
import { Notification } from './components/notification.js'

//Функция добавления товаров через форму (WIP)
export const createNewProduct = async ()=> {
  if (SELECTORS?.addProductForm) {
    SELECTORS?.addProductForm?.addEventListener('submit', async (event) => {
      event.preventDefault() 
  
      
      //достаем форму    
      const form = event.target

      const product = {
        name: form.name.value,
        rating: Number.parseInt(form.rating.value, 10),
        price: Number.parseInt(form.price.value, 10),
        category: form.category.value,
        imgSrc: form.imgSrc.value,
        description: form.description.value,
      }

      //создаем продукт
      const newProduct = await createProduct(product)
      console.log('newProduct', newProduct)
  // обновляем весь список товаров на главной странице
  const products = await import('./api').then(mod => mod.getProducts())
  // очищаем контейнер
  if (SELECTORS?.productsList) SELECTORS.productsList.innerHTML = ''
  generateTemplate(await products, null, SELECTORS?.productsList)
      // можно очистить форму
      form.reset()
    })
  }
}  

// функция добавления товара в корзину без дублей
export const addToBasket = (product) => {
    const exists = PRODUCTS_IN_BASKET?.some(item => item?.id === product?.id)
    if (!exists)   PRODUCTS_IN_BASKET.push(product)
    renderBasket(PRODUCTS_IN_BASKET, SELECTORS?.basketList)

new Notification({
  title: 'Добавление товара',
  subtitle: 'Товар успешно добавлен в корзину',
})
}

// функция удаления товара из корзины
export const  removeFromBasket = (carId) => {
  const filteredProducts = PRODUCTS_IN_BASKET?.filter((item) => String(item?.id) !== carId)
  PRODUCTS_IN_BASKET.length = 0;
  PRODUCTS_IN_BASKET.push(...filteredProducts);
  renderBasket(PRODUCTS_IN_BASKET, SELECTORS?.basketList)

  new Notification({
    title: 'Удаление товара',
    subtitle: 'Товар успешно удален из корзины',
  })
}
