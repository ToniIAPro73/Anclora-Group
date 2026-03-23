import { GroupWorkspaceShell } from '@/components/group/GroupWorkspaceShell'
import { requireGroupSession } from '@/lib/group-auth'

export default async function WorkspacePage() {
  const session = await requireGroupSession()
  return <GroupWorkspaceShell session={session} />
}
