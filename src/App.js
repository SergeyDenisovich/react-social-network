import React from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
// import DialogsContainer from './components/Dialogs/DialogsContainer';
import UsersContainer from './components/Users/UsersContainer';
// import ProfileContainer from './components/Profile/ProfileContainer';

// import HeaderContainer from './components/Header/HeaderContainer';
import Header from './components/Header/Header';

import LoginPage from './components/Login/Login';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initializeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
// import App from './App';
import store from './redux/redux-store';
// import { HashRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { withSuspense } from './hoc/withSuspense';
// import { NavLink } from 'react-router-dom';
import { Link } from 'react-router-dom';

// import styles from './components/Navbar/Navbar.module.css';

// =============== ANT DESIGN
import 'antd/dist/antd.css';
import { Button } from 'antd';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const { Content, Footer, Sider } = Layout;

// =========================================

// import { render } from '@testing-library/react';

const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));

class App extends React.Component {
  catchAllUnhandleErrors = (promiseRejectionEvent) => {
    alert('some error occured');
    console.error(promiseRejectionEvent);
  };

  componentDidMount() {
    this.props.initializeApp();
    window.addEventListener('unhandledrejection', this.catchAllUnhandleErrors);
  }

  componentWillUnmount() {
    window.removeEventListener('unhandledrejection', this.catchAllUnhandleErrors);
  }

  render() {
    if (!this.props.initialized) {
      // ПОКА НЕ ПРОИЗВЕДЕНА ПРОВЕРКА ИНИЦИИРОВАН ПОЛЬЗОВАТЕЛЬ ИЛИ НЕТ - ПОКАЗЫВАЙ КРУТИЛКУ
      return <Preloader />;
    }

    return (
      <Layout>
        <Header />
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
          <Layout className='site-layout-background' style={{ padding: '24px 0' }}>
            <Sider className='site-layout-background' width={200}>
              <Menu mode='inline' defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%' }}>
                <SubMenu key='sub1' icon={<UserOutlined />} title='Profile'>
                  <Menu.Item key='1'>
                    <Link to='/profile'>Profile</Link>
                  </Menu.Item>
                  <Menu.Item key='2'>
                    {' '}
                    <Link to='/dialogs'>Messages</Link>
                  </Menu.Item>
                  <Menu.Item key='3'>option3</Menu.Item>
                  <Menu.Item key='4'>option4</Menu.Item>
                </SubMenu>
                <SubMenu key='sub2' icon={<LaptopOutlined />} title='Developers'>
                  <Menu.Item key='5'>
                    <Link to='/developers'>Developers</Link>
                  </Menu.Item>
                  <Menu.Item key='6'>option6</Menu.Item>
                  <Menu.Item key='7'>option7</Menu.Item>
                  <Menu.Item key='8'>option8</Menu.Item>
                </SubMenu>
                <SubMenu key='sub3' icon={<NotificationOutlined />} title='subnav 3'>
                  <Menu.Item key='9'>option9</Menu.Item>
                  <Menu.Item key='10'>option10</Menu.Item>
                  <Menu.Item key='11'>option11</Menu.Item>
                  <Menu.Item key='12'>option12</Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>
            <Content style={{ padding: '0 24px', minHeight: 280 }}>
              <Switch>
                {/* ИСПОЛЬЗУЯ ОБЕРТКУ switch над route'ами не нужно указывать проп exact !!! т.к. в этом случае
            БУДЕТ ПРИСХОДИТЬ ПОИСК РОУТИНГА С СООТВЕТСТВУЮЩИМ path сверху вниз до первого совпадения !!! */}

                <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
                <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
                <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
                <Route path='/developers' render={() => <UsersContainer pageTitle='Users page' />} />
                <Route path='/login' render={() => <LoginPage />} />

                {/* ОБЩИЕ РОУТ ВЫНОСИТСЯ В КОНЕЦ (path='*') ОЗНАЧАЕТ, ЧТО ЕСЛИ НЕ БУДЕТ СОВПАДЕНИЙ,
            ТО Switch ОТРИСУЕТ ЭТОТ РОУТ*/}
                <Route
                  path='*'
                  render={() => (
                    <div>
                      404 NOT FOUND
                      <Button type='primary'>Click</Button>
                    </div>
                  )}
                />
              </Switch>
            </Content>
          </Layout>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Samurai social network</Footer>
      </Layout>
    );
    // return (
    //   <div className='app-wrapper'>
    //     <HeaderContainer />
    //     <Navbar />
    //     <div className='app-wrapper-content'>
    // <Switch>
    //   {/* ИСПОЛЬЗУЯ ОБЕРТКУ switch над route'ами не нужно указывать проп exact !!! т.к. в этом случае
    //         БУДЕТ ПРИСХОДИТЬ ПОИСК РОУТИНГА С СООТВЕТСТВУЮЩИМ path сверху вниз до первого совпадения !!! */}

    //   <Route exact path='/' render={() => <Redirect to={'/profile'} />} />
    //   <Route path='/dialogs' render={withSuspense(DialogsContainer)} />
    //   <Route path='/profile/:userId?' render={withSuspense(ProfileContainer)} />
    //   <Route path='/users' render={() => <UsersContainer pageTitle='Users page' />} />
    //   <Route path='/login' render={() => <LoginPage />} />

    //   {/* ОБЩИЕ РОУТ ВЫНОСИТСЯ В КОНЕЦ (path='*') ОЗНАЧАЕТ, ЧТО ЕСЛИ НЕ БУДЕТ СОВПАДЕНИЙ,
    //         ТО Switch ОТРИСУЕТ ЭТОТ РОУТ*/}
    //   <Route
    //     path='*'
    //     render={() => (
    //       <div>
    //         404 NOT FOUND
    //         <Button type='primary'>Click</Button>
    //       </div>
    //     )}
    //   />
    // </Switch>;
    //     </div>
    //   </div>
    // );
  }
}

const mapStateToProps = (state) => ({
  initialized: state.app.initialized,
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, {
    initializeApp,
  })
)(App);

// export default compose(
//     withRouter,
//     connect(mapStateToProps, {
//         initializeApp,
//     }),
// )(App);

// let SamuraiJSApp = (props) => {
//     return (
//         <HashRouter>
//             <Provider store={store}>
//                 <AppContainer />
//             </Provider>
//         </HashRouter>
//     );
// };

let SamuraiJSApp = (props) => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default SamuraiJSApp;
