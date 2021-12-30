import Head from 'next/head'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'

import Sidebar from '../components/minor/sidebar'
import FloorLinks from '../components/minor/floor-links'
import Guide from '../components/minor/guide'
import IframePage from '../components/minor/iframe-page'

import { useSetRecoilState } from 'recoil'
import { locationState, iframePageState } from '../store/atom'

import type { NextPage } from 'next'
import type { PageAuth, PageSceneScale, Location, Area } from '../types'

const Scene = dynamic(() => import('../components/scene'), { ssr: false })

export const getServerSideProps = ({ query }: any) => {
    return {
        props: {
            country: query.country || '',
            region: query.region || '',
        },
    }
}

const Home: NextPage<Location> & PageAuth & PageSceneScale = ({ country, region }) => {
    const setLocationState = useSetRecoilState(locationState)
    const setIframePageState = useSetRecoilState(iframePageState)

    useEffect(() => {
        setLocationState({ country, region })
    }, [])
  

    return (
        <>
            <Head>
                <title>
                    Open-source Metaverse Workplace with Geo-distributed System Tech Stacks
                </title>
            </Head>
            <div className='w-screen h-screen flex justify-center items-center bg-color-home'>
                <Sidebar />
                <Scene
                     //Make the area of the checkAreaList  a little small and have the yomo-next-cursor-chat iframe src 
                    className='w-1800px min-w-1800px h-900px wall'
                    floor='home'
                    backgroundImage='/bg-home.png'
                    boundary={{ top: 0, left: 0, bottom: 900, right: 1000 }}
                    playerInitialPosition={{ x: 30, y: 60 }}
                    checkAreaList={[
                        {
                            id: 'area-1',
                            position: {
                                x: 60,
                                y: 630,
                            },
                            rectangle: {
                                width: 180,
                                height: 180,
                            },
                            iframeSrc: 'https://yomo-next-cursor-chat-app.vercel.app/',
                        },
                        {
                            id: 'area-2',
                            position: {
                                x: 640,
                                y: 80,
                            },
                            round: {
                                diameter: 180,
                            },
                            iframeSrc: 'https://yomo-next-cursor-chat-app.vercel.app/',
                        },
                    ]}
                    onEnterCheckArea={(area: Area) => {
                        console.log('[Enter Area]:', area)
                        setIframePageState({
                            isOpen: true,
                            iframeSrc: area.iframeSrc,
                            // evt: string
                        })
                    }}
                    onLeaveCheckArea={() => {
                        console.log('[Leave Area]')
                        setIframePageState({
                            isOpen: false,
                            iframeSrc: '',
                            // evt:string
                        })
                    }}
                />
                <FloorLinks currentPath='/' />
               
                <Guide />
                <IframePage />
            </div>
        </>
    )
}

Home.auth = true
Home.scale = {
    sceneWidth: 1800,
    sceneHeight: 900,
}

export default Home
