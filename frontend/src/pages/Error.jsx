import React from "react";

const Error = () => {
  return (
    <section className="flex flex-col items-center justify-center  bg-white font-serif">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-col items-center text-center max-h-[85vh]">
          <div className="bg-center bg-cover h-[80svh] w-full " style={{ backgroundImage: "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)" }}>
            <h1 className="text-[70px] font-bold">404</h1>
          </div>
          <div className="mt-[-50px]">
            <h3 className="text-4xl font-semibold">Looks like you're lost</h3>
            <p className="text-lg mt-4">The page you are looking for is not available!</p>
            <a href="/" className="mt-6 px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700 inline-block">
              Go to Home
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Error;
