import { cashConstants } from '../constants/actions';
const initialState = {
  total_amount: (0).toFixed(2),
  amount: (0).toFixed(2),
  products: [],
  type: '%',
  totalDiscount: (0).toFixed(2),
  totalDelivery: (0).toFixed(2),
  sideOption: '0',
  customer: null
};

//dummy content
const cashData = (state = initialState, action) => {
  switch (action.type) {
    case cashConstants.SUM_AMOUNT:
      return {
        ...state,
        amount: parseFloat(state.amount * 10 + action.payload / 100).toFixed(2),
      };
    case cashConstants.SUM_TOTAL:
      return state.amount != 0
        ? {
            ...state,
            total_amount: (
              parseFloat(state.total_amount) + parseFloat(state.amount)
            ).toFixed(2),
            products: [
              ...state.products,
              {
                id: state.products.length + 1,
                name: 'Custom product ' + (state.products.length + 1),
                quant: 1,
                unitPrice: state.amount,
                total: state.amount,
                discount: (0).toFixed(2),
                type: '%',
                image: '',
              },
            ],
            amount: (0).toFixed(2),
          }
        : { ...state };
    case cashConstants.BACK_AMOUNT:
      return {
        ...state,
        amount: (Math.floor(state.amount * 10) / 100).toFixed(2),
      };
    case cashConstants.CLEAR_AMOUNT:
      return { ...state, amount: (0).toFixed(2) };
    case cashConstants.CHANGE_OPTION:
      return { ...state, sideOption: action.payload };
    case cashConstants.ADD_DISCOUNT:
      return {
        ...state,
        totalDiscount: parseFloat(action.payload.discount),
        type: action.payload.type,
      };
    case cashConstants.ADD_DELIVERY:
      return { ...state, totalDelivery: parseFloat(action.payload) };
    case cashConstants.REMOVE_DISCOUNT:
      return { ...state, totalDiscount: parseFloat(0) };
    case cashConstants.REMOVE_DELIVERY:
      return { ...state, totalDelivery: parseFloat(0) };
    case cashConstants.ADD_CUSTOMER:
      return { ...state, customer: action.payload };
    case cashConstants.EDIT_PRODUCT:
      let newTotal = 0;
      let newProducts = state.products.map(product =>
        product.id === action.payload.id ? action.payload : product
      );
      let newProductsRealPrice = newProducts.map(product => {
        product.total = product.quant * product.unitPrice;
        newTotal += product.total;
        return product;
      });

      return {
        ...state,
        products: newProductsRealPrice,
        total_amount: newTotal,
      };

    default:
      return state;
  }
};

export default cashData;
