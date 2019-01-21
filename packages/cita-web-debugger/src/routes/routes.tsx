import Accounts from '../containers/Accounts'
import Options from '../containers/Options'
import Transactions from '../containers/Transactions'

const routes = [
  {
    component: Accounts,
    path: '/accounts',
  },
  {
    component: Transactions,
    path: '/transactions',
  },
  {
    component: Options,
    path: '/options',
  },
]

export default routes
