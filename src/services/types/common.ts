/* eslint-disable camelcase */
export interface IUser {
  phone: string
  password: string
}

export interface ILoginInfo {
  access_token: string
  expires_in: number
  jti: string
  organization: string
  refresh_token: string
  scope: string
  token_type: string
  user_id: string
}

export interface IUserInfo {
  isUpdatedPassword: boolean
  portrait: string
  userName: string
}
