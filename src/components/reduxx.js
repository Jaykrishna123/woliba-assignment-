

const initialState = {
  data: [],
  logindata: []
};

export const reducer = (state = initialState, action) => {
  console.log(state.data, 'state', action,'action')
  switch (action.type) {
    case 'SET_DATA':
      { state.data.push(action.payload) };
    case 'RESET_STATE':
      {
        state = initialState
      }
    case 'SET_LOGIN':
      { state.logindata.push(action.payload) }
    default:
      return state;
  }
};


export const setData = (registerdata) => ({
  type: 'SET_DATA',
  payload: registerdata,
});

export const setLogin = (logindata) => ({
  type: 'SET_LOGIN',
  payload: logindata
})
export const setReset = (alldata) => ({
  type: 'RESET_STATE',
  payload: alldata
})

