import { useEffect, useState } from "react";
import {
  InstagramOutlined,
  DockerOutlined,
  KubernetesOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Outlet, useLocation, useNavigate, Link, useNavigation } from "react-router-dom";
import { Menu, message, Tooltip, Typography } from "antd";
import classnames from "classnames";
import style from "./App.module.less";
import { getItem } from "@/utils/storage";

type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    key: "FE",
    icon: <InstagramOutlined />,
    label: <Link to="/bfe">大前端</Link>,
  },
  {
    key: "BE",
    icon: <DockerOutlined />,
    label: <Link to="/be">后端</Link>,
  },
  {
    key: "AI",
    icon: <KubernetesOutlined />,
    label: <Link to="/ai">人工智能</Link>,
  },
];

const { Link: LinkCom } = Typography;

function App() {
  const navigation = useNavigation();
  const [current, setCurrent] = useState("");
  const navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const key = pathname.replace("/", "");
    setCurrent(key);
  }, [pathname]);

  useEffect(() => {
    if (pathname === "/") {
      const token = getItem("token");
      if (!token) {
        message.info("请先登录");
        navigate("/user/login");
      }
    }
  }, [pathname, navigate]);

  const toHome = () => {
    navigate("/");
  };

  return (
    <div className={style.App}>
      <header className={style.header}>
        <Menu
          className={style.menu}
          selectedKeys={[current]}
          mode="horizontal"
          items={items}
        />
        {pathname !== "/" && (
          <div className={style.affix}>
            <Tooltip title="回到首页">
              <div className={style.homeIcon} onClick={toHome}></div>
            </Tooltip>
          </div>
        )}
        <div className={style.tipImg}></div>
      </header>
      {pathname === "/" ? (
        <article className={style.article}>
          记录知识在：
          <LinkCom href="https://github.com/javasbot/javasbot.github.io/issues">
            issue区
          </LinkCom>
        </article>
      ) : (
        <div
          className={classnames(
            style.container,
            navigation.state === "loading" ? style.loading : ""
          )}
        >
          <Outlet />
        </div>
      )}
      <footer className={style.footer}>
        &copy;版权所有，只有一点点 Knowledge Science Art Truth Fairness Justice
      </footer>
    </div>
  );
}

export default App;
