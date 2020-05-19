import React from "react";
import { Link as GatsbyLink } from "gatsby";

import style from './style.scss';

export const Link = ({ to, children, ...other }) => (
    <GatsbyLink className={style.link} to={to} {...other}>{children}</GatsbyLink>
)

export const ListLink = ({ to, children, ...other }) => (
    <li>
        <Link to={to} {...other}>{children}</Link>
    </li>
)
