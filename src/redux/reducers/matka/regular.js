const initialState = {
  bazaarsdata : {},
  gamesdata : [],
  numbersdata  :[],
}

export const regular = (state = initialState, action) => {
    switch (action.type) {
      case "SATTA_DAHSBOARD_REGULAR":
        return { ...state,  ...action.data}
        default:
        return state
    }
  }

