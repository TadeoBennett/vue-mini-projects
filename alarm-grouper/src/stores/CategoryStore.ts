import { defineStore } from 'pinia';
import { Category } from 'src/models/Category';

export const useCategoryStore = defineStore('categoryStore', {
  state: () => ({
    categories: [] as Category[] | [],
    loadedCategories: false
  }),
  getters: {
    activeCategoryCount(){

    },
    categoryCount: (state) => {
      return state.categories.length
    },
    getCategoryNames(){
      let names = []
      this.categories.reduce((p, c) => { //p and c is the previous and current value
        names.push(c.name)
      }, 0)
      console.log("Category names: ", names)
      return names
    }
  },
  actions: {
    async getCategories(){
      console.log("getting categories...")
      const res = await fetch("http://localhost:3000/categories")
      const data = await res.json()

      this.categories = data
      this.loadedCategories = true
      console.log("categories: ", this.categories)
    },
    async addCategory(category){
      console.log("adding category...", category)
      try {
        const res = await fetch("http://localhost:3000/categories", {
          method: 'POST',
          body: JSON.stringify(category),
          headers: {'Content-Type': 'application/json'},
        });

        if (!res.ok) {  // Check if the response status is not in the range 200-299
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        this.categories.push(category);  //add the category to the list after pushing to server
        console.log("category added: ", category)
        console.log("new category list: ", this.categories)
      } catch (error) {
        console.error('Failed to add category: ', error);
      }
    },
    findCategory(categoryName){
      console.log("checking duplicate category name...")
      const dupCategory = this.categories.find(
        category => category.name === categoryName
      );
      console.log("category with duplicate name: ", dupCategory)
      return dupCategory
    }
  }
});
