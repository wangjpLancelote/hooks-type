import { ReactNode } from "react";

export interface IRoute {
  path: string;
  icon: string | ReactNode;
  name: string | ReactNode;
  children?: IRoute[];
  meta?: {
    develop?: boolean; // 是否是开发模式
    renderTitle?: string; // 渲染菜单名
  };
}
