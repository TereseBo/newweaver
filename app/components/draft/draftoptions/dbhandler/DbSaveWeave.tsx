//This component saves a draft to the DB

import { useContext } from 'react'
import { useAuth } from '@clerk/nextjs'

import { createWeaveObject } from '@/app/components/draft/weaveObjHandler/get/createWeaveObject'
import { WeaveContext } from '@/app/resources/contexts/weavecontext'

export function DbSaveWeave() {
    const { treadleGrid, tieUpGrid, warpGrid } = useContext(WeaveContext) as WeaveContextType

    //TODO: Add validation to ensure empty draft is not saved

    const { userId } = useAuth()

    async function saveWeave() {

        const weaveObject = createWeaveObject(warpGrid, treadleGrid, tieUpGrid)
        console.log(weaveObject)
        const body = { values: { weaveObject, name: 'Three' } }
        fetch(`/api/${userId}/draft`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        }).then(function (response) {
            console.log(response)
            if (response.status == 201) {
                alert('Draft saved!')
            } else {
                alert('Ops, the draft could not be saved')
            }
        })
    }

    return (
        <>
            <button type='button' onClick={saveWeave} >Save</button>
        </>
    )

}