declare global {
  interface Window {
    [propName: string]: any;
  }
}

/** 必须作为一个模块导出 */
export {};
