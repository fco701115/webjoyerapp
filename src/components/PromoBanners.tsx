import Image from 'next/image';

interface Banner {
    id: string;
    title: string;
    subtitle?: string;
    image: string;
    type: string;
}

interface PromoBannersProps {
    initialBanners?: Banner[];
}

export function PromoBanners({ initialBanners = [] }: PromoBannersProps) {
    if (initialBanners.length === 0) {
        return null;
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto py-8 px-[10px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {initialBanners.map((banner) => (
                    <div
                        key={banner.id}
                        className={`relative h-[180px] md:h-[220px] rounded-lg overflow-hidden flex items-center justify-center group cursor-pointer shadow-md hover:shadow-lg transition-shadow bg-slate-900 ${banner.type === 'Simple' || banner.type === 'WIDE' ? 'md:col-span-2' : 'col-span-1'}`}
                    >
                        {banner.image && (
                            <Image
                                src={banner.image}
                                alt={banner.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                                unoptimized={banner.image.startsWith('data:')}
                                priority={banner.type === 'Simple' || banner.type === 'WIDE'}
                            />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent p-6 flex flex-col justify-end">
                            <h3 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-tight mb-1 drop-shadow-md">
                                {banner.title}
                            </h3>
                            {banner.subtitle && (
                                <p className="text-white/90 text-[14px] md:text-[16px] font-medium drop-shadow-md">
                                    {banner.subtitle}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


