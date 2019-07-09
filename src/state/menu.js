function reducer(state, action) {
  switch (action.type) {
    case "open":
      return { isOpen: true };
    case "close":
      return { isOpen: false };
    default:
      throw new Error();
  }
}

export default reducer;
