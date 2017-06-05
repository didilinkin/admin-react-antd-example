import React from 'react'
import ReactDOM from 'react-dom'
import 'animate.css'
import { Router, Route, hashHistory, IndexRedirect } from 'react-router'

// 引入组件
import App          from './components/App'
import Page         from './components/Page'
import BasicTable   from './components/Tables/BasicTables'
import Tables2      from './components/Tables/tables2'
import FixActionTable   from './components/Tables/FixActionTable'

// 引入路由
const routes =
    <Route path={'/'} components={ Page }>
        <IndexRedirect to="/app" />
        <Route path={'app'} component={ App }>
            <Route path={'table'}>
                <Route path={'basicTable'} component={ BasicTable } />
                <Route path={'Tables2'} component={ Tables2 } />
                <Route path={'fixaction'} component={ FixActionTable } />
            </Route>
        </Route>
    </Route>

ReactDOM.render(
    <Router history={hashHistory}>
        {routes}
    </Router>,
    document.getElementById('root')
)
