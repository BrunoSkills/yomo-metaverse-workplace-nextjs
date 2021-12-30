import { atom } from 'recoil'

import type { Mate, TrackMapValue, Position } from '../types'


//Make a new atom for each track  and make sure not to duplcate keys

export const smallDeviceState = atom({
    key: 'small_device_state',
    default: false,
})

export const scaleState = atom({
    key: 'scale_state',
    default: {
        className: 'scene-scale-100',
        value: 1,
    },
})

export const onlineState = atom({
    key: 'online_state',
    default: false,
})

export const mutedState = atom({
    key: 'mutedState',
    default: true,
})

export const locationState = atom({
    key: 'location_state',
    default: {
        country: '',
        region: '',
    },
})

export const meState = atom({
    key: 'me_state',
    default: {
        name: '',
        image: '',
    },
})

export const mateMapState = atom({
    key: 'mate_map_state',
    default: new Map<string, Mate>(),
})

export const trackMapState = atom({
    key: 'track_map_state',
    default: new Map<string, TrackMapValue>(),
})

export const mePositionState = atom({
    key: 'me_position_state',
    default: {
        x: 0,
        y: 0,
    },
})

export const matePositionMapState = atom({
    key: 'mate_position_map_state',
    default: new Map<string, Position>(),
})

export const iframePageState = atom({
    key: 'iframe_page_state',
    default: {
        isOpen: false,
        iframeSrc: '',
    },
})
