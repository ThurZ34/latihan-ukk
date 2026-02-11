import { Head } from "@inertiajs/react";

export default function Aspirasi() {
    return (
        <>
            <Head title="Aspirasi - Aspirasi Siswa" />
            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
                <div className="text-center p-8 bg-white dark:bg-gray-800 rounded shadow-xl">
                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        Hello Inertia + React!
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Laravel installation with Inertia.js and React is ready.
                    </p>
                </div>
            </div>
        </>
    );
}
