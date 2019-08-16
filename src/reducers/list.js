const listReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.content,
        },
      ];
    default:
      return state;
  }
};

export default listReducer;
