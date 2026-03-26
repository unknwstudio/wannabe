import personsData from '@/content/persons.json'

export type Person = {
  id: string
  name: string
  photo: string
  roles: string[]
  shortRoles?: string[]
}

export function getPersonById(id: string): Person | null {
  return (personsData as Person[]).find(p => p.id === id) || null
}
