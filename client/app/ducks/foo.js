import Duck from 'extensible-duck';

export default new Duck({
  namespace: 'xfolio',
  store: 'foo',
  types: [
    'CALL_FOO',
  ],
  initialState: {
    data: null,
  },
  reducer: (state, action, duck) => {
    const { type, ...nextState } = action;
    switch (type) {
      case duck.types.CALL_FOO:
        console.log('call fooo');
        return {
          ...state,
          ...nextState,
        };
      default:
        return state;
    }
  },
  creators: duck => ({
    callFoo: (data) => ({ type: duck.types.CALL_FOO, data }),
  }),
});
