//Contains load button to collect a users drafts from db

import { useState } from 'react'
import { useAuth } from '@clerk/nextjs'

import { DraftList } from '@/app/resources/types/dbdocuments'

import { DraftSelection } from '../DraftSelection'

export function DbLoadWeave() {

    const { userId } = useAuth()
    const [userDrafts, setUserDrafts] = useState<DraftList>([])
    const [visibleDraftList, setVisibleDraftList] = useState<boolean>(false)


    async function collectUserWeaves() {
        //Collects all the users weaves fron db
        try {
            let response = await fetch(`/api/${userId}/drafts`)

            if (response.status == 200) {
                const body = await response.json();
                const { draftList } = body
                setUserDrafts(draftList)
                setVisibleDraftList(true)
            } else {

                throw new Error
            }

        } catch (error) {
            console.log(error)
            alert('Ops, please try anoyher one')
        }
    }

    return (
        <>
            {visibleDraftList ? <DraftSelection userDrafts={userDrafts} setVisibility={setVisibleDraftList} /> : null}

            <button id="uploadButton" onClick={collectUserWeaves}>Load
            </button>
        </>
    )

}