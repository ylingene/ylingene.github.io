import React from "react"

import {
  GITHUB_URL,
  INSTAGRAM_URL,
  LINKEDIN_URL,
  PINTEREST_URL,
} from "../../utils/defs"

import GithubIcon from "../../../content/assets/social/github.svg"
import InstagramIcon from "../../../content/assets/social/instagram.svg"
import LinkedinIcon from "../../../content/assets/social/linkedin.svg"
import PinterestIcon from "../../../content/assets/social/pinterest.svg"

import style from "./style.scss"

const Github = () => (
  <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
    <GithubIcon className={style.socialIcon} />
  </a>
)
export const Instagram = () => (
         <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
           <InstagramIcon className={style.socialIcon} />
         </a>
       )
const Linkedin = () => (
  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer">
    <LinkedinIcon className={style.socialIconSmall} />
  </a>
)
const Pinterest = () => (
  <a href={PINTEREST_URL} target="_blank" rel="noopener noreferrer">
    <PinterestIcon className={style.socialIconSmall} />
  </a>
)

const SocialLinks = () => (
    <div className={style.socialLinks}>
        <Instagram />
        <Pinterest />
        <Linkedin />
        <Github />
    </div>
)

export default SocialLinks
