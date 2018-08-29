import Accounts from '../containers/Accounts'
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
]

export default routes
