import Image from "next/image";
import ColorControllerUI from '../components/ColorControllerUI';

export default function Home() {
    return (
        <main className="dark:bg-zinc-800 bg-white">
            <ColorControllerUI />
        </main>
    );
}
