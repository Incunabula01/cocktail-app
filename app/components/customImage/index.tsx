"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

interface CustomImageProps {
    src: string;
    alt: string;
}

export default function CustomImage({ 
    src, 
    alt, 
}: CustomImageProps) {
    const [imageSrc, setImageSrc] = useState<string>(src);

    useEffect(() => {
        if(src && src.length){
            setImageSrc(src);
        }
    }, [src]);

    return (
        <>
            <div className="relative w-full h-full">
                <Image
                    src={src}
                    alt={alt}
                    className="absolute inset-0 w-full h-full object-cover object-center transition-opacity opacity-0 duration-[0.5s]"
                    priority
                    layout="fill"
                    placeholder="blur"
                    blurDataURL="/placeholder.jpg"
                    onError={() => setImageSrc('/placeholder.jpg')}
                    onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                />
            </div>
        </>
    )
}
