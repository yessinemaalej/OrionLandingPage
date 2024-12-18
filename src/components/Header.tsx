'use client'
import Image from "next/image";
import Logo from "@/assets/images/Orion_alt_STK.png";
import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'

import {
  Bars3Icon,
  MapIcon,
  DocumentTextIcon,
  UsersIcon,
  MapPinIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from '@heroicons/react/20/solid'

const about = [
  { name: 'Our Mission', description: 'What we plan to acheive in the near future', href: '#', icon: MapPinIcon },
  { name: 'Whitepaper', description: 'Orion Whitepaper', href: 'https://orion-10.gitbook.io/orion-whitepaper', icon: DocumentTextIcon },
  { name: 'Partners', description: 'Meet everyone involved', href: '#', icon: UserGroupIcon },
  { name: 'Roadmap', description: 'Your customers’ data will be safe and secure', href: '/roadmap', icon: MapIcon },
  { name: 'Our team', description: 'Meet the team behind Orion', href: '#', icon: UsersIcon },
]
// const callsToAction = [
//   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//   { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header id="header" className="bg-black text-gray-400">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
          <Image src={Logo} alt="logo" className="h-20 w-20 relative"/>
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
        <a href="/" className="text-sm font-semibold leading-6 text-gray-500">
            Home
          </a>

          <a href="/faqs" className="text-sm font-semibold leading-6 text-gray-500">
            FAQs
          </a>

          <a href="/waitlist" className="text-sm font-semibold leading-6 text-gray-500">
            Waitlist
          </a>
          
          
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Log in <span aria-hidden="true">&rarr;</span>
          </a> */}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-[#110722] px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
            <Image src={Logo} alt="logo" className="h-20 w-20 relative"/>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
              
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-300 hover:bg-[#1b0d34]"
                >
                  FAQs
                </a>
              </div>
              {/* <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Log in
                </a>
              </div> */}
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
