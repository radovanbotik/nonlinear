/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
  return (
    <div>
      <label htmlFor="comment" className="block text-sm font-medium leading-6 text-gray-900">
        Add your comment
      </label>
      <div className="mt-2">
        <textarea
          id="comment"
          name="comment"
          rows={4}
          className="block w-full rounded-t-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          defaultValue={""}
        />
      </div>
      <div className="block w-full rounded-b-md border-b border-x border-gray-300 py-1.5 text-gray-900 shadow-sm  sm:text-sm sm:leading-6 space-x-4 px-2 ">
        <span>icon</span>
        <span>icon</span>
        <span>icon</span>
      </div>
      <button
        type="button"
        className="w-full bg-black px-4 py-2.5 text-sm font-semibold text-white  shadow-sm ring-1 ring-inset ring-gray-300 hover:text-[#d0ff4b] block mt-2"
      >
        Add a comment (0)
      </button>
    </div>
  );
}
