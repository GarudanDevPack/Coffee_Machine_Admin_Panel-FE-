import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
const Typography = React.lazy(() => import('./views/theme/typography/Typography'))
const Machines = React.lazy(() => import('./views/pages/nav/Machine'))
const Customers = React.lazy(() => import('./views/pages/nav/Customer'))
const Merchants = React.lazy(() => import('./views/pages/nav/Merchant'))
const BrewStocks = React.lazy(() => import('./views/pages/nav/Stock'))
const CustomerWallets = React.lazy(() => import('./views/pages/nav/CustomerWallet'))
const SalesReportings = React.lazy(() => import('./views/pages/nav/Sales'))
const PushNotificatons = React.lazy(() => import('./views/pages/nav/Notification'))
const MachineAlerts = React.lazy(() => import('./views/pages/nav/Alert'))
const Promotions = React.lazy(() => import('./views/pages/nav/Promotion'))
const Items = React.lazy(() => import('./views/pages/nav/Items'))
const ItemTypes = React.lazy(() => import('./views/pages/nav/categories/ItemType'))
const AlertTypes = React.lazy(() => import('./views/pages/nav/categories/AlertType'))
const NotificationTypes = React.lazy(() => import('./views/pages/nav/categories/NotificationType'))
const Volume = React.lazy(() => import('./views/pages/nav/Volume'))

const AddMachineModal = React.lazy(() =>
  import('./views/modal/AddComponentModel').then((module) => ({ default: module.AddMachineModal })),
)
const AddCustomerModal = React.lazy(() =>
  import('./views/modal/AddComponentModel').then((module) => ({
    default: module.AddCustomerModal,
  })),
)
const AddMerchantModal = React.lazy(() =>
  import('./views/modal/AddComponentModel').then((module) => ({
    default: module.AddMerchantModal,
  })),
)
const AddBrewStockModal = React.lazy(() =>
  import('./views/modal/AddComponentModel').then((module) => ({
    default: module.AddBrewStockModal,
  })),
)
const AddCustomerWalletModal = React.lazy(() =>
  import('./views/modal/AddComponentModel').then((module) => ({
    default: module.AddCustomerWalletModal,
  })),
)
const ViewSalesRepotingModal = React.lazy(() =>
  import('./views/modal/AddComponentModel').then((module) => ({
    default: module.ViewSalesRepotingModal,
  })),
)

const AddNotificationModal = React.lazy(() =>
  import('./views/modal/AddComponentModel').then((module) => ({
    default: module.AddNotificationModal,
  })),
)
const AddAlertModal = React.lazy(() =>
  import('./views/modal/AddComponentModel').then((module) => ({
    default: module.AddAlertModal,
  }))
)
const AddPromotionsModal = React.lazy(() =>
  import('./views/modal/AddComponentModel').then((module) => ({
    default: module.AddPromotionModal,
  })),
)

const AddItemTypeModal = React.lazy(() =>
  import('./views/modal/AddComponentModel').then((module) => ({
    default: module.AddItemTypeModal,
  })),
)
const AddAlertTypeModal = React.lazy(() =>
  import('./views/modal/AddComponentModel').then((module) => ({
    default: module.AddAlertTypeModal,
  })),
)
const AddNotificationTypeModal = React.lazy(() =>
  import('./views/modal/AddComponentModel').then((module) => ({
    default: module.AddAlertTypeModal,
  })),
)
// const AddMachineModal = React.lazy(() => import('./views/modal/AddComponentModel'))
// const AddCustomerModal = React.lazy(() => import('./views/modal/AddComponentModel'))

// Base
const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
const Cards = React.lazy(() => import('./views/base/cards/Cards'))
const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
const Navs = React.lazy(() => import('./views/base/navs/Navs'))
const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
const Progress = React.lazy(() => import('./views/base/progress/Progress'))
const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
const Tabs = React.lazy(() => import('./views/base/tabs/Tabs'))
const Tables = React.lazy(() => import('./views/base/tables/Tables'))
const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// Buttons
const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
const Range = React.lazy(() => import('./views/forms/range/Range'))
const Select = React.lazy(() => import('./views/forms/select/Select'))
const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const Charts = React.lazy(() => import('./views/charts/Charts'))

// Icons
const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

// Notifications
const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

const Widgets = React.lazy(() => import('./views/widgets/Widgets'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  { path: '/pages/nav/machines', name: 'Machines', element: Machines },
  { path: '/pages/nav/customers', name: 'Customers', element: Customers },
  { path: '/pages/nav/merchants', name: 'Merchants', element: Merchants },
  { path: '/pages/nav/brewstocks', name: 'BrewStocks', element: BrewStocks },
  { path: '/pages/nav/customerwallets', name: 'CustomerWallets', element: CustomerWallets },
  { path: '/pages/nav/salesreportings', name: 'SalesReportings', element: SalesReportings },
  { path: '/pages/nav/pushnotifications', name: 'PushNotificatons', element: PushNotificatons },
  { path: '/pages/nav/machinealerts', name: 'MachineAlerts', element: MachineAlerts },
  { path: '/pages/nav/promotions', name: 'Promotions', element: Promotions },
  { path: '/pages/nav/items', name: 'Items', element: Items },

   { path: '/categories', name: 'Categories', element: Cards, exact: true },
  { path: '/categories/itemtypes', name: 'Item Types', element: ItemTypes },
  { path: '/categories/alerttypes', name: 'Alert Types', element: AlertTypes },
  { path: '/categories/notificationtypes', name: 'Notification Types', element: NotificationTypes },
    { path: '/pages/nav/Volume', name: 'Volume', element: Volume },
  { path: '/modal/addmachinemodal', name: 'AddMachineModal', element: AddMachineModal },
  { path: '/modal/addcustomermodal', name: 'AddCustomerModal', element: AddCustomerModal },
  { path: '/modal/addmerchantmodal', name: 'AddMerchantModal', element: AddMerchantModal },
  { path: '/modal/addbrewstockmodal', name: 'AddBrewStockModal', element: AddBrewStockModal },
  { path: '/modal/addcustomerwalletmodal', name: 'AddCustomerWalletModal', element: AddCustomerWalletModal },
  { path: '/modal/viewsalesrepotingmodal', name: 'ViewSalesRepotingModal', element: ViewSalesRepotingModal },//ViewSalesRepotingModal
  { path: '/modal/addnotificationmodal', name: 'AddNotificationModal', element: AddNotificationModal },
  { path: '/modal/addalertmodal', name: 'AddAlertModal', element: AddAlertModal },
  { path: '/modal/addpromotionsmodal', name: 'AddPromotionsModal', element: AddPromotionsModal },
  { path: '/modal/additemtypemodal', name: 'AddItemTypeModal', element: AddItemTypeModal },
  { path: '/modal/addalerttypemodal', name: 'AddAlertTypeModal', element: AddAlertTypeModal },
  { path: '/modal/addnotificationtypemodal', name: 'AddNotificationTypeModal', element: AddNotificationTypeModal },


  { path: '/items', name: 'Base', element: Cards, exact: true },
  { path: '/items/accordion', name: 'Accordion', element: Accordion },
  { path: '/items/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },

  { path: '/theme/typography', name: 'Typography', element: Typography },
  

  { path: '/base', name: 'Base', element: Cards, exact: true },
  { path: '/base/accordion', name: 'Accordion', element: Accordion },
  { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  { path: '/base/cards', name: 'Cards', element: Cards },
  { path: '/base/carousels', name: 'Carousel', element: Carousels },
  { path: '/base/collapses', name: 'Collapse', element: Collapses },
  { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  { path: '/base/navs', name: 'Navs', element: Navs },
  { path: '/base/paginations', name: 'Paginations', element: Paginations },
  { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  { path: '/base/popovers', name: 'Popovers', element: Popovers },
  { path: '/base/progress', name: 'Progress', element: Progress },
  { path: '/base/spinners', name: 'Spinners', element: Spinners },
  { path: '/base/tabs', name: 'Tabs', element: Tabs },
  { path: '/base/tables', name: 'Tables', element: Tables },
  { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },
  { path: '/charts', name: 'Charts', element: Charts },
  { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  { path: '/forms/select', name: 'Select', element: Select },
  { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  { path: '/forms/range', name: 'Range', element: Range },
  { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  { path: '/forms/layout', name: 'Layout', element: Layout },
  { path: '/forms/validation', name: 'Validation', element: Validation },
  { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  { path: '/icons/flags', name: 'Flags', element: Flags },
  { path: '/icons/brands', name: 'Brands', element: Brands },
  { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  { path: '/notifications/badges', name: 'Badges', element: Badges },
  { path: '/notifications/modals', name: 'Modals', element: Modals },
  { path: '/notifications/toasts', name: 'Toasts', element: Toasts },
  { path: '/widgets', name: 'Widgets', element: Widgets },
]

export default routes
