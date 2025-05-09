const TripDetails = () => {
    return (
        <div className="relative">
            <div className="h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg')" }}>
                <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-4xl font-bold text-white">Trip Details</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8 h-[calc(100vh-37rem)]">
                <p className="text-gray-500 text-sm">Home &gt; Details</p>
                <div className="flex flex-col items-center justify-center h-[calc(100vh-35rem)]">
                    <h1 className="text-5xl font-bold text-gray-800 dark:text-gray-200 mb-4">Coming Soon</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                        We are working hard to bring you something amazing. Stay tuned!
                    </p>
                </div>
            </div>
        </div>
    )
}

export default TripDetails