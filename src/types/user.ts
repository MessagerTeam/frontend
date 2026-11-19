
type generateTypeUser<T> = {
    "userId": string,
    "username": string,
    "display_name": string,
    "avatarUrl": string | null,
}

export type UserSummary = generateTypeUser<{}>

export type UserProfile = generateTypeUser<{
  "bio": string | null,
  "createdAt": string,
}>

export type UserMe = generateTypeUser<{
   email: string,
   bio: string,
   createdAt: string,
}>