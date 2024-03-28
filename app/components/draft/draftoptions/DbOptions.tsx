import { DbLoadWeave } from '@/app/components/draft/draftoptions/dbhandler/DbLoadWeave'
import { DbSaveWeave } from '@/app/components/draft/draftoptions/dbhandler/DbSaveWeave'
export function DbOptions() {

    return (
        <>
            <DbSaveWeave />
            <DbLoadWeave />
        </>
    )
}