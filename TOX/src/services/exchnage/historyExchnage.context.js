import React, { createContext, useContext, useRef, useState } from 'react'
import { AuthenticationContext } from '../authentication/authentication.context'
import { RetrieveHistory, GetMobileData } from './exchange.service'

export const ExchangeHistoryContext = createContext()

export const ExchangeHistoryContextProvider = ({children}) => {

    const { user } = useContext(AuthenticationContext)

    const history = useRef([])
    const [detailsLoading,setDetailsLoading]=useState(false)
    const [mobile,setMobile]=useState(null)

    const UserData = () => {
        setDetailsLoading(true)
        history.current=[]
        setTimeout(()=>{
            RetrieveHistory(user.email).then(res=>{
                history.current=res
                setDetailsLoading(false)
            }).catch(err=>{
                console.log(err)
                setDetailsLoading(false)
            })
        },1500)
    }

    const RetrieveMobile = (email) => {
        setDetailsLoading(true)
        setTimeout(()=>{
            GetMobileData(email).then(res=>{
                setDetailsLoading(false)
                setMobile(res)
                return
            }).catch(err=>{
                setDetailsLoading(false)
                return null
            })
        },1000)
    }

    return(
        <ExchangeHistoryContext.Provider value={{
            history:history.current,
            detailsLoading,
            UserData,
            RetrieveMobile,
            mobile
        }}>
            {children}
        </ExchangeHistoryContext.Provider>
    )
}