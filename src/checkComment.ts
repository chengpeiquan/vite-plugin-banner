/** 
 * 校验注释内容
 * @param {string} comment - 要打包到JS文件里的注释内容
 * @return {string} error - 错误信息，如果为空表示校验通过
 */
const checkComment = (comment: string): string => {
  // 传入了非字符串类型
  if ( typeof comment !== 'string' ) {
    return 'The comment must be a string.';
  }

  // 没有传入注释或者传入了空注释
  if ( !comment ) {
    return 'The comment can not be empty.';
  }

  // 注释符号不成对
  if (
    (comment.includes('/*') && !comment.includes('*/'))
    ||
    (!comment.includes('/*') && comment.includes('*/'))
  ) {
    return 'If you want to pass in comment symbols, you must pass them in pairs.';
  }

  // 一切正常则返回一个空的错误信息
  return '';
}

export default checkComment;