import Vue from 'vue'
import '@/assets/css/main.less'
import {
    Button,
    Icon,
    Input,
    Checkbox,
    Tooltip,
    Switch,
    Table,
    TabPane,
    Row,
    Col,
    Menu,
    MenuItem,
    Panel,
    TimelineItem,
    Collapse,
    Time,
    Timeline,
    DatePicker,
    Cascader,
    Tree,
    Message,
    Modal,
    Poptip,
    LoadingBar,
    Spin,
    Notice,
    Form,
    FormItem,
    Avatar,
    DropdownMenu,
    DropdownItem,
    Dropdown,
    Tabs,
    Submenu,
    MenuGroup,
    Breadcrumb,
    BreadcrumbItem,
    Circle,
    Page,
    RadioGroup,
    Radio,
    InputNumber,
    ButtonGroup,
    Card,
    CheckboxGroup,
    Divider 
} from 'iview'

// 全局注册组件
const components = {
    'sButton': Button,
    'sIcon': Icon,
    'sInput': Input,
    'sCheckbox': Checkbox,
    'sTooltip': Tooltip,
    'sSwitch': Switch,
    'sTable': Table,
    'sTabPane': TabPane,
    'sRow': Row,
    'sCol': Col,
    'sPanel': Panel,
    'sCollapse': Collapse,
    'sDatePicker': DatePicker,
    'sCascader': Cascader,
    'sTime': Time,
    'sTimeline': Timeline,
    'sTimelineItem': TimelineItem,
    'sTree': Tree,
    'sPoptip': Poptip,
    'sModal': Modal,
    'sLoadingBar': LoadingBar,
    'sNotice': Notice,
    'sSpin': Spin,
    'sForm': Form,
    'sFormItem': FormItem,
    'sMenu': Menu,
    'sMenuItem': MenuItem,
    'sAvatar': Avatar,
    'sDropdownMenu': DropdownMenu,
    'sDropdownItem': DropdownItem,
    'sDropdown': Dropdown,
    'sTabs': Tabs,
    'submenu': Submenu,
    'sMenuGroup': MenuGroup,
    'sBreadcrumb': Breadcrumb,
    'sBreadcrumbItem': BreadcrumbItem,
    'sCircle': Circle,
    'sPage': Page,
    'sRadioGroup': RadioGroup,
    'sRadio': Radio,
    'sInputNumber': InputNumber,
    'sButtonGroup': ButtonGroup,
    'sCard': Card,
    'sCheckboxGroup': CheckboxGroup,
    'sDivider': Divider
}

// 全局注册按需iview组件
Object.keys(components).forEach(key => {
    Vue.component(key, components[key]);
})

// 配置项
Message.config({ 
    top: 20, 
    duration: 3 
});

Vue.prototype.$Loading = LoadingBar;
Vue.prototype.$Message = Message;
Vue.prototype.$Modal = Modal;
Vue.prototype.$Notice = Notice;
Vue.prototype.$Spin = Spin;