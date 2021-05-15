import {
    COLLECTIONS,
    ERROR,
    HOME,
    HOME_PATH,
    ILLUSTRATIONS,
    PHOTOGRAPHY,
} from "./defs"

export const getPage = (location) => {
    const path = location.pathname
    if (path.indexOf(COLLECTIONS) !== -1) {
        return COLLECTIONS
    } else if (path.indexOf(PHOTOGRAPHY) !== -1) {
        return PHOTOGRAPHY
    } else if (path.indexOf(ILLUSTRATIONS) !== -1) {
        return ILLUSTRATIONS
    } else if (path === HOME_PATH) {
        return HOME
    } else {
        return ERROR
    }
}
