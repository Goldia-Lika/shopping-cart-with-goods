import { SELECTORS } from './selectors'
import { createProduct } from './api'
import { Notification } from './components/notification'
import { generateTemplate } from './card.js'


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
     new Notification({title: 'Добавление товаров', subtitle: 'Товар был добавлен успешно' })
    })
  }
}  