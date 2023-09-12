"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface CustomImageProps {
    src: string;
    alt: string;
    height: number;
    width: number;
}

export default function CustomImage({ src, alt, height, width }: CustomImageProps) {
    const [imageSrc, setImageSrc] = useState<string>(src);

    useEffect(() => {
        if(src.length){
            setImageSrc(src);
        }
    }, [src]);

    return (
        <>
            <Image
                src={imageSrc}
                alt={alt}
                className="sm:w-full lg:w-1/4 h-auto object-cover transition-opacity opacity-0 duration-[1.5s]"
                width={height}
                height={width}
                priority
                style={{ 'objectFit': 'contain' }}
                placeholder='blur'
                blurDataURL='/placeholder.jpg'
                onError={() => setImageSrc('/placeholder.jpg')}
                onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            />
        </>
    )
}
