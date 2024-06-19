import { createContext } from 'react';

export enum BottamNav {
    HOME = 'home',
    SEARCH = 'search',
    BOOKMARK = 'bookmark',
    PROFILE = 'profile',
}

export type NavType = {
    activePage: BottamNav,
    activeValue: number
}


export type FilterData ={
    GuestCount: number,
    startDate: any,
    endDate: any,
    Area: string
}

export type ComponentVisbilityState = {
    login: boolean,
    activePage: NavType,
    showMenuPage: boolean,
    showFilterPage: boolean,
    showLocationsDrawer: boolean,
    filterData: FilterData,
    showDetailsPage: boolean,
    showUserDetailsPage: boolean,
    showBookingsPage: FilterData,
    userLoggedIn: boolean,
    villa: any,
    villas: any[]
};

export const InitialComponentState: ComponentVisbilityState = {
    login: false,
    activePage: { activePage: BottamNav.HOME, activeValue: 0 },
    showMenuPage: false,
    showFilterPage: false,
    showLocationsDrawer: false,
    filterData:{
        GuestCount: 0,
        startDate: '',
        Area: '',
        endDate: ''
    },
    showDetailsPage:false,
    showBookingsPage:{
        GuestCount: 0,
        startDate: '',
        Area: '',
        endDate: ''
    },
    userLoggedIn:false,
    villa:{},
    villas:[],
    showUserDetailsPage:false
};

export type ComponentDispatchAction = {
    type: Actions;
    data?:
    | boolean
    | NavType
    | FilterData
    villa:any,
    villas:any[]
};

export enum Actions {
    SET_LOGIN,
    SET_ACTIVE_PAGE,
    SHOW_HIDE_MENU_PAGE,
    SHOW_HIDE_FILTER_PAGE,
    SET_FILTER_DATA,
    SHOW_HIDE_DETAILS_PAGE,
    SHOW_HIDE_BOOKINGS_PAGE,
    SET_IS_LOGGGED_IN,
    SET_USER_DETAILS,
    SHOW_HIDE_LOCATIONS_DRAWER,
    SET_VILLAS
}

export type Dispatch = (
    action: ComponentDispatchAction
) => void;

export const Context = createContext<{
    state: ComponentVisbilityState;
    dispatch: Dispatch;
}>({
    state: InitialComponentState,
    dispatch: noop,
});

export const ComponentReducer = (
    state: ComponentVisbilityState,
    action: ComponentDispatchAction
): ComponentVisbilityState => {
    switch (action.type) {
        case Actions.SET_VILLAS:
            return {
                ...state,
                villas: action.villas
            }
        case Actions.SET_LOGIN:
            return {
                ...state,
                login: action.data as boolean,
            };
        case Actions.SET_ACTIVE_PAGE: {
            return {
                ...state,
                activePage: action.data as NavType,
            }
        }
        case Actions.SHOW_HIDE_MENU_PAGE: {
            return {
                ...state,
                showMenuPage: action.data as boolean
            }
        }
        case Actions.SHOW_HIDE_FILTER_PAGE: {
            return {
                ...state,
                showFilterPage: action.data as boolean,
                villas:action.villas
            }
        }
        case Actions.SHOW_HIDE_LOCATIONS_DRAWER: {
            return {
                ...state,
                showLocationsDrawer: action.data as boolean,
            }
        }
        case Actions.SET_FILTER_DATA:{
            return{
                ...state,
                filterData: action.data as FilterData,
                villas:action.villas
            }
        }
        case Actions.SHOW_HIDE_DETAILS_PAGE:{
            return{
                ...state,
                showDetailsPage:action.data as boolean,
                villa:action.villa
            }
        }
        case Actions.SHOW_HIDE_BOOKINGS_PAGE:{
            return{
                ...state,
                showBookingsPage:action.data as FilterData,
                villa:action.villa
            }
        }
        case Actions.SET_IS_LOGGGED_IN:{
            return{
                ...state,
                userLoggedIn: action.data as boolean
            }
        }
        case Actions.SET_USER_DETAILS:{
            return{
                ...state,
                showUserDetailsPage: action.data as boolean
            }
        }
    }
};
function noop(action: ComponentDispatchAction): void {
    throw new Error('Function not implemented.');
};
