import React from 'react';
import Light from '@/assets/light.svg';
import Dark from '@/assets/dark.svg';
import ThemeAuto from '@/assets/theme-auto.svg';
import { Menu, Avatar, Dropdown, ConfigProvider } from 'antd';
import {
  enable as enableDarkMode,
  disable as disableDarkMode,
  setFetchMethod as setFetch,
} from '@umijs/ssr-darkreader';

import './index.less';
import useThemeChange from '@/hooks/useThemeChange';
import { Theme_Token } from '@/constants/theme';
const themeMap = {
  auto: ThemeAuto,
  light: Light,
  dark: Dark,
};

const AntdThemeSwitch = () => {
  // @ts-ignore
  console.log(window.umi_plugin_ant_themeVar, 'window.umi_plugin_ant_themeVar');

  const { theme, changeTheme } = useThemeChange();
  const onMenuClick = async (event: { key: React.Key; keyPath: React.Key[] }) => {
    const { key } = event;
    changeTheme(key as 'light' | 'dark' | 'auto');
    if (key === 'dark') {
      //开启 暗黑模式
      enableDarkMode({
        brightness: 100,
        contrast: 90,
        sepia: 10,
      });
    } else {
      //关闭 暗黑模式
      disableDarkMode();
    }
    // 修改 antd 主题
    ConfigProvider.config({
      theme: Theme_Token[key],
    });
    // 修改 localStorage
    localStorage.setItem('theme', key as string);
  };

  /**
   * 下拉菜单
   */
  const menuHeaderDropdown = (
    <Menu className="menu" onClick={onMenuClick}>
      {/* <Menu.Item className="minWidth" key="auto">
        <Avatar size={20} src={themeMap.auto} />
        跟随系统
      </Menu.Item> */}
      <Menu.Item className="minWidth" key="light">
        <Avatar size={20} src={themeMap.light} />
        亮色
      </Menu.Item>
      <Menu.Item className="minWidth" key="dark">
        <Avatar size={20} src={themeMap.dark} />
        暗色
      </Menu.Item>
    </Menu>
  );
  return (
    <div className="antd-theme-switch">
      <Dropdown overlayClassName="theme-container" overlay={menuHeaderDropdown}>
        <div className="">
          <Avatar size={20} src={themeMap[theme]} />
        </div>
      </Dropdown>
    </div>
  );
};

export default AntdThemeSwitch;
