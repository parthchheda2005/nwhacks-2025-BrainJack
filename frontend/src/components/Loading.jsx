function Loading() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen h-screen max-w-screen">
      <div className="inline-block h-20 w-20 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]">
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
      <h1 className="flex max-w-20 text-center text-3xl items-center justify-center break-words m-6">
        Loading...
      </h1>
    </div>
  );
}

export default Loading;
