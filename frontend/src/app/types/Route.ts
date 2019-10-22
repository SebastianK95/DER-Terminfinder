export interface Route {
    name: string,
    path: string,
    when: number,
    active: boolean,
    callable?: (component) => {}
}