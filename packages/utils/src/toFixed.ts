/**
 *
 * @overview: toFixed 直接截取补零不进行四舍五入
 *
 */

/**
 * 使用定点表示法来格式化一个数
 * @param  {String|Number}  num     [必填，数字或者表示数字的字符串,范围为[0,20],超过范围则报错]
 * @param  {Number}  digits         [必填，小数点后数字的个数]
 * @return {String}                 [结果]
 * @demo  toFixed(0.099999,3) // '0.099'
 *        toFixed(0.09,4)     // "0.0900"
 *        toFixed(1,4)        // "1.0000"
 *        toFixed(0.09,0)     //   '0'
 *        toFixed(.99,3)      //  "0.990"
 */
function toFixed(num: number, digits: number) {
  // 是否为正数
  const isPositive = +num >= 0;
  let numString = num + '';

  // 去掉正负号，统一按照正数来处理，最后再加上符号
  numString = numString.replace(/^(?:-|\+)/gi, '');

  // 小数点过大
  /* istanbul ignore next */
  if (digits > 20 || digits < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }

  // 如果是简写如.11则整数位补0，变成0.11
  if (/^\./gi.test(numString)) {
    numString = '0' + numString;
  }

  // 非数字
  if (!/^\d+\.?\d*$/gi.test(numString)) {
    throw new Error('toFixed() num argument must be a valid num');
  }

  const numParts = numString.split('.');
  let result = '';

  // 在str后面加n个0
  const paddingZero = function (str: string, n: number) {
    for (let i = 0; i < n; i++) {
      str += '0';
    }
    return str;
  };

  // 在str后面加0，直至str的长度达到n
  // 如果超过了n，则直接截取前n个字符串
  const paddingZeroTo = function (str: string, n: number) {
    if (str.length >= n) {
      return str.substring(0, n);
    } else {
      return paddingZero(str, n - str.length);
    }
  };

  // 整数
  if (numParts.length < 2) {
    result = numParts[0] + '.' + paddingZero('', digits);
  } else {
    // 浮点数则截取
    result = numParts[0] + '.' + paddingZeroTo(numParts[1], digits);
  }

  // 如果最后一位为.,则去除
  result = result.replace(/\.$/gi, '').replace(/^\./gi, '0.');

  // 加上符号位
  result = isPositive ? result : '-' + result;
  return result;
}

export default toFixed;
