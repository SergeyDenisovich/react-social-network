import React from 'react';
// import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import { selectIsAuth, selectCurrentUserId } from '../../redux/auth-selector';
import { logout } from '../../redux/auth-reducer';
import { useSelector, useDispatch } from 'react-redux';
import { Layout } from 'antd';
import { Avatar, Col, Logout, Menu, Row, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Header = (props) => {
  const isAuth = useSelector(selectIsAuth);
  const login = useSelector(selectCurrentUserId);
  const dispatch = useDispatch();

  const logoutCallback = () => {
    dispatch(logout());
  };

  const { Header } = Layout;

  return (
    <Header className='header'>
      <Row>
        <Col span={20}>
          <Menu theme='dark' mode='horizontal' defaultSelectedKeys={['2']}>
            <Menu.Item key='1'>
              <Link to='/developers'>Developers</Link>
            </Menu.Item>
          </Menu>
        </Col>

        {isAuth ? (
          <>
            <Col span={1}>
              <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
            </Col>
            <Col span={3}>
              <Button onClick={logoutCallback} type='primary'>
                Log out
              </Button>
            </Col>
          </>
        ) : (
          <Col span={4}>
            <Link to={'/login'}>Log in</Link>
          </Col>
        )}
      </Row>
    </Header>
  );
};

export default Header;
