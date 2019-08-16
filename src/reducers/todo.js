const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.payload.id,
          name: action.payload.content,
          completed: false,
        },
      ];
    default:
      return state;
  }
};

export default todoReducer;
