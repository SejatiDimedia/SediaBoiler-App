import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const alt = 'SediaBoiler Logo';
export const size = {
    width: 32,
    height: 32,
};
export const contentType = 'image/png';

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse rendering container
            <div
                style={{
                    fontSize: 24,
                    background: 'transparent',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                }}
            >
                {/* Abstract Stack Icon matching Logo.tsx */}
                <div
                    style={{
                        position: 'absolute',
                        width: '24px',
                        height: '24px',
                        background: 'linear-gradient(to bottom right, #2563EB, #06b6d4)',
                        borderRadius: '6px',
                        transform: 'skewX(-10deg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 6px rgba(37, 99, 235, 0.3)',
                    }}
                >
                    {/* S Symbol or Layer-like representation */}
                    <div
                        style={{
                            width: '12px',
                            height: '12px',
                            border: '2.5px solid white',
                            borderRadius: '2px',
                            transform: 'skewX(10deg)',
                        }}
                    />
                </div>
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    );
}
