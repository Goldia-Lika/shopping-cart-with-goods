import { SELECTORS } from './selectors'
import { createProduct } from './api'
import { Notification } from './components/notification'

//Функция добавления товаров через форму (WIP)
export const addProductToPage = ()=> {
  if (SELECTORS?.addProductForm) {
    SELECTORS?.addProductForm?.addEventListener('submit', async (event) => {
      event.preventDefault() 
  
      
      //достаем форму    
      const form = event.target

      const values = {
        name: form.name.value,
        rating: Number.parseInt(form.rating.value, 10),
        price: Number.parseInt(form.price.value, 10),
        category: form.category.value,
        imgSrc: form.imgSrc.value,
        description: form.description.value,
      }

      //создаем продукт
      const result = await createProduct(values)

     
     new Notification({title: 'Добавление товаров', subtitle: 'Товар был добавлен успешно' })
    })
  }
}  