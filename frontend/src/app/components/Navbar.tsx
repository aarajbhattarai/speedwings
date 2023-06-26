"use client";
import Logo from "./Logo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useState, useRef, createRef } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

interface NavLink {
  id: number;
  url: string;
  newTab: boolean;
  text: string;
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function NavLink({ url, text }: NavLink) {
  const path = usePathname();

  return (
    <li className="flex">
      <Link
        href={url}
        className={`flex items-center mx-4 -mb-1 border-b-2 dark:border-transparent ${
          path === url && "dark:text-violet-400 dark:border-violet-400"
        }}`}
      >
        {text}
      </Link>
    </li>
  );
}
const timeoutDuration = 120;

export default function Navbar({
  logoUrl,
  logoText,
  menuItems,
}: {
  logoUrl: string | null;
  logoText: string | null;
  menuItems: any;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const triggerRef = useRef<any[]>([]);
  const timeOutRef = useRef<any[]>([]);

  const handleEnter = (isOpen: any, id: any) => {
    console.log(triggerRef.current[id]);
    clearTimeout(timeOutRef.current[id]);
    !isOpen && triggerRef.current[id].click();
  };

  const handleLeave = (isOpen: any, id: any) => {
    timeOutRef.current[id] = setTimeout(() => {
      isOpen && triggerRef.current[id].click();
    }, timeoutDuration);
  };

  return (
    <div className="p-4 dark:bg-black dark:text-gray-100">
      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Logo src={logoUrl}>
              {logoText && <h2 className="text-2xl font-bold">{logoText}</h2>}
            </Logo>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          {menuItems.map((menu: any) => {
            if (menu.attributes.links.length > 0) {
              return (
                <>
                  <Popover.Group
                    className="hidden lg:flex lg:gap-x-12 mr-14"
                    key={menu.id}
                  >
                    <Popover className="relative">
                      {({ open }) => (
                        <div
                          onMouseEnter={() => handleEnter(open, menu.id)}
                          onMouseLeave={() => handleLeave(open, menu.id)}
                        >
                          <Popover.Button
                            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                            ref={(ref) => (triggerRef.current[menu.id] = ref)}
                          >
                            {menu.attributes.label}
                            <ChevronDownIcon
                              className="h-5 w-5 flex-none text-gray-400"
                              aria-hidden="true"
                            />
                          </Popover.Button>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-200"
                            enterFrom="opacity-0 translate-y-1"
                            enterTo="opacity-100 translate-y-0"
                            leave="transition ease-in duration-150"
                            leaveFrom="opacity-100 translate-y-0"
                            leaveTo="opacity-0 translate-y-1"
                          >
                            <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                              <div className="p-4">
                                {menu?.attributes?.links.map((item: any) => (
                                  <div
                                    key={item.demodel}
                                    className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                  >
                                    <div className="flex-auto">
                                      <a
                                        href={item.url}
                                        className="block font-semibold text-gray-900"
                                      >
                                        {item.demodel}
                                        <span className="absolute inset-0" />
                                      </a>
                                    </div>
                                  </div>
                                ))}
                              </div>
                              <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50"></div>
                            </Popover.Panel>
                          </Transition>
                        </div>
                      )}
                    </Popover>
                  </Popover.Group>
                </>
              );
            } else {
              return (
                <>
                  <Popover.Group
                    className="hidden lg:flex lg:gap-x-12 mr-14"
                    key={menu.id}
                  >
                    <Popover className="relative">
                      <Popover.Button
                        className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                        ref={(ref) => (triggerRef.current[menu.id] = ref)}
                      >
                        {menu.attributes.label}
                      </Popover.Button>
                    </Popover>
                  </Popover.Group>
                </>
              );
            }
          })}

          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <div className="h-8 w-auto">
                  <Logo src={logoUrl}>
                    {logoText && (
                      <h2 className="text-2xl font-bold">{logoText}</h2>
                    )}
                  </Logo>
                </div>
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {menuItems.map((menu: any) => {
                    if (menu.attributes.links.length > 0) {
                      return (
                        <>
                          <Disclosure as="div" className="-mx-3">
                            {({ open }) => (
                              <>
                                <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                  {menu.attributes.label}
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? "rotate-180" : "",
                                      "h-5 w-5 flex-none"
                                    )}
                                    aria-hidden="true"
                                  />
                                </Disclosure.Button>
                                <Disclosure.Panel className="mt-2 space-y-2">
                                  {menu.attributes.links.map((item: any) => (
                                    <Disclosure.Button
                                      key={item.demodel}
                                      as="a"
                                      href={item.url}
                                      className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                      {item.demodel}
                                    </Disclosure.Button>
                                  ))}
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </>
                      );
                    } else {
                      return (
                        <>
                                              <a
                        key={menu.attributes.label}
                        href="#"
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        {menu.attributes.label}
                      </a>
                        </>
                      );
                    }
                  })}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
}
