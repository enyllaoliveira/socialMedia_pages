import { ReactNode } from 'react'

interface SocialProps{
    url: string;
    children: ReactNode;
    className?: string;
}

export function Social({ url, children, className} : SocialProps) {
    return(
        <a 
            href={url} 
            rel="noopener noreferrer"
            target='_blank'
            className={className}
        >
 {children} </a>
    )
}