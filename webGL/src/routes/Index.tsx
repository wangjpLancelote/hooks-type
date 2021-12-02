import { IRoute } from "@/utils/interface";
import { HomeOutlined } from "@ant-design/icons";
export const routes: IRoute[] = [
  {
    path: "/",
    name: "首页",
    icon: <HomeOutlined />
  },
  {
    path: "/sea",
    name: "海面",
    icon: <HomeOutlined />
  },
  {
    path: "/cube",
    name: "立方体",
    icon: <HomeOutlined />
  }
];
