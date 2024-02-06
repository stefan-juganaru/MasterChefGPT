'use client';
import { useRouter } from 'next/navigation';

function BackButton() {
    const router = useRouter();
    return (
        <button className="btn btn-primary" onClick={() => router.back()}>
            Go Back
        </button>
    );
}

export default BackButton;