import {Sidebar} from './components/sidebar.js'
import { getProducts } from './api.js'
import { generateTemplate } from './templates.js'
import { SELECTORS } from './global.js'
import { createNewProduct } from './handlers.js'


  window.addEventListener('DOMContentLoaded', async () => {
    //получение продуктов
    const products = await getProducts()

    // формирование шаблона
  generateTemplate(products, null, SELECTORS?.productsList)
  
  // вызываем сайдбар
  new Sidebar('#sidebar', '#sidebar-open')

  // активируем обработчик форму добавления товара
  createNewProduct()

  })

 