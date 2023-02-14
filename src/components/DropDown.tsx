import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";

interface Props {
  label: string;
  options: string[];
  value?: string;
  onChange: (value: string) => void;
}

export default function DropDown({
  label,
  options = [],
  value,
  onChange
}: Props) {
  const [selected, setSelected] = useState(value);

  useEffect(() => {
    if (onChange && selected) {
      onChange(selected);
    }
  }, [selected, onChange]);

  const handleSelectChange = (value: string) => {
    setSelected(value);
  };

  return (
    <Listbox value={selected} onChange={handleSelectChange}>
      <div className="flex flex-col text-left mx-8 w-64">
        <Listbox.Label className="block text-sm font-medium text-white">
          {label}
        </Listbox.Label>
        <div className="mt-1 relative">
          <Listbox.Button className="min-w-full bg-[#404348] border border-gray-800 text-white rounded-md shadow-sm pl-1 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm flex flex-col">
            <span className="flex items-center">
              <span className="ml-3 block">
                {selected || `Select ${label.toLowerCase()}`}
              </span>
            </span>
            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <img src="./arrow-down.png" alt="arrow" className="m-1" />
            </span>
          </Listbox.Button>

          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 bg-white shadow-lg max-h-80 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
              {options.map((option, i) => (
                <Listbox.Option
                  key={`${option}-${i}`}
                  className={({ active }) =>
                    `${active ? "text-white bg-indigo-600" : "text-gray-900"} cursor-default select-none relative py-2 pl-3 pr-9`
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <div className="flex items-center min-w-max">
                      <span
                        className={`${selected ? "font-semibold" : "font-normal"} ml-3 block`}
                      >
                        {option}
                      </span>
                      {selected && (
                        <span
                          className={`${selected ? "font-semibold" : "font-normal"} ml-3 block`}
                        >
                          {selected}
                        </span>
                      )}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </div>
    </Listbox>
  );
}
