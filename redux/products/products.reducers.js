const INITIAL_STATE = {
  all : {
    currentPage : 0,
    products : [],
    pages : 0
  },
  grains : {
    currentPage : 0,
    products : [],
    pages : 0
  },
  oils : {
    currentPage : 0,
    products : [],
    pages : 0
  },
  proteins : {
    currentPage : 0,
    products : [],
    pages : 0
  },
  vegetables : {
    currentPage : 0,
    products : [],
    pages : 0
  },
  tubers : {
    currentPage : 0,
    products : [],
    pages : 0
  },
  spices : {
    currentPage : 0,
    products : [],
    pages : 0
  },
  fruits : {
    currentPage : 0,
    products : [],
    pages : 0
  },
}

const productReducer = (state=INITIAL_STATE, action) => {
  switch(action.type) {
    case 'SET_ALL' :
      return {
        ...state,
        all : {
          currentPage : state.all.currentPage + 1,
          products : [...state.all.products, ...action.payload.products],
          pages : action.payload.pages
        }
      }
    case 'SET_GRAINS' : 
      return {
        ...state,
        grains : {
          currentPage : state.grains.currentPage + 1,
          products : [...state.grains.products, ...action.payload.products],
          pages : action.payload.pages
        }
      }
    case 'SET_VEGETABLES' : 
      return {
        ...state,
        vegetables : {
          currentPage : state.vegetables.currentPage + 1,
          products : [...state.vegetables.products, ...action.payload.products],
          pages : action.payload.pages
        }
      }
    case 'SET_OILS' : 
      return {
        ...state,
        oils : {
          currentPage : state.oils.currentPage + 1,
          products : [...state.oils.products, ...action.payload.products],
          pages : action.payload.pages
        }
      }
    case 'SET_FRUITS' : 
      return {
        ...state,
        fruits : {
          currentPage : state.fruits.currentPage + 1,
          products : [...state.fruits.products, ...action.payload.products],
          pages : action.payload.pages
        }
      }
    case 'SET_SPICES' : 
      return {
        ...state,
        spices : {
          currentPage : state.spices.currentPage + 1,
          products : [...state.spices.products, ...action.payload.products],
          pages : action.payload.pages
        }
      }
    case 'SET_TUBERS' : 
      return {
        ...state,
        tubers : {
          currentPage : state.tubers.currentPage + 1,
          products : [...state.tubers.products, ...action.payload.products],
          pages : action.payload.pages
        }
      }
    case 'SET_PROTEINS' : 
      return {
        ...state,
        proteins : {
          currentPage : state.proteins.currentPage + 1,
          products : [...state.proteins.products, ...action.payload.products],
          pages : action.payload.pages
        }
      }
    default : 
      return state;
  }
}

export default productReducer;