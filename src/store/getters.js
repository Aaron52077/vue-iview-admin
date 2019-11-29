const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    roles: state => state.user.roles,
    logs: state => state.user.logs,
    sidebar: state => state.app.sidebar,
    language: state => state.app.language,
    navbar: state => state.app.navbar,
    device: state => state.app.device,
}

export default getters