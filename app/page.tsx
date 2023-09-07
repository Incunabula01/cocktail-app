import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen flex justify-center items-center">
        <div className="bg-white shadow-md rounded-lg p-4 w-80">
          <h1 className="text-xl font-semibold mb-4">Cocktail App</h1>
          <ul className="space-y-2">
            <li className="flex items-center">
              <div className="w-10 h-10 bg-blue-500 text-white flex justify-center items-center rounded-full mr-2">1</div>
              <span>Item 1</span>
            </li>
            <li className="flex items-center">
              <div className="w-10 h-10 bg-green-500 text-white flex justify-center items-center rounded-full mr-2">2</div>
              <span>Item 2</span>
            </li>
            <li className="flex items-center">
              <div className="w-10 h-10 bg-yellow-500 text-white flex justify-center items-center rounded-full mr-2">3</div>
              <span>Item 3</span>
            </li>
          </ul>
        </div>
    </main>
  )
}
