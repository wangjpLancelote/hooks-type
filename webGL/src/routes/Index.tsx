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
  },
  {
    path: "/air",
    name: "全景视频",
    icon: <HomeOutlined />
  },
  {
    path: "/maps",
    name: "基础样式",
    icon: <HomeOutlined />,
    children: [
      {
        path: "/map",
        name: "基础样式",
        icon: <HomeOutlined />,
      },
      {
        path: "/map/group",
        name: "基础样式群组",
        icon: <HomeOutlined />
      },
      {
        path: "/map/extrude",
        name: "样式拉伸",
        icon: <HomeOutlined />
      }
    ]
  },
  
];
