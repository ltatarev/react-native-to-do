const listReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_LIST':
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.name,
          userId: action.payload.userId,
        },
      ];
    default:
      return state;
  }
};

export default listReducer;
