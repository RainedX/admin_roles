const title = 'admin'

const setPageTitle = (pageTitle) => {
    if (pageTitle) {
        return `${pageTitle}-${title}`
    }

    return `${title}`
}

export default setPageTitle