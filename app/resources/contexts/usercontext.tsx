//Context handling information on the user and their resources
import { createContext, useContext, useEffect, useState } from 'react'

import { UserContextType } from '@/app/resources/types/contexts'

import { DraftList, ReformattedDraft} from '../types/dbdocuments'

export const UserContext = createContext<UserContextType | null>(null)
export function UserProvider({ children }: { children: React.ReactElement | React.ReactElement[] }) {

    const [user, setUser] = useState<string | null>(null)
    const [drafts, setDrafts] = useState<DraftList | null>(null)
    const [looms, setLooms] = useState<LoomList | null>(null)
    //const [reeds, setReeds] = useState<ReedList | null>(null)

    useEffect(() => {
        function clearResources() {
            setDrafts(null)
            setLooms(null)
            //setReeds(null)
        }

        function getResources(userId: string) {
            getDrafts(userId)
            getLooms(userId)
        }

        user ? getResources(user) : clearResources()

    }, [user])


    //Functions handling drafts:
    async function getDrafts(userId: string) {
        try {
            let response = await fetch(`/api/${userId}/drafts`)

            if (response.status == 200) {
                const body = await response.json();
                const { draftList } = body
                setDrafts(draftList)
            }
        } catch (error) {
            setDrafts(null)
        }
    }

    //Accepts a draftId and and updated weave to replace the weave in the draftlist
    function updateDraft(_id: string, weave: WeaveObject): void {

        if (!drafts) {
            return
        }
        const draftsCopy: DraftList = JSON.parse(JSON.stringify(drafts))
        const newDrafts: DraftList = draftsCopy.map(draft => {

            if (draft._id == _id) {
                console.log('id:s matched')
                let updatedDraft: ReformattedDraft = JSON.parse(JSON.stringify(draft))
                let copiedUpdate: WeaveObject = JSON.parse(JSON.stringify(weave))
                updatedDraft = Object.assign(updatedDraft, copiedUpdate)
                return updatedDraft
            } else {
                return draft
            }
        })

        setDrafts(newDrafts)
    }

    function removeDraft(_id: string): void {
        if (!drafts) {
            return
        }
        const draftsCopy: DraftList = JSON.parse(JSON.stringify(drafts))
        const filteredCopy: DraftList = draftsCopy.filter((draft) => draft._id !== _id);
        setDrafts(filteredCopy)
    }

    //Functions handling looms:
    //Fetches all looms registered by a user
    async function getLooms(userId: string) {
        try {
            let response = await fetch(`/api/${userId}/looms`)

            if (response.status == 200) {
                const body = await response.json();
                const { loomList } = body
                setLooms(loomList)
            }
        } catch (error) {
            setLooms(null)
        }
    }

    //Accepts a loomId and a loom to replace the item in the loomList
    function updateLoom(id: string, updatedLoom: Loom): void {

        if (!looms) {
            return
        }
        const loomsCopy: LoomList = JSON.parse(JSON.stringify(looms))
        const newLooms: LoomList = loomsCopy.map(loom => {

            if (loom.id == id) {
                console.log('id:s matched')
                let replacementLoom:any = JSON.parse(JSON.stringify(updatedLoom))
                replacementLoom.id=id
                return replacementLoom as Loom
            } else {
                return loom
            }
        })

        setLooms(newLooms)
    }

    //Removes a loom from loomList by Id
    function removeLoom(id: string): void {
        if (!looms) {
            return
        }
        const loomsCopy: LoomList = JSON.parse(JSON.stringify(drafts))
        const filteredCopy: LoomList = loomsCopy.filter((loom) => loom.id !== id);
        setLooms(filteredCopy)
    }


    return (

        <UserContext.Provider value={{ user, setUser, drafts, updateDraft, removeDraft, looms, updateLoom, removeLoom, }}>
            {children}
        </UserContext.Provider>
    )
}

//Hook to use the usercontext
export function useUserContext() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error('Usercontext must be used inside the userpages');
    }

    return context;
};
