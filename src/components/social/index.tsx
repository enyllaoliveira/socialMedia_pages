import { ReactNode } from 'react'

interface SocialProps{
    url: string;
    children: ReactNode;
    style?: React.CSSProperties;
    className?: string;
}

export function Social({ url, children, className, style} : SocialProps) {
    return(
        <a 
            href={url} 
            rel="noopener noreferrer"
            target='_blank'
            className={className}
            style={style}
        >
 {children} </a>
    )
}