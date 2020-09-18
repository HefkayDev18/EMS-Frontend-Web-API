export const setCategoryProducts = (category, data) => dispatch => {
  switch(category) {
    case 'all' :
      return dispatch({ type : 'SET_ALL', payload : { products : data.products, pages : data.pages}})
    case 'grains' : 
      return dispatch({ type : 'SET_GRAINS', payload : { products : data.products, pages : data.pages}})
    case 'oils' : 
      return dispatch({ type : 'SET_OILS', payload : { products : data.products, pages : data.pages}})
    case 'vegetables' : 
      return dispatch({ type : 'SET_VEGETABLES', payload : { products : data.products, pages : data.pages}})
    case 'proteins' : 
      return dispatch({ type : 'SET_PROTEINS', payload : { products : data.products, pages : data.pages}})
    case 'spices' : 
      return dispatch({ type : 'SET_SPICES', payload : { products : data.products, pages : data.pages}})
    case 'tubers' : 
      return dispatch({ type : 'SET_TUBERS', payload : { products : data.products, pages : data.pages}})
    case 'fruits' : 
      return dispatch({ type : 'SET_FRUITS', payload : { products : data.products, pages : data.pages}})
    case 'search' :
      return dispatch({ type : 'SET_SEARCH_RESULTS', payload : { products : data.products, pages : data.pages, newSearch : data.ns }})
    default :
      return;
  }
}

export const setSearchText = text => ({
  type : 'SET_SEARCH_TEXT',
  payload : text
})