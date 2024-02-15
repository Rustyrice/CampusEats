import { useState } from 'react'
import { Switch } from '@headlessui/react'

const Filter = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <Switch.Group>
      <div className="pt-5">
        <div className="bg-gray-100 pt-16 pr-4 absolute top-0 right-0 flex items-center">
          <Switch.Label className="text-sm font-medium text-gray-700 pr-2">
            Show all
          </Switch.Label>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={`transform transition ease-in-out duration-200
            ${
              enabled ? 'bg-green-500' : 'bg-gray-200'
            } relative inline-flex items-center h-6 rounded-full w-11`}
          >
            <span className="sr-only">Show all</span>
            <span
              className={`${
                enabled ? 'translate-x-6' : 'translate-x-1'
              } inline-block w-4 h-4 transform bg-white rounded-full`}
            />
          </Switch>
        </div>
      </div>
    </Switch.Group>
  )
}

export default Filter
