"use client"

import { Disclosure, } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { Navigation } from "./entities/api"

type Props = {
    navigations: Navigation[];
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
}

export default function Navi({ navigations, handleSearch }: Props) {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex items-center">
                  <div className="hidden lg:block">
                    <div className="flex items-baseline space-x-4">
                      {navigations.map((item) => (
                          <a
                          key={item.name}
                          href={item.name == "Headline" ? "/tech" : "/tech?type=" + item.name}
                          className={classNames(
                              item.current
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                              'rounded-md px-3 py-2 text-sm font-medium'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                          >
                          {item.name}
                          </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                { navigations.filter(n => n.current)[0].name == "Search" ?
                (<input 
                    type="text" 
                    name="search_text"
                    id="search_text"
                    onChange={handleSearch}
                    className="block rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                />) : (<></>)}
                </div>
              </div>
          </div>
          <Disclosure.Panel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigations.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.name == "Headline" ? "/tech" : "/tech?type=" + item.name}
                  className={classNames(
                    item.current 
                    ? 'bg-gray-900 text-white' 
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}