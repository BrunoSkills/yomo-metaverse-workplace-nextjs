import Drawer from './drawer'
import {  useEffect, useCallback } from 'react'

import { useRecoilState } from 'recoil'
import { iframePageState } from '../../store/atom'

const IframePage = () => {
    const [IframePage, setIframePageState] = useRecoilState(iframePageState)

    //Setting up a function to open/close the drawer with keycodes
    const onKeyDown  = useCallback(
        ( e: KeyboardEvent) => {
            if(e.key === 'Escape'){
                setIframePageState({
                    ...IframePage,
                    isOpen: false,
                })
            } else if( e.key === 'c' || e.ctrlKey){
                setIframePageState({
                    ...IframePage,
                    isOpen: true,
                    iframeSrc: 'https://yomo-next-cursor-chat-app.vercel.app/',
                })
            }
            
        }, [])

        useEffect(()=> {

            document.addEventListener('keydown', onKeyDown)

            return () => {
                document.removeEventListener('keydown', onKeyDown)
           
            }
            
        },[])

    return (
        <>
        <Drawer
            isOpen={IframePage.isOpen}
            onClose={() =>
                setIframePageState({
                    isOpen: false,
                    iframeSrc: '',
                })
            }
        >
            <iframe title=''  width='100%' height='100%' src={IframePage.iframeSrc} />
        </Drawer>
        
        </>
    )
}

export default IframePage
