import { Hash } from "crypto";

export type CheckFileData = {
  exp: string,
  hash: Hash | string
}


export type CheckFileResultState = {
  uploadList: string[],
  uploaded: boolean
}
