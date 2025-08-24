import {Sidebar} from './components/sidebar.js'
import { getProducts } from './api.js'
import { generateTemplate } from './card.js'
import { SELECTORS } from './selectors.js'
import { createNewProduct } from './handlers.js'


  window.addEventListener('DOMContentLoaded', async () => {
    //получение продуктов
    const products = await getProducts()
    console.log('products', products)

    // формирование шаблона
  generateTemplate(products, null, SELECTORS?.productsList)
  
  // вызываем сайдбар
  new Sidebar('#sidebar', '#sidebar-open')
  // активируем обработчик формы добавления товара
  createNewProduct()

  })





