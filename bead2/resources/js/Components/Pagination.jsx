import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { Link } from '@inertiajs/inertia-react';

export default function Pagination({ data }) {

    const { current_page, last_page, links, from } = data;

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href={links[0].url}
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Előző
                </Link>
                <Link
                    href={links.at(-1).url}
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Következő
                </Link>
            </div>
            <div className="hidden justify-center sm:flex sm:flex-1 sm:items-center">
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Link
                            href={links[0].url}
                            className={`relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 ${current_page === from && 'inactive'}`}
                        >
                            <span className="sr-only">Előző</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>

                        {links.slice(1, -1).map(link => (
                            <Link
                                key={link.label}
                                href={link.url}

                                className={`relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium focus:z-20 ${link.active ? 'active' : 'default'}`}
                            >
                                {link.label}
                            </Link>
                        ))}


                        <Link
                            href={links.at(-1).url}
                            className={`relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 ${current_page === last_page && 'inactive'}`}
                        >
                            <span className="sr-only">Következő</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                        </Link>
                    </nav>
                </div>
            </div>
        </div>
    )
}
