import NP from 'number-precision';

export const safeDivideNumber = (val: any) => {
  return Number(val) === 0 ? 1 : val;
};
// 传入的值是 undefined会报 toString 的错误，所以统一处理为 0
const safeMath = {
  multiply(a: any, b: any) {
    let val = NP.times(a || 0, b || 0);
    return Number(val);
  },
  add(a: any, b: any) {
    let val = NP.plus(a || 0, b || 0);
    return Number(val);
  },
  divide(a: any, b: any) {
    let val = NP.divide(a || 0, safeDivideNumber(b || 0));
    return Number(val);
  },
  minus(a: any, b: any) {
    let val = NP.minus(a || 0, b || 0);
    return Number(val);
  },
};

export default safeMath;
