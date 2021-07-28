function thousandthFormat (target) {
    if (Number.isNaN(target)) return;
    const str = target.toString();
    const strTarget = str.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3 ) ? next : index === 0 ? next + '' : (next + ',')) + prev; 
    }, '');
    return strTarget ? strTarget : 0;
}

// console.log('>>>>', thousandthFormat(3134));

let arr = [{
  type: 'IMAGE',
  name: '主图'
}];
arr = [];
console.log('>>>>', arr.some(v => v.type === 'IMAGE' && !v.format))