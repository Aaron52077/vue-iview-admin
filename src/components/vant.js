import Vue from 'vue'
// babel.config.js 按需加载样式
// import '~vant/lib/index.css'
import {
    Row,
    Col,
    Button,
    Cell,
    CellGroup,
    Icon,
    Image,
    Popup,
    Tag,
    Skeleton,
    Checkbox,
    CheckboxGroup,
    DatetimePicker, 
    Dialog,
    NavBar,
    Toast,
    Field,
    Picker,
    Radio,
    RadioGroup,
    Search,
    Switch,
    Loading,
    ActionSheet,
    DropdownMenu,
    DropdownItem,
    Notify,
    PullRefresh,
    Circle,
    Collapse, 
    CollapseItem,
    Divider,
    ImagePreview,
    Lazyload,
    List,
    Swipe, 
    SwipeItem,
    Grid, 
    GridItem,
    Pagination,
    Tab, 
    Tabs,
    Tabbar, 
    TabbarItem,
    Step, 
    Steps   
} from 'vant'

// 全局注册组件
const components = {
    'vanRow': Row,
    'vanCol': Col,
    'vanButton': Button,
    'vanCell': Cell,
    'vanCellGroup': CellGroup,
    'vanIcon': Icon,
    'vanImage': Image,
    'vanPopup': Popup,
    'vanTag': Tag,
    'vanTabbar': Tabbar,
    'vanTabbarItem': TabbarItem,
    'vanGrid': Grid,
    'vanGridItem': GridItem,
    'vanSkeleton': Skeleton,
    'vanTab': Tab,
    'vanTabs': Tabs,
    'vanList': List,
    'vanCheckbox': Checkbox,
    'vanCheckboxGroup': CheckboxGroup,
    'vanDatetimePicker': DatetimePicker,
    'vanDialog': Dialog,
    'vanToast': Toast,
    'vanNavBar': NavBar,
    'vanField': Field,
    'vanPicker': Picker,
    'vanRadio': Radio,
    'vanRadioGroup': RadioGroup,
    'vanSearch': Search,
    'vanSwitch': Switch,
    'vanLoading': Loading,
    'vanActionSheet': ActionSheet,
    'vanDropdownMenu': DropdownMenu,
    'vanDropdownItem': DropdownItem,
    'vanNotify': Notify,
    'vanPullRefresh': PullRefresh,
    'vanCircle': Circle,  
    'vanCollapse': Collapse,
    'vanCollapseItem': CollapseItem,
    'vanDivider': Divider,
    'vanImagePreview': ImagePreview,
    'vanLazyload': Lazyload,
    'vanSwipe': Swipe,
    'vanSwipeItem': SwipeItem,
    'vanPagination': Pagination,
    'vanSteps': Steps,
    'vanStep': Step
}

// 全局注册按需iview组件
Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
})

Vue.prototype.$Dialog = Dialog;
Vue.prototype.$Toast = Toast;
Vue.prototype.$Notify = Notify;